import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/hooks';
import prisma from '@/lib/db';
import EmptyState from '@/app/components/empty-state';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Link2, Pen, PlusSquare, Settings, SlidersHorizontal, Trash, Users2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

interface DashboardProps {
  // You can define any props needed here
}

// MARK: getData
async function getData(email: string) {
  const data = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      userName: true,
      eventTypes: {
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          url: true,
          isActive: true,
          videoCallSoftware: true
        }
      }
    }
  })
  if (!data) {
    return notFound()
  }
  return data
}

const Dashboard = async ({

}: DashboardProps) => {
  const session = await getSession()
  const data = await getData(session?.user?.email as string)
  return (
    <>
      {
        data.eventTypes.length === 0 ? (
          <EmptyState
            title="No event types found"
            description="You can create your first event type by clicking the button below."
            buttonText="Create Event Type"
            href="/dashboard/new-event"
          // MARK: EmptyState
          />
        ) : (
          <div className='flex flex-col gap-y-4 justify-between px-2'>
            <div className='flex flex-row gap-x-4 justify-between'>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-bold'>Your Event Types</h1>
                <p className='text-sm text-muted-foreground text-truncate'>manage your event types and create new ones</p>
              </div>
              <Button
                variant="outline"
                size="default"
                className='mt-4'
                asChild
              >
                <Link href="/dashboard/new-event">
                  <PlusSquare className='size-4 mr-2' />
                  Create Event Type
                </Link>
              </Button>
            </div>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
            // MARK: Event Types
            >
              {
                data.eventTypes.map((eventType) => (
                  <div
                    key={eventType.id}
                    className='overflow-hidden rounded-lg border shadow relative'
                  >
                    <div className="absolute top-2 right-2"
                    // MARK: Item Menu
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <SlidersHorizontal className='size-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-20" align="end">
                          <DropdownMenuLabel>Event</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                              <Link href={`/${data.userName}/${eventType.url}`}
                              // MARK: Menu-Preview
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                <span>Preview</span>
                              </Link>
                            </DropdownMenuItem>
                            {/* <CopyLinkMenuItem
                              meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${eventType.url}`}
                            /> */}
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/event/${eventType.id}`}
                              // MARK: Menu-Copy
                              >
                                <Link2 className="mr-2 h-4 w-4" />
                                <span>Copy</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/event/${eventType.id}`}
                              // MARK: Menu-Edit
                              >
                                <Pen className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/event/${eventType.id}/delete`}
                            // MARK: Menu-Delete
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Link href={`/dashboard/event/${eventType.id}`}>
                      <div className='flex gap-2 p-4 items-center'>
                        <Users2 className='size-4' />
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dd>
                              <div className="text-lg font-medium ">
                                {eventType.title}
                              </div>
                            </dd>
                            <dt className="text-sm font-medium truncate ">
                              {eventType.duration} Minutes Meeting
                            </dt>
                          </dl>
                        </div>
                      </div>
                    </Link>
                    <div className="bg-muted dark:bg-gray-900 px-5 py-3 flex justify-between items-center">
                      <Switch/>

                      <Link href={`/dashboard/event/${eventType.id}`}>
                        <Button className="">Edit Event</Button>
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default Dashboard;