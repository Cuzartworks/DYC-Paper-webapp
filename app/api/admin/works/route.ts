import { NextRequest } from "next/server";
import { createWork, deleteWork, listWorks, updateWorkStatus } from "@/lib/adminStore";

export async function GET() {
  const works = await listWorks();
  return Response.json(works);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const work = await createWork(payload);
  return Response.json(work, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing work id" }, { status: 400 });
  }

  await deleteWork(id);
  return Response.json({ ok: true });
}

export async function PATCH(request: NextRequest) {
  const payload = await request.json();
  const work = await updateWorkStatus(payload.id, payload.status);

  if (!work) {
    return Response.json({ error: "Work not found" }, { status: 404 });
  }

  return Response.json(work);
}
