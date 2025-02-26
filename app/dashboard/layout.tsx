import { ThemeProvider } from "@/components/theme-provide";
import Layout from "@/components/layout/dashboard-layout";
import { ProtectedRoute } from "@/components/route/protected-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}
