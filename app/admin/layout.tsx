import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | DYC PAPER",
  description: "Developer-only dashboard for submissions, inquiries, and announcements.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
