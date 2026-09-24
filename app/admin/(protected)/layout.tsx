import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}