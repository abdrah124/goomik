import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { status: "failed", statusCode: 400 },
      { status: 400 }
    );
  }
}
