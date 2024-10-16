import SettingsForm from "@/app/components/settings-form";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { getSession } from "@/lib/hooks";

async function getData(email: string) {
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const SettingsPage = async () => {
  const session = await getSession();
  const data = await getData(session.user?.email as string);
  return (
    <SettingsForm/>
  );
};

export default SettingsPage;