"use server"
import prisma from "@/lib/db";
import { getSession } from "@/lib/hooks";
import { nylas } from "@/lib/nylas";
import { revalidatePath } from "next/cache";

export async function cancelMeetingAction(formData: FormData) {
  const session = await getSession();

  const userData = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.destroy({
    eventId: formData.get("eventId") as string,
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  revalidatePath("/dashboard/meetings");
}