import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: [{ role: "asc" }, { name: "asc" }],
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: "failed", statusCode: 400, message: err.message },
      { status: 400 }
    );
  }
}
