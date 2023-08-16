import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  try {
    if (!name || !email || !password) throw new Error("Missing required data!");
    const userIsExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userIsExist) throw new Error("Email already registered!");

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));

    const newUser = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json(newUser);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { statusCode: 400, message: err.message },
      { status: 400 }
    );
  }
}
