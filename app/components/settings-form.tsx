import { useState } from "react";
// import { SettingsAction } from "@/app/actions";
// import { aboutSettingsSchema } from "@/lib/ZodSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
// import { UploadDropzone } from "@/app/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SettingsFormProps {
  // You can define any props needed here
}

const SettingsForm = ({}: SettingsFormProps) => {
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <form noValidate 
        // id={form.id} onSubmit={form.onSubmit} action={action}
      >
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              // name={fields.fullName.name}
              // key={fields.fullName.key}
              placeholder="Luke king"
              // defaultValue={fullName}
            />
            <p className="text-red-500 text-sm">{
            // fields.fullName.errors
            }</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled placeholder="countstarss404@gmail.com"  />
          </div>

          <div className="grid gap-y-5">
            <input
              type="hidden"
              // name={fields.profileImage.name}
              // key={fields.profileImage.key}
              // value={currentProfileImage}
            />
            <Label>Profile Image</Label>
            
            <p className="text-red-500 text-sm">{
            // fields.profileImage.errors
            }</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton title="Save Changes"/>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;