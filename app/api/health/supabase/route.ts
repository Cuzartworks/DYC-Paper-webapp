import { auth } from "@/app/api/auth/[...nextauth]/route";
import { checkSupabaseConnection } from "@/lib/adminStore";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "管理者ログインが必要です。" }, { status: 401 });
  }

  const result = await checkSupabaseConnection();
  return Response.json(result, { status: result.database && result.storage ? 200 : 503 });
}