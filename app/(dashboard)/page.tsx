import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";
import Overview from "./_components/Overview";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("sign-in");

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) redirect("/wizard");

  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card flex flex-row items-center justify-center px-6">
        <div className="w-full flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}! 👋</p>

          {/* Income & Exepnse Buttons */}
          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              trigger={
                <Button className="border border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white">
                  + New Income
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              trigger={
                <Button className="border border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white">
                  + New Expense
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>

      <Overview userSettings={userSettings} />

    </div>
  );
};

export default page;
