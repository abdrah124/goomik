import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; bookmarkId: string } }
) {
  const { bookmarkId, userId } = params;
  try {
    const bookmarkItemDetail = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        bookmarks: {
          where: {
            comicId: bookmarkId,
          },
        },
      },
    });

    if (bookmarkItemDetail?.bookmarks.length === 0)
      throw new Error("Can't found the data!");

    return NextResponse.json(bookmarkItemDetail?.bookmarks?.[0], {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        statusCode: 404,
        message: err.message,
      },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; bookmarkId: string } }
) {
  const { userId, bookmarkId } = params;
  try {
    const userIsExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userIsExist) throw new Error("Can't found the user");

    const deleteLib = await prisma.bookmark.delete({
      where: {
        userId,
        AND: {
          comicId: bookmarkId,
        },
      },
    });

    return NextResponse.json(deleteLib, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        statusCode: 404,
        message: err.message.startsWith("Can't found")
          ? err.message
          : "Can't found bookmarked item with the associated id",
      },
      { status: 404 }
    );
  }
}
