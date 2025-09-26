import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Alert } from "@/types";
import { useMemo } from "react";
import { subDays, format, parseISO, isWithinInterval, startOfDay } from "date-fns";

interface AlertsChartProps {
  alerts: Alert[];
}

export const AlertsChart = ({ alerts }: AlertsChartProps) => {
  const data = useMemo(() => {
    const today = new Date();
    const sevenDaysAgo = startOfDay(subDays(today, 6)); // Include today fully

    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, i)).reverse();

    const alertCounts = last7Days.map(day => {
      const dayStart = startOfDay(day);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const alertsForDay = alerts.filter(alert => {
        if (!alert.timestamp) return false; // Add guard for missing timestamp
        const alertDate = parseISO(alert.timestamp);
        return isWithinInterval(alertDate, { start: sevenDaysAgo, end: today }) &&
               isWithinInterval(alertDate, { start: dayStart, end: dayEnd });
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