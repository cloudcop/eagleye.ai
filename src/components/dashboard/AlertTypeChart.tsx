import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Alert } from "@/types";
import { useMemo } from "react";

interface AlertTypeChartProps {
  alerts: Alert[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const AlertTypeChart = ({ alerts }: AlertTypeChartProps) => {
  const data = useMemo(() => {
    const typeCounts = alerts.reduce((acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
  }, [alerts]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};