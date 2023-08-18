import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Something went wrong!");
    const myInfo = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    return NextResponse.json(myInfo, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: "failed", statusCode: 400, message: err.message },
      { status: 400 }
    );
  }
}
