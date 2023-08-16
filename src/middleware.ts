import { NextRequest, NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const profile = await getToken({ req: request });

  if (pathname.includes("account") && !pathname.includes("me")) {
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else if (profile?.role !== "admin")
      return NextResponse.json(
        {
          status: "failed",
          message: "This route can only be accessed by the admin",
          statusCode: 401,
        },
        {
          status: 401,
        }
      );
  }

  if (
    (pathname.includes("bookmark") ||
      (pathname.includes("account") && pathname.includes("me"))) &&
    !profile
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!pathname.includes("auth") && !pathname.endsWith("bookmark")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
