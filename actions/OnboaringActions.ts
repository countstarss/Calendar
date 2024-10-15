'use server'
import prisma from "@/lib/db";
import { getSession } from "@/lib/hooks";
import { onboardingSchema, onboardingSchemaValidator } from "@/lib/ZodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function OnbardingAction(prevState: any,formData: FormData) {

  const session = await getSession();
  console.log(session.user?.id)

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidator({
      async isUsernameUnique() {
        const exisitngUserName = await prisma.user.findUnique({
          where: {
            // 需要确保这个条件是 Unique 的
            userName: formData.get("userName") as string,
          },
        });
        return !exisitngUserName
      },
    }),

    async: true,
  });
  
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      email: session?.user?.email as string
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    }
  })

  return redirect("/dashboard") 

}