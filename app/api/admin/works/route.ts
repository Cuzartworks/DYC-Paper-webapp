import { NextRequest } from "next/server";
import { createWork, deleteWork, listWorks, updateWorkStatus } from "@/lib/adminStore";

export async function GET() {
  try {
    const works = await listWorks();
    return Response.json(works);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "作品一覧を取得できませんでした。" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const work = await createWork(payload);
    return Response.json(work, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "作品を保存できませんでした。" }, { status: 500 });
  }
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
  try {
    const payload = await request.json();
    const work = await updateWorkStatus(payload.id, payload.status);

    if (!work) {
      return Response.json({ error: "Work not found" }, { status: 404 });
    }

    return Response.json(work);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "作品の状態を更新できませんでした。" }, { status: 500 });
  }
}
