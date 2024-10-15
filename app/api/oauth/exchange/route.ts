import prisma from "@/lib/db";
import { getSession } from "@/lib/hooks";
import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession()
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) {
    return Response.json({ error: 'No code provided' }, { status: 400 })
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientId: nylasConfig.clientId,
      clientSecret: nylasConfig.apiKey,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    })

    const { grantId, email } = response
    //update user
    await prisma.user.update({
      where: {
        email: session.user?.email!
      },
      data: {
        grantId: grantId,
        grantEmail: email
      }
    })
  } catch (error) {
    console.error(`Error: ==> Something went wriong:`,error)
  }

  redirect(`/dashboard`)
}