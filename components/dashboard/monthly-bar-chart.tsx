"use client"

import { useEffect, useRef } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import CountUp from "react-countup"

interface BookingCompletedAmount {
  month: string
  amount: number
}

interface DataSeries {
  name: string
  data: BookingCompletedAmount[]
}

interface MonthlyBarChartProps {
  data: DataSeries[]
  height?: number
}

export function MonthlyBarChart({ data, height = 300 }: MonthlyBarChartProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Transform data for recharts
  const transformedData = data[0].data.map((item, index) => {
    const result: Record<string, any> = {
      month: item.month,
    }

    data.forEach((series) => {
      result[series.name] = series.data[index].amount
    })

    return result
  })

  useEffect(() => {
    // Clean up tooltip when component unmounts
    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.innerHTML = ""
      }
    }
  }, [])

  // Generate colors based on the number of data series
  const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"]

  return (
    <div className="w-full">
      <div ref={tooltipRef} className="tooltip-container" />
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={transformedData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="mb-2 font-semibold">{label}</div>
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm text-muted-foreground">{entry.name}:</span>
                        </div>
                        <span className="font-medium">
                          {typeof entry.value === "number" ? (
                            <CountUp end={entry.value} separator="," duration={1} />
                          ) : (
                            entry.value
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
          />
          {data.map((series, index) => (
            <Bar
              key={series.name}
              dataKey={series.name}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={data.length > 1 ? 15 : 30}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

