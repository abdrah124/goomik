import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, comicId } = await request.json();
  try {
    if (!userId || !comicId)
      return NextResponse.json(
        { status: "fail", statusCode: 404, message: "Missing required data!" },
        { status: 404 }
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found!");

    const isBookmarked = await prisma.bookmark.findFirst({
      where: {
        comicId,
        userId,
      },
    });

    if (isBookmarked) throw new Error("This item is already bookmarked");

    const createBookmark = await prisma.bookmark.create({
      data: {
        userId,
        comicId,
      },
    });

    if (!createBookmark) throw new Error("Something went wrong!");

    return NextResponse.json(createBookmark, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        statusCode: err.message.includes("User not found") ? 404 : 409,
        message: err.message,
      },
      { status: err.message.includes("User not found") ? 404 : 409 }
    );
  }
}
