"use client"

import { useState } from "react"
import { CalendarIcon, Download, LineChart, Package, ShoppingCart, Wallet } from "lucide-react"
import { format, subMonths } from "date-fns"
import CountUp from "react-countup"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonthlyLineChart } from "@/components/dashboard/monthly-line-chart"
import { MonthlyBarChart } from "@/components/dashboard/monthly-bar-chart"


// Define interfaces
interface BookingCompletedAmount {
  month: string
  amount: number
}

interface Dashboard {
  year: number
  startDate: Date
  endDate: Date
  monthlyIncome: BookingCompletedAmount[]
  bookingCreatedAmount: BookingCompletedAmount[]
  bookingCompletedAmount: BookingCompletedAmount[]
  tshirtCreatedAmount: BookingCompletedAmount[]
}

export default function DashboardPage() {
  // Initialize with sample data
  const [dashboard, setDashboard] = useState<Dashboard>({
    year: new Date().getFullYear(),
    startDate: subMonths(new Date(), 6),
    endDate: new Date(),
    monthlyIncome: [
      { month: "Jan", amount: 4500 },
      { month: "Feb", amount: 3800 },
      { month: "Mar", amount: 5200 },
      { month: "Apr", amount: 6100 },
      { month: "May", amount: 5700 },
      { month: "Jun", amount: 6800 },
      { month: "Jul", amount: 7200 },
      { month: "Aug", amount: 7800 },
      { month: "Sep", amount: 8100 },
      { month: "Oct", amount: 7500 },
      { month: "Nov", amount: 8300 },
      { month: "Dec", amount: 9200 },
    ],
    bookingCreatedAmount: [
      { month: "Jan", amount: 120 },
      { month: "Feb", amount: 98 },
      { month: "Mar", amount: 140 },
      { month: "Apr", amount: 165 },
      { month: "May", amount: 148 },
      { month: "Jun", amount: 182 },
      { month: "Jul", amount: 195 },
      { month: "Aug", amount: 210 },
      { month: "Sep", amount: 222 },
      { month: "Oct", amount: 195 },
      { month: "Nov", amount: 230 },
      { month: "Dec", amount: 252 },
    ],
    bookingCompletedAmount: [
      { month: "Jan", amount: 95 },
      { month: "Feb", amount: 85 },
      { month: "Mar", amount: 110 },
      { month: "Apr", amount: 132 },
      { month: "May", amount: 118 },
      { month: "Jun", amount: 145 },
      { month: "Jul", amount: 160 },
      { month: "Aug", amount: 175 },
      { month: "Sep", amount: 190 },
      { month: "Oct", amount: 165 },
      { month: "Nov", amount: 195 },
      { month: "Dec", amount: 215 },
    ],
    tshirtCreatedAmount: [
      { month: "Jan", amount: 180 },
      { month: "Feb", amount: 150 },
      { month: "Mar", amount: 210 },
      { month: "Apr", amount: 245 },
      { month: "May", amount: 225 },
      { month: "Jun", amount: 270 },
      { month: "Jul", amount: 290 },
      { month: "Aug", amount: 310 },
      { month: "Sep", amount: 330 },
      { month: "Oct", amount: 290 },
      { month: "Nov", amount: 345 },
      { month: "Dec", amount: 380 },
    ],
  })

  // Date range selection
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: dashboard.startDate,
    to: dashboard.endDate,
  })

  // Calculate totals
  const totalIncome = dashboard.monthlyIncome.reduce((sum, item) => sum + item.amount, 0)
  const totalBookingsCreated = dashboard.bookingCreatedAmount.reduce((sum, item) => sum + item.amount, 0)
  const totalBookingsCompleted = dashboard.bookingCompletedAmount.reduce((sum, item) => sum + item.amount, 0)
  const totalTshirtsCreated = dashboard.tshirtCreatedAmount.reduce((sum, item) => sum + item.amount, 0)

  // Calculate completion rate
  const completionRate = Math.round((totalBookingsCompleted / totalBookingsCreated) * 100)

  // Handle year change
  const handleYearChange = (year: number) => {
    setDashboard({
      ...dashboard,
      year,
    })
    // In a real app, you would fetch new data for the selected year
  }

  // Handle date range change
  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range)
    setDashboard({
      ...dashboard,
      startDate: range.from,
      endDate: range.to,
    })
    // In a real app, you would fetch new data for the selected date range
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{dashboard.year}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[2021, 2022, 2023, 2024].map((year) => (
                  <DropdownMenuItem key={year} onClick={() => handleYearChange(year)}>
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      handleDateRangeChange(range as { from: Date; to: Date })
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $<CountUp end={totalIncome} separator="," duration={2} />
              </div>
              <p className="text-xs text-muted-foreground">
                +
                <CountUp
                  end={Math.round((dashboard.monthlyIncome[11].amount / dashboard.monthlyIncome[10].amount - 1) * 100)}
                  duration={1.5}
                />
                % from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings Created</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={totalBookingsCreated} duration={2} />
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {Math.round(
                  (dashboard.bookingCreatedAmount[11].amount / dashboard.bookingCreatedAmount[10].amount - 1) * 100,
                )}
                % from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings Completed</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={totalBookingsCompleted} duration={2} />
              </div>
              <p className="text-xs text-muted-foreground">
                <CountUp end={completionRate} duration={1.5} />% completion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">T-Shirts Created</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={totalTshirtsCreated} duration={2} />
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {Math.round(
                  (dashboard.tshirtCreatedAmount[11].amount / dashboard.tshirtCreatedAmount[10].amount - 1) * 100,
                )}
                % from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Income</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <MonthlyLineChart data={dashboard.monthlyIncome} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Bookings Overview</CardTitle>
                  <CardDescription>Comparison of created vs completed bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <MonthlyBarChart
                    data={[
                      {
                        name: "Created",
                        data: dashboard.bookingCreatedAmount,
                      },
                      {
                        name: "Completed",
                        data: dashboard.bookingCompletedAmount,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>T-Shirts Created</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyBarChart
                    data={[
                      {
                        name: "T-Shirts",
                        data: dashboard.tshirtCreatedAmount,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Average Income per Booking</p>
                        <p className="text-2xl font-bold">
                          $<CountUp end={Math.round(totalIncome / totalBookingsCompleted)} separator="," duration={2} />
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">T-Shirts per Booking</p>
                        <p className="text-2xl font-bold">
                          <CountUp end={totalTshirtsCreated / totalBookingsCompleted} decimals={2} duration={2} />
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Booking Completion Rate</p>
                        <p className="text-2xl font-bold">
                          <CountUp end={completionRate} duration={2} />%
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Monthly Growth Rate</p>
                        <p className="text-2xl font-bold">
                          +
                          <CountUp
                            end={Math.round(
                              (dashboard.monthlyIncome[11].amount / dashboard.monthlyIncome[10].amount - 1) * 100,
                            )}
                            duration={2}
                          />
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bookings Analysis</CardTitle>
                <CardDescription>Detailed view of booking metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Created vs Completed Bookings</h3>
                  <MonthlyBarChart
                    data={[
                      {
                        name: "Created",
                        data: dashboard.bookingCreatedAmount,
                      },
                      {
                        name: "Completed",
                        data: dashboard.bookingCompletedAmount,
                      },
                    ]}
                    height={350}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Bookings Created</h4>
                    <p className="text-3xl font-bold">{totalBookingsCreated}</p>
                    <p className="text-sm text-muted-foreground">
                      Average of {Math.round(totalBookingsCreated / 12)} bookings per month
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Bookings Completed</h4>
                    <p className="text-3xl font-bold">{totalBookingsCompleted}</p>
                    <p className="text-sm text-muted-foreground">{completionRate}% completion rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tshirts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>T-Shirt Production</CardTitle>
                <CardDescription>Monthly T-shirt creation statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Monthly T-Shirt Production</h3>
                  <MonthlyLineChart data={dashboard.tshirtCreatedAmount} height={350} />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Total T-Shirts Created</h4>
                    <p className="text-3xl font-bold">{totalTshirtsCreated}</p>
                    <p className="text-sm text-muted-foreground">
                      Average of {Math.round(totalTshirtsCreated / 12)} t-shirts per month
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">T-Shirts per Booking</h4>
                    <p className="text-3xl font-bold">{(totalTshirtsCreated / totalBookingsCompleted).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Based on completed bookings</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Peak Production</h4>
                    <p className="text-3xl font-bold">
                      {Math.max(...dashboard.tshirtCreatedAmount.map((item) => item.amount))}
                    </p>
                    <p className="text-sm text-muted-foreground">Highest monthly production</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Analysis</CardTitle>
                <CardDescription>Financial performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Monthly Income</h3>
                  <MonthlyLineChart data={dashboard.monthlyIncome} height={350} />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Income</h4>
                    <p className="text-3xl font-bold">${totalIncome.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      Average of ${Math.round(totalIncome / 12).toLocaleString()} per month
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Income per Booking</h4>
                    <p className="text-3xl font-bold">
                      ${Math.round(totalIncome / totalBookingsCompleted).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Based on completed bookings</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Income per T-Shirt</h4>
                    <p className="text-3xl font-bold">
                      ${Math.round(totalIncome / totalTshirtsCreated).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Average revenue per t-shirt</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

