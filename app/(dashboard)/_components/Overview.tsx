"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { UserSettings } from "@/lib/generated/prisma";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";
import { date } from "zod";
import StatsCards from "./StatsCards";

interface props {
  userSettings: UserSettings;
}

function Overview({userSettings}: props) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <div className="flex flex-col justify-between gap-2 px-7 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;

              // LIMIT DAYS RANGE
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(`The selected date range is to big!`, {
                  description: `Max allowed range ${MAX_DATE_RANGE_DAYS} days.`,
                });
                return;
              }

              setDateRange({ from, to });
            }}
          />
        </div>
      </div>
      
      <StatsCards 
        userSettings={userSettings}
        from={dateRange.from}
        to={dateRange.to}
      />
    </div>
  );
}

export default Overview;
