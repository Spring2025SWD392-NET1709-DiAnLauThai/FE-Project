import ProtectedRoute from "@/components/auth-provider/protected-route";
import { Role } from "@/domains/enums";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.MANAGER]}>
      <div className="h-full w-full flex justify-center items-center">
        <LayoutDashboard className="size-24 text-muted-foreground" />
      </div>
      {/* <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">IDR 7,852,000</div>
              <p className="text-xs text-muted-foreground">
                +2.1% vs last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">
                Order Time
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,890 orders</div>
              <p className="text-xs text-muted-foreground">
                From 1-6 Dec, 2020
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Your Rating
              </CardTitle>
              <CardDescription>Based on customer feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Food Taste</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Hygiene</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Packaging</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Most Ordered T-Shirt</CardTitle>
            <CardDescription>
              Adipiscing elit, sed do eiusmod tempor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="last6days">
              <TabsList>
                <TabsTrigger value="last6days">Last 6 days</TabsTrigger>
                <TabsTrigger value="lastweek">Last Week</TabsTrigger>
              </TabsList>
              <TabsContent value="last6days" className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-16 w-16 rounded-full bg-muted" />
                  <div className="flex-1">
                    <div className="font-medium">Fresh Salad Bowl</div>
                    <div className="text-sm text-muted-foreground">
                      IDR 45.000
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-16 w-16 rounded-full bg-muted" />
                  <div className="flex-1">
                    <div className="font-medium">Chicken Noodles</div>
                    <div className="text-sm text-muted-foreground">
                      IDR 75.000
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-16 w-16 rounded-full bg-muted" />
                  <div className="flex-1">
                    <div className="font-medium">Smoothie Fruits</div>
                    <div className="text-sm text-muted-foreground">
                      IDR 45.000
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div> */}
    </ProtectedRoute>
  );
}
