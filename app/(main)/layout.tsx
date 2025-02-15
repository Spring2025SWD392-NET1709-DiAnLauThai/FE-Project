import { Layout } from "@/components/homepage/layout-home";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
}
