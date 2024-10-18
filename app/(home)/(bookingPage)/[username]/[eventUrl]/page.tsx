import { createMeetingAction } from '@/actions/MettingActions';
import BackAndForWardButton from '@/app/components/back-forward-button';
import { Calendar } from '@/app/components/booking-form/Calendar';
import { RenderCalendar } from '@/app/components/booking-form/RenderCalendar';
import { TimeSlots } from '@/app/components/booking-form/TimeTable';
import { SubmitButton } from '@/app/components/submit-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { BookMarked, CalendarX2, Clock, Clock4, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import React from 'react';


// MARK: - Get Event
async function getEventType(eventUrl: string, userName: string) {
  const event = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        userName: userName,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          availabilities: {
            select: {
              day: true,
              fromTime: true,
              tillTime: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!event) {
    return notFound();
  }
  return event;
}

const BookingFormPage = async ({
  params,
  searchParams
}: {
  params: {
    userName: string;
    eventUrl: string;
  };
  searchParams: {
    date: string;
    time: string;
  };
}) => {

  // 数据从params中取,因为 [userName] 和 [eventUrl] 是动态路由参数
  const data = await getEventType(params.eventUrl, params.userName);
  const daysofWeek = data.user.availabilities

  const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();

  const formattedDate = new Intl.DateTimeFormat('zh-CN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(selectedDate);


  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      {
        showForm ? (
          <>
            <Card className="max-w-[600px] relative"
            // MARK: - Booking Card
            >
              <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
                <div
                // MARK: - - Meeting Info
                >
                  <Image
                    src={data.user.image as string}
                    alt={`${data.user.name}'s profile picture`}
                    className="size-9 rounded-full"
                    width={30}
                    height={30}
                  />
                  <p className="text-sm font-medium text-muted-foreground mt-1">
                    {data.user.name}
                  </p>
                  <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                  <p className="text-sm font-medium text-muted-foreground">
                    {data.description}
                  </p>

                  <div className="mt-5 grid gap-y-3">
                    <p className="flex items-center">
                      <CalendarX2 className="size-4 mr-2 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {formattedDate}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <Clock className="size-4 mr-2 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {data.duration} Mins
                      </span>
                    </p>
                    <p className="flex items-center">
                      <BookMarked className="size-4 mr-2 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {data.videoCallSoftware}
                      </span>
                    </p>
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden md:block h-full w-[1px]"
                />

                <form
                  className="flex flex-col gap-y-4"
                  action={createMeetingAction}
                // MARK: - -Boking Form
                // NOTE: - 这里需要添加隐藏的input，来存储eventType的id，这样在createMeetingAction中可以取到
                >
                  <input type="hidden" name="eventTypeId" value={data.id} />
                  <input type="hidden" name="mettingLength" value={data.duration} />
                  <input type="hidden" name="videoCallSoftware" value={data.videoCallSoftware} />

                  <input type="hidden" name="userName" value={params.userName} />
                  <input type="hidden" name="fromTime" value={searchParams.time} />
                  <input type="hidden" name="eventDate" value={searchParams.date} />
                  <input type="hidden" name="meetingLength" value={data.duration} />
                  <div 
                    className="flex flex-col gap-y-1"
                    //TODO: 验证，不能为空
                  >
                    <Label>Your Name</Label>
                    <Input
                      // MARK: - - name
                      name="name"
                      placeholder="Your Name"
                      autoComplete='off'
                    />
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <Label>Your Email</Label>
                    <Input
                      // MARK: - - email
                      name="email"
                      placeholder="johndoe@gmail.com"
                      autoComplete='off'
                    // TODO: 同时添加多个email，有一个多选框，或者添加团队成员
                    />

                  </div>
                  <Button className={`outline w-full font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px] flex gap-2 bg-slate-400`}>
                    Cancle
                  </Button >
                  <SubmitButton title="Book Meeting" />
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className='p-4 max-w-[1000px] w-full mx-auto'
          // MARK: - INFO & Calendar
          >
            <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
              <div
                className='min-w-[220px] mx-auto items-start justify-center md:px-0 px-10 mt-4 relative'
              // MARK: - - Meeting Info
              >
                <BackAndForWardButton className='absolute top-[-40px] left-[0px]' backActive={true} />
                <img src={data.user.image ?? ''} alt={data.user.name ?? ''} className='object-cover size-10 rounded-full' />
                <h3 className='text-xl font-semibold mt-2'>{data.user.name}</h3>
                <div className='mt-2'>
                  <p className='text-2xl font-semibold'>{data.title.toUpperCase()}</p>
                  <p className='text-sm text-muted-foreground'>{data.description}</p>
                </div>

                <p className='flex mt-2 gap-2 items-center'>
                  <CalendarX2 className='size-4' />
                  <span className='text-sm text-muted-foreground'>17 Oca. 2024</span>
                </p>

                <p className='flex mt-2 gap-2 items-center'>
                  <Clock4 className='size-4' />
                  <span className='text-sm text-muted-foreground'>{data.duration} minutes</span>
                </p>

                <p className='flex mt-2 gap-2 items-center'>
                  <VideoIcon className='size-4' />
                  <span className='text-sm text-muted-foreground'>{data.videoCallSoftware}</span>
                </p>
              </div>

              <Separator orientation="vertical" className='h-full' />

              <div
                className='mx-auto'
              // MARK: - - Calendar
              >
                {/* <Calendar /> */}
                <RenderCalendar daysofWeek={daysofWeek} />
              </div>

              <Separator orientation="vertical" className='h-full' />

              <div
                className='mx-auto max-w-60 overflow-hidden'
              // MARK: - - TimeSlots
              >
                <TimeSlots
                  selectedDate={selectedDate}
                  userName={params.userName}
                  meetingDuration={data.duration}
                />
              </div>

            </CardContent>
          </Card>
        )
      }

    </div>
  );
};

export default BookingFormPage;





