import { redirect } from "next/navigation"
import { auth } from "./auth"

export const getSession = async () => {
  const session = await auth()
  
  if(!session) {
    redirect('/')
  }

  return session
}