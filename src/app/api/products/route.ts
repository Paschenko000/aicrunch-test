import {DUMMY_PRODUCTS_DATA} from "@/app/models/products";
import {NextRequest, NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<any> {
    const page = Number(req.nextUrl.searchParams.get('page') as string);
    const size = Number(req.nextUrl.searchParams.get('size') as string);
    try {
        // EMULATE TIMEOUT FETCHING FROM DB
        await new Promise(resolve => setTimeout(resolve, 500));
        if (page && size && page >= 1 && size >= 1) {
            return NextResponse.json({ list: DUMMY_PRODUCTS_DATA.slice((page - 1) * size, size * page), success: true, totalCount: DUMMY_PRODUCTS_DATA.length, size, page } , {status: 200})
        }
        return NextResponse.json({list: [], success: false, totalCount: 0, size: 0, page: 1} , {status: 404});

    } catch (e) {
        return  NextResponse.json({ success: false }, {status: 500});
    }
}
