import prisma from "@/lib/db"
import { getSession } from "@/lib/hooks"


export async function InsertUser() {
  const session = await getSession()

  if(!session?.user) {
    return
  }

  // 先根据登录信息查找一下是否有此用户，如果有，则return，如果没有，则执行插入
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    }
  })

  if (user) {
    return
  }
  await prisma.user.create({
    data: {
      email: session?.user?.email as string ,
      name: session?.user?.name as string,
      image: session?.user?.image as string,
    }
  })
}