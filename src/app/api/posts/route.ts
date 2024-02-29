import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const posts = await prisma.post.findMany();

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    await prisma.post.create({ data: body });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    message: "Post created successfully",
    status: 201,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
}
