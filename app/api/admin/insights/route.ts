import { getDashboardSnapshot } from "@/lib/adminStore";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return Response.json(snapshot);
}
