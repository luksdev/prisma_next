import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  return NextResponse.json({
    message: "Prisma w/next 13",
  });
}
