"use client";

import { useState } from "react";
import { LineChart, Package, ShoppingCart, Wallet } from "lucide-react";
import { subMonths } from "date-fns";
import CountUp from "react-countup";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";
import { Dashboard } from "@/domains/models/dashboard.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthlyLineChart } from "@/components/dashboard/monthly-line-chart";
import { MonthlyBarChart } from "@/components/dashboard/monthly-bar-chart";

// // Define interfaces
// interface BookingCompletedAmount {
//   month: string;
//   amount: number;
// }

// interface Dashboard {
//   year: number;
//   startDate: Date;
//   endDate: Date;
//   monthlyIncome: BookingCompletedAmount[];
//   bookingCreatedAmount: BookingCompletedAmount[];
//   bookingCompletedAmount: BookingCompletedAmount[];
//   tshirtCreatedAmount: BookingCompletedAmount[];
// }

export default function DashboardPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });

  const { data: dashboardData, isLoading } = useDashboard({
    year: year,
    startDate: dateRange.from,
    endDate: dateRange.to,
  });

  // Use optional chaining since data might be loading
  const dashboard: Dashboard = dashboardData?.data || {
    year: new Date().getFullYear(),
    startDate: dateRange.from,
    endDate: dateRange.to,
    monthlyIncome: [],
    bookingCreatedAmount: [],
    bookingCompletedAmount: [],
    tshirtCreatedAmount: [],
  };

  // Handle year change
  const handleYearChange = (year: number) => {
    setYear(year);
    // setDashboard({
    //   ...dashboard,
    //   year,
    // });
  };

  // Handle date range change
  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Calculate totals
  const totalIncome = dashboard.monthlyIncome.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalBookingsCreated = dashboard.bookingCreatedAmount.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalBookingsCompleted = dashboard.bookingCompletedAmount.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalTshirtsCreated = dashboard.tshirtCreatedAmount.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Calculate completion rate
  const completionRate = Math.round(
    (totalBookingsCompleted / totalBookingsCreated) * 100
  );

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
                {[2021, 2022, 2023, 2024, 2025].map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <Select
                value={
                  dateRange.from
                    ? (dateRange.from.getMonth() + 1).toString()
                    : undefined
                }
                onValueChange={(value) => {
                  const newFrom = new Date(dateRange.from || new Date());
                  newFrom.setMonth(parseInt(value) - 1);
                  handleDateRangeChange({ ...dateRange, from: newFrom });
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="From month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(2000, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={
                  dateRange.to
                    ? (dateRange.to.getMonth() + 1).toString()
                    : undefined
                }
                onValueChange={(value) => {
                  const newTo = new Date(dateRange.to || new Date());
                  newTo.setMonth(parseInt(value) - 1);
                  handleDateRangeChange({ ...dateRange, to: newTo });
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="To month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(2000, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button> */}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Income
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={totalIncome} separator="," duration={2} />
                VND
              </div>
              <p className="text-xs text-muted-foreground">
                +
                <CountUp
                  end={Math.round(
                    (dashboard.monthlyIncome[11].amount /
                      dashboard.monthlyIncome[10].amount -
                      1) *
                      100
                  )}
                  duration={1.5}
                />
                % from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bookings Created
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={totalBookingsCreated} duration={2} />
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {Math.round(
                  (dashboard.bookingCreatedAmount[11].amount /
                    dashboard.bookingCreatedAmount[10].amount -
                    1) *
                    100
                )}
                % from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bookings Completed
              </CardTitle>
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
              <CardTitle className="text-sm font-medium">
                T-Shirts Created
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={totalTshirtsCreated} duration={2} />
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {Math.round(
                  (dashboard.tshirtCreatedAmount[11].amount /
                    dashboard.tshirtCreatedAmount[10].amount -
                    1) *
                    100
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
                  <CardDescription>
                    Comparison of created vs completed bookings
                  </CardDescription>
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
                  <CardDescription>
                    Key performance indicators for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Average Income per Booking
                        </p>
                        <p className="text-2xl font-bold">
                          <CountUp
                            end={Math.round(
                              totalIncome / totalBookingsCompleted
                            )}
                            separator=","
                            duration={2}
                          />
                          VND
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          T-Shirts per Booking
                        </p>
                        <p className="text-2xl font-bold">
                          <CountUp
                            end={totalTshirtsCreated / totalBookingsCompleted}
                            decimals={2}
                            duration={2}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Booking Completion Rate
                        </p>
                        <p className="text-2xl font-bold">
                          <CountUp end={completionRate} duration={2} />%
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Monthly Growth Rate
                        </p>
                        <p className="text-2xl font-bold">
                          +
                          <CountUp
                            end={Math.round(
                              (dashboard.monthlyIncome[11].amount /
                                dashboard.monthlyIncome[10].amount -
                                1) *
                                100
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
                <CardDescription>
                  Detailed view of booking metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Created vs Completed Bookings
                  </h3>
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
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Total Bookings Created
                    </h4>
                    <p className="text-3xl font-bold">{totalBookingsCreated}</p>
                    <p className="text-sm text-muted-foreground">
                      Average of {Math.round(totalBookingsCreated / 12)}{" "}
                      bookings per month
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Total Bookings Completed
                    </h4>
                    <p className="text-3xl font-bold">
                      {totalBookingsCompleted}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {completionRate}% completion rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tshirts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>T-Shirt Production</CardTitle>
                <CardDescription>
                  Monthly T-shirt creation statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Monthly T-Shirt Production
                  </h3>
                  <MonthlyLineChart
                    data={dashboard.tshirtCreatedAmount}
                    height={350}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Total T-Shirts Created
                    </h4>
                    <p className="text-3xl font-bold">{totalTshirtsCreated}</p>
                    <p className="text-sm text-muted-foreground">
                      Average of {Math.round(totalTshirtsCreated / 12)} t-shirts
                      per month
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      T-Shirts per Booking
                    </h4>
                    <p className="text-3xl font-bold">
                      {(totalTshirtsCreated / totalBookingsCompleted).toFixed(
                        2
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on completed bookings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Peak Production
                    </h4>
                    <p className="text-3xl font-bold">
                      {Math.max(
                        ...dashboard.tshirtCreatedAmount.map(
                          (item) => item.amount
                        )
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Highest monthly production
                    </p>
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
                  <MonthlyLineChart
                    data={dashboard.monthlyIncome}
                    height={350}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Total Income
                    </h4>
                    <p className="text-3xl font-bold">
                      {totalIncome.toLocaleString()}VND
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Average of VND
                      {Math.round(totalIncome / 12).toLocaleString()} per month
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Income per Booking
                    </h4>
                    <p className="text-3xl font-bold">
                      {Math.round(
                        totalIncome / totalBookingsCompleted
                      ).toLocaleString()}{" "}
                      VND
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on completed bookings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Income per T-Shirt
                    </h4>
                    <p className="text-3xl font-bold">
                      {Math.round(
                        totalIncome / totalTshirtsCreated
                      ).toLocaleString()}{" "}
                      VND
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Average revenue per t-shirt
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
