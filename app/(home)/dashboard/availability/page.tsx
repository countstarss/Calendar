import { updateAvailability } from '@/actions/AvailabilityActions';
import { SubmitButton } from '@/app/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import prisma from '@/lib/db';
import { getSession } from '@/lib/hooks';
import { times } from '@/lib/times';
import React from 'react';

interface AvailabilityPagePropsProps {
  // You can define any props needed here
}

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      day: 'asc'
    }
  })
  return data
}

const AvailabilityPageProps = async ({

}: AvailabilityPagePropsProps) => {

  const session = await getSession();
  const availabilityData = await getData(session.user?.id as string)
  console.log(availabilityData)



  return (
    // Card
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>Manage your availability time for booking.</CardDescription>
      </CardHeader>
      <form noValidate
      // id={form.id} 
        // onSubmit={handleSubmit} 
        action={updateAvailability}
      > 
        <CardContent className="flex flex-col gap-y-4">
          {
            availabilityData.map((item) => (
              <div
                className="grid grid-cols-1 md:grid-cols-3 items-center gap-4"
                key={item.id}
              >
                <input type="hidden" name={`id-${item.id}`} value={item.id} />
                <div className="flex items-center gap-x-3">
                  <Switch
                    name={`isActive-${item.id}`}
                    defaultChecked={item.isActive}
                  />
                  <p>{item.day}</p>
                </div>
                <Select
                  name={`fromTime-${item.id}`}
                  defaultValue={item.fromTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="From Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='grid grid-cols-3'>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  name={`tillTime-${item.id}`}
                  defaultValue={item.tillTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="To Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ))
          }
        </CardContent>
        <SubmitButton title='Save Changes' className='w-full md:w-[200px] mb-5 mx-4'/>
      </form>
    </Card>
  );
};

export default AvailabilityPageProps;