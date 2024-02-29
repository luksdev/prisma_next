import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: {id: string} }) {
  if (!params.id) {
    return NextResponse.json({
      message: "Post not found",
      status: 404,
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(post);
}

export async function PUT(request: Request) {
  const body = await request.json();
}
