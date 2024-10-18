"use server"

import prisma from "@/lib/db"
import { getSession } from "@/lib/hooks"
import { nylas } from "@/lib/nylas"
import { redirect } from "next/navigation"

export async function createMeetingAction(formData: FormData) {
  const session = await getSession()
  const userData = await prisma.user.findUnique({
    where: {
      // userName: formData.get('userName') as string
      // userName: session?.user?.name as string
      userName: 'lukeking'
    },
    select: {
      grantId: true,
      email: true,
    }
  })

  if (!userData) {
    throw new Error("User not found") // 使用抛出异常，而不是返回 Error 对象
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get('eventTypeId') as string
    },
    select: {
      title: true,
      description: true,
      videoCallSoftware: true,
      duration: true,
    }

  })


  // MARK: 获取会议时间
  // NOTE: 这里的内容是根据前端传过来的数据手动绑定的，不能出错
  const formTime = formData.get("fromTime") as string;
  const meetingLength = Number(formData.get("meetingLength"));
  const eventDate = formData.get("eventDate") as string;
  const startDateTime = new Date(`${eventDate}T${formTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

  const provider = eventTypeData?.videoCallSoftware

  try {
    await nylas.events.create({
      identifier: userData?.grantId as string,
      requestBody: {
        // MARK: - 会议信息
        title: eventTypeData?.title as string,
        description: eventTypeData?.description as string,
        when: {
          // MARK: - 会议时间
          startTime: Math.floor(startDateTime.getTime() / 1000),
          endTime: Math.floor(endDateTime.getTime() / 1000),
        },
        conferencing: {
          autocreate: {},
          provider: provider as any,
        },
        participants: [
          {
            // MARK: - 参与者信息
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            status: 'yes' as any,
          },
        ],
      },
      queryParams: {
        calendarId: "primary",
        notifyParticipants: true,
      },
    })
  } catch (error) {
    throw new Error(error as string) // 使用抛出异常，而不是返回 Error 对象
  }

  return redirect(`/success`)
}
