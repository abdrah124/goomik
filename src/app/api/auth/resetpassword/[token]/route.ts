import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { newPassword } = await request.json();
  try {
    if (!params.token) throw new Error("Token not provided!");

    // validate token

    const token = await prisma.resetToken.findFirst({
      where: {
        token: params.token,
      },
    });

    if (!token) throw new Error("Token is not valid!");

    if (Date.parse(token?.expireAt as unknown as string) < Date.now())
      throw new Error("Reset token is already expired!");

    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_SALT)
    );

    // update token after validating

    const updateUserPassword = await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    // delete all token after updating

    await prisma.resetToken.deleteMany({
      where: {
        id: token?.id,
      },
    });

    return NextResponse.json(updateUserPassword, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: err.message,
      },
      { status: 400 }
    );
  }
}
