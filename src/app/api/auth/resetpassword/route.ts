import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import cryto from "crypto";
import { sendEmail } from "@/lib/sendEmail";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    if (!email) throw new Error("No email provided!");
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User does not exist!");
    const expireAt = new Date(Date.now() + 10 * 60 * 1000);
    const resetToken = cryto.randomBytes(32).toString("hex");

    const token = await prisma.resetToken.create({
      data: {
        expireAt,
        token: resetToken,
        userId: user.id,
      },
    });

    await sendEmail(
      email,
      "Gooscans account reset password",
      `This is your reset password token ${resetToken},
or you can visit this link 
${config.baseWebUrl}/resetpassword/${resetToken}
this link will be expired after 10 minutes email been sent`
    );

    return NextResponse.json(token, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        message: err.message,
      },
      { status: 400 }
    );
  }
}
