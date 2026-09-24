import { getDashboardSnapshot } from "@/lib/adminStore";

export async function GET() {
  try {
    const snapshot = await getDashboardSnapshot();
    return Response.json(snapshot);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "ダッシュボードを取得できませんでした。" }, { status: 500 });
  }
}
