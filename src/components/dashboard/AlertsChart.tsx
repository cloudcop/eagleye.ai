import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Alert } from "@/types";
import { useMemo } from "react";
import { subDays, format, parseISO } from "date-fns";

interface AlertsChartProps {
  alerts: Alert[];
}

export const AlertsChart = ({ alerts }: AlertsChartProps) => {
  const data = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
    
    const alertCounts = last7Days.map(day => {
      const formattedDay = format(day, "yyyy-MM-dd");
      // Note: The current alert data only has time, not date. 
      // For a real app, you'd parse the full timestamp.
      // Here, we'll simulate by distributing alerts across the days.
      // This is a placeholder for proper date handling.
      const todayStr = format(new Date(), "yyyy-MM-dd");
      const alertsForDay = alerts.filter((alert, index) => {
        // This is a mock distribution logic
        const dayIndex = (new Date().getDate() - index) % 7;
        const alertDay = format(subDays(new Date(), dayIndex), "yyyy-MM-dd");
        return alertDay === formattedDay;
      });

      return {
        name: format(day, "MMM d"),
        total: alertsForDay.length,
      };
    });

    return alertCounts;
  }, [alerts]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts - Last 7 Days</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--accent))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};