"use client";

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
import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/app/components/submit-button";
import { useFormState } from "react-dom";
import { OnbardingAction } from "@/actions/OnboaringActions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/ZodSchema";

const OnboardingPage = () => {

  // useFormState 用于从 server action 中获取数据
  const [lastResult, action] = useFormState(OnbardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate:"onInput"
  })

  // 状态管理 fullName 和 userName
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");

  // 当 fullName 改变时，自动更新 userName
  useEffect(() => {
    if (fullName) {
      setUserName(fullName.replace(/\s+/g, "").toLowerCase());
    }
  }, [fullName]);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value); // 更新 fullName 状态
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value); // 仅更新 userName 状态
  };
  return(
    <div className = "h-screen w-screen flex items-center justify-center" >
        <Card>
          <CardHeader>
            <CardTitle>Welcome to CalMarshal</CardTitle>
            <CardDescription>
              We need the following information to set up your profile
            </CardDescription>
          </CardHeader>

          <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
            <CardContent className="flex flex-col gap-y-2">
              <div className="grid gap-y-2">
                <Label>Full Name</Label>
                <Input
                  name={fields.fullName.name}
                  defaultValue={fields.fullName.initialValue}
                  key={fields.fullName.key}
                  placeholder="FullName"
                  value={fullName}
                  onChange={handleFullNameChange} // Full Name 改变
                  className="text-base"
                />
                <p className="text-red-500 text-[12px] text-truncate">
                  {fields.fullName.errors}
                </p>
              </div>
              <div className="grid gap-y-2">
                <Label>Username</Label>

                <div className="flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-base">
                    insightlab.zone/
                  </span>
                  <Input
                    type="text"
                    key={fields.userName.key}
                    defaultValue={fields.userName.initialValue}
                    name={fields.userName.name}
                    placeholder="UserName"
                    className="rounded-l-none text-md"
                    value={userName}
                    onChange={handleUserNameChange} // UserName 改变
                  />
                </div>
                <p className="text-red-500 text-[12px] text-truncate">
                  {fields.userName.errors}
                </p>
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
    </div >
  );
};

export default OnboardingPage;