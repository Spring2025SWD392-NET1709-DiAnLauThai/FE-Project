import { ThemeProvider } from "@/components/theme-provide";
import Layout from "@/components/layout/dashboard-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Layout>{children}</Layout>
      </ThemeProvider>
    </div>
  );
}
