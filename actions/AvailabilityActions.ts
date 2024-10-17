"use server"
import prisma from "@/lib/db";
import { getSession } from "@/lib/hooks";
import { Day } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const insertAvailability = async () => {
    const session = await getSession();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // 通过当前session中的email字段找到数据库对应用户的id
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })
    const availabilityData = days.map(day => ({
        userId: user?.id as string,
        day: day as Day,
        isActive: true,
        fromTime: '08:00',
        tillTime: '17:00',
    }));

    await prisma.availability.createMany({
        data: availabilityData,
    });
}

export const updateAvailability = async (formData: FormData) => {
    // 作用是将 FormData 对象中的键值对转换为一个普通的 JavaScript 对象，方便处理表单数据
    const rowData = Object.fromEntries(formData.entries());

    const availabilityData = Object.keys(rowData)
        .filter((key) => key.startsWith('id-'))
        .map((key) => {
            const id = key.replace('id-', '');
            return {
                id: id,
                isActive: rowData[`isActive-${id}`] === 'on' ? true : false,
                fromTime: rowData[`fromTime-${id}`] as string,
                tillTime: rowData[`tillTime-${id}`] as string,
            }
        })

    try {
        await prisma.$transaction(
            availabilityData.map((item) => {
                return prisma.availability.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        isActive: item.isActive,
                        fromTime: item.fromTime,
                        tillTime: item.tillTime,
                    }
                })
            })
        )
        // 重新渲染dashboard/availability页面
        revalidatePath('/dashboard/availability')
    } catch (error) {
        console.log(error)
    }
}