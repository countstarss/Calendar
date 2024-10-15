import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import videoGif from '@/public/work-is-almost-over-happy.gif'
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GrantIdPage() {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Grant ID</CardTitle>
          <CardDescription>you are almost down!</CardDescription>
          <Image src={videoGif} alt="work-is-almost-over-happy" width={400} height={400} className='rounded-md' />
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center'>
          <Button asChild className='w-full'>

            <Link href='/api/auth'>
              <CalendarCheck2 />
              &nbsp;&nbsp;Connect calendar to your account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}