"use server"
import prisma from "@/lib/db";
import { getSession } from "@/lib/hooks";
import { eventTypeSchema } from "@/lib/ZodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

// NOTE: 注意：使用 useFormState 时，需要将 prevState 作为第一个参数传递
export const createEventType = async (prevState: any,formData: FormData) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }

  const submission = parseWithZod(formData,{
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {  
    return submission.reply()
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const eventType = await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      description: submission.value.description,
      url: submission.value.url,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: user?.id as string,
    },
  });

  return redirect("/dashboard");
};

// MARK: DeleteEventTypeAction
export async function DeleteEventTypeAction(formData: FormData) {
  const session = await getSession();

  const data = await prisma.eventType.delete({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id as string,
    },
  });

  return redirect("/dashboard");
}