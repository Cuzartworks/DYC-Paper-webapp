import { NextRequest } from "next/server";
import { createBoardPost, listBoardPosts } from "@/lib/adminStore";

export async function GET() {
  const posts = await listBoardPosts();
  return Response.json(posts);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const post = await createBoardPost(payload);
  return Response.json(post, { status: 201 });
}
