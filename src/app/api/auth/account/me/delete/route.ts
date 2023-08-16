import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../[...nextauth]/route";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    if (!session?.user?.email)
      return NextResponse.json(
        { message: "User not found!", status: "fail", statusCode: 404 },
        { status: 404 }
      );

    const deleteUserAccount = await prisma.user.delete({
      where: {
        email: session?.user?.email,
      },
    });
    return NextResponse.json(deleteUserAccount, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        statusCode: err.message.startsWith("User not") ? 404 : 400,
        message: err.message,
      },
      { status: err.message.startsWith("User not") ? 404 : 400 }
    );
  }
}
