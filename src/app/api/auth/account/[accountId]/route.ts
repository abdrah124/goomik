import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.accountId,
      },
    });

    if (!user) throw new Error("User not found!");

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "failed",
        statusCode: err.message.startsWith("User not") ? 404 : 400,
        message: err.message,
      },
      { status: err.message.startsWith("User not") ? 404 : 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const { username, image, role } = await request.json();
  const { accountId } = params;

  try {
    if (!accountId) throw new Error("No account id provided!");
    const userAccount = await prisma.user.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!userAccount) throw new Error("User does not exist!");

    const updateUserData = await prisma.user.update({
      where: {
        id: accountId,
      },
      data: {
        name: username || undefined,
        image: image || undefined,
        role: role || undefined,
      },
    });

    return NextResponse.json(updateUserData, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        statusCode: err.message.startsWith("User does not") ? 404 : 400,
        message: err.message,
      },
      { status: err.message.startsWith("User does not") ? 404 : 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const { accountId } = params;
  try {
    if (!accountId) throw new Error("No account id provided!");
    const userAccount = await prisma.user.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!userAccount) throw new Error("User does not exist!");

    const deleteUserAccount = await prisma.user.delete({
      where: {
        id: accountId,
      },
    });
    return NextResponse.json(deleteUserAccount, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        statusCode: err.message.startsWith("User does not") ? 404 : 400,
        message: err.message,
      },
      { status: err.message.startsWith("User does not") ? 404 : 400 }
    );
  }
}
