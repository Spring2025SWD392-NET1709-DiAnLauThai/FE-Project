import { LoginForm } from "@/components/auth-form/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-destructive">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Unauthorized Access
            </CardTitle>
            <CardDescription className="text-center">
              You need to be logged in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Please sign in with your credentials to continue
            </p>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              If you believe this is an error, please contact support
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
