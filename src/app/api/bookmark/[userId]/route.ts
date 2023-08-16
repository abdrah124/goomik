import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    const userLibrary = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        bookmarks: {
          select: {
            comicId: true,
          },
        },
      },
    });

    if (!userLibrary) throw new Error("User not found!");

    return NextResponse.json(userLibrary, { status: 200 });
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

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   const { userId } = params;
//   const { savedComic } = await request.json();
//   try {
//     const updateLib = await prisma.library.update({
//       where: {
//         userId,
//       },
//       data: {
//         savedComic,
//       },
//     });

//     return NextResponse.json(updateLib, { status: 200 });
//   } catch (err: any) {
//     return NextResponse.json(
//       {
//         status: "fail",
//         statusCode: 404,
//         message: "Can't found library with associated user id",
//       },
//       { status: 404 }
//     );
//   }
// }
