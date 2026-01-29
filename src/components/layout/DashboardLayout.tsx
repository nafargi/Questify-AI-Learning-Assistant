import { ReactNode } from "react";
import { Layout } from "./Layout";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <Layout title={title}>
      {children}
    </Layout>
  );
}
