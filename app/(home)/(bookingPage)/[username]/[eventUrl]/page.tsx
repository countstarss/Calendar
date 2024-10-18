import { Calendar } from '@/app/components/booking-form/Calendar';
import { RenderCalendar } from '@/app/components/booking-form/RenderCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { CalendarX2, Clock4, VideoIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';


// MARK: - Get Event
async function getEvent(eventUrl: string, userName: string) {
  const event = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        userName: userName,
      },
    },
    select: {
      title: true,
      description: true,
      url: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
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
  params
}: {
  params: {
    userName: string;
    eventUrl: string;
  };
}) => {

  // 数据从params中取
  const data = await getEvent(params.eventUrl, params.userName);
  const daysofWeek = data.user.availabilities
  console.log(`==data==:`)
  console.log(data.user.availabilities)


  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card className='p-4 max-w-[1000px] w-full mx-auto'>
        <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
          <div
            className='min-w-[220px] mx-auto items-start justify-center md:px-0 px-10 mt-4'
            // MARK: - Meeting Info
          >
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
            // MARK: - Nylas Schedule
          >
            {/* <Calendar /> */}
            <RenderCalendar daysofWeek={daysofWeek} />
          </div>

          <Separator orientation="vertical" className='h-full' />

          <div 
            className='mx-auto max-w-60 overflow-hidden'
            // MARK: - Nylas Schedule
          >
            <RenderCalendar daysofWeek={daysofWeek} />
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default BookingFormPage;





