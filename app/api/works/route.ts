import { NextRequest } from "next/server";
import { createWork } from "@/lib/adminStore";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  if (!payload.title || !payload.image || !payload.description?.en || !payload.description?.ja) {
    return Response.json({ error: "Missing required submission fields" }, { status: 400 });
  }

  const work = await createWork({
    ...payload,
    source: "visitor",
    status: "Pending",
  });

  return Response.json({ ok: true, work }, { status: 201 });
}