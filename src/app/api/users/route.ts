import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const userCreated = await prisma.user.create({ data: body });

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      data: userCreated
    });
  } catch (error) {
    console.log(error);
  }
}
