import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await auth();

  return Response.json({
    authenticated: Boolean(session),
    user: session?.user ?? null,
  });
}
