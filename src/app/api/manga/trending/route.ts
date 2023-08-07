import { config } from "@/lib/config";
import {
  MangaDetailSimplified,
  PagingObjectSearch,
  ResponseObject,
  ResponseObjectFailed,
} from "@/models/manga";
import { NextResponse } from "next/server";
const { baseWebUrl } = config;

export async function GET(
  request: Request
): Promise<
  | NextResponse<ResponseObject<PagingObjectSearch<MangaDetailSimplified[]>>>
  | NextResponse<ResponseObjectFailed>
> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) ?? 1;
  try {
    const responseData = await fetch(
      `${baseWebUrl}/api/search?q=&order_by=trending&page=${page}`,
      { next: { revalidate: 0 } }
    );
    const json = await responseData.json();
    return NextResponse.json(
      {
        ...json,
        data: {
          items: json.data.items,
          next:
            json.data.total > 12
              ? `${baseWebUrl}/api/manga/trending?page=${page + 1}`
              : null,
          prev:
            page > 1
              ? `${baseWebUrl}/api/manga/trending?page=${page - 1}`
              : null,
          total: json.data.total,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        status: 401,
        message: err.message,
      },
      { status: err.message === "Not found" ? 404 : 401 }
    );
  }
}
