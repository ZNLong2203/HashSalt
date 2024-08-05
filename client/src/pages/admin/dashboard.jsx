import React, { useState } from "react";
import {
  FiUser,
  FiDollarSign,
  FiBarChart,
  FiActivity,
  FiDownload,
} from "react-icons/fi";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Calendar } from "../../components/ui/calendar";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const Dashboard = ({ className }) => {
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className="p-12 px-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className={cn("grid gap-2", className)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button>
            <FiDownload className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <FiDollarSign className="text-3xl text-green-500 mr-2" />
            <div>
              <h2 className="text-xl font-bold">$45,231.89</h2>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <FiUser className="text-3xl text-purple-500 mr-2" />
            <div>
              <h2 className="text-xl font-bold">+2350</h2>
              <p>Subscriptions</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <FiBarChart className="text-3xl text-blue-500 mr-2" />
            <div>
              <h2 className="text-xl font-bold">+12,234</h2>
              <p>Sales</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <FiActivity className="text-3xl text-red-500 mr-2" />
            <div>
              <h2 className="text-xl font-bold">+573</h2>
              <p>Active Now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow mb-2 mt-10">
        <h2 className="text-xl font-bold mb-2">Overview</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              fill={chartConfig.desktop.color}
              radius={4}
            />
            <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Dashboard;
