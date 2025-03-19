"use client"

import { useEffect, useRef } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import CountUp from "react-countup"

interface BookingCompletedAmount {
  month: string
  amount: number
}

interface MonthlyLineChartProps {
  data: BookingCompletedAmount[]
  height?: number
}

export function MonthlyLineChart({ data, height = 300 }: MonthlyLineChartProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up tooltip when component unmounts
    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="w-full">
      <div ref={tooltipRef} className="tooltip-container" />
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
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
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                        <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Amount</span>
                        <span className="font-bold">
                          {typeof payload[0].value === "number" ? (
                            <CountUp end={payload[0].value} separator="," duration={1} />
                          ) : (
                            payload[0].value
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "hsl(var(--primary))", opacity: 0.8 },
            }}
            style={{
              stroke: "hsl(var(--primary))",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

