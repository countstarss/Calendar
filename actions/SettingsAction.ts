'use server'
import prisma from "@/lib/db";
import { getSession } from "@/lib/hooks";
import { onboardingSchema, onboardingSchemaValidator } from "@/lib/ZodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function SettingsAction(prevState: any,formData: FormData) {

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

  // NOTE: 点击Create Space,更新用户信息
  const data = await prisma.user.update({
    where: {
      email: session?.user?.email as string
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    }
  })

  // NOTE: 更新userName之后，跳转到 onborading/grant-id 页面
  return redirect("/onboarding/grant-id") 

}