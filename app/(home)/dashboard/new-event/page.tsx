"use client"
import { createEventType } from '@/actions/EventTypeActions';
import { SubmitButton } from '@/app/components/submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { eventTypeSchema } from '@/lib/ZodSchema';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

interface NewEventProps {
  // You can define any props needed here
}
// MARK: NewEvent Page
const NewEvent = ({

}: NewEventProps) => {

  const [lastResult,action] = useFormState(createEventType,undefined)

  // NOTE: 使用 useForm 时，需要将 lastResult 作为 initialState 传递
  // NOTE: fields 是 form 的子组件，用于接收 form 的值
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate:"onInput"
  })

  // 状态管理 fullName 和 userName
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");


  // 当 fullName 改变时，自动更新 userName
  useEffect(() => {
    if (title) {
      setUrl(title.replace(/\s+/g, "").toLowerCase());
    }
  }, [title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value); // 更新 fullName 状态
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value); // 仅更新 userName 状态
  };

  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center' >
      <Card>
        <CardHeader>
          <CardTitle>Add New Event Type</CardTitle>
          <CardDescription>Create a new event type to allow user to book</CardDescription>
        </CardHeader>
        <form action={action} id={form.id} onSubmit={form.onSubmit}>
          <CardContent className='flex flex-col gap-y-4 w-[350px]'>
            <div className='flex flex-col gap-2'
              // MARK: Title
            >
              <Label>Title</Label>
              <Input 
                type="text" 
                name={fields.title.name} 
                key={fields.title.key} 
                id="title" 
                placeholder='Event Title' 
                value={title}
                onChange={handleTitleChange}
                className="text-base"
              />
            </div>

            <div className="grid gap-y-2">
              <Label>Event Type</Label>

              <div className="flex rounded-md"
                // MARK: Event Type
              >
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-base">
                  event/
                </span>
                <Input
                  type="text"
                  key={fields.url.key}
                  defaultValue={fields.url.initialValue}
                  name={fields.url.name}
                  placeholder="Event Type"
                  className="rounded-l-none text-md"
                  value={url}
                  onChange={handleUrlChange}
                />
              </div>
              <p className="text-red-500 text-[12px] text-truncate">{fields.url.errors}</p>
            </div>

            <div className='flex flex-col gap-y-2'
              // MARK: Description
            >
              <Label>Description</Label>
              <Textarea 
                name={fields.description.name} 
                key={fields.description.key} 
                id={fields.description.id} 
                placeholder='Event Description' 
              />
              <p className="text-red-500 text-[12px] text-truncate">{fields.description.errors}</p>
            </div>

            <div className='flex flex-col gap-y-2'
              // MARK: Duration
            >
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Mins</SelectItem>
                  <SelectItem value="60">1 Hour</SelectItem>
                  <SelectItem value="120">2 Hours</SelectItem>
                  <SelectItem value="180">3 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='flex flex-col gap-y-2'
              // MARK: Provider
            >
              <Label>VideoCallProvider</Label>
              <Select
                name={fields.videoCallSoftware.name}
                key={fields.videoCallSoftware.key}
                defaultValue={fields.videoCallSoftware.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a VideoCallProvider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zoom Meeting">Zoom Meeting</SelectItem>
                  <SelectItem value="Google Meet">Google Meet</SelectItem>
                  <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
          <CardFooter>
            <SubmitButton title='Create Event Type' />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

        export default NewEvent;