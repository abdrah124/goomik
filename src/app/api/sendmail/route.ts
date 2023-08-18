import { sendEmail } from "@/lib/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  const response = await sendEmail(email as string, "HELLO WORLD", "LOLER");

  return new NextResponse("HELLOW " + JSON.stringify(response));
}
