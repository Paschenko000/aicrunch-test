import {DUMMY_PRODUCTS_DATA} from "@/app/models/products";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }): Promise<any> {
    try {
        // EMULATE TIMEOUT FETCHING FROM DB
        await new Promise(resolve => setTimeout(resolve, 500));
        const slug = params.slug;
        const item = DUMMY_PRODUCTS_DATA.find(item => item.id.toString() === slug);
        if (!item) {
            return NextResponse.json({ item: null, success: false } , {status: 404})
        }

        return NextResponse.json({ item, success: true } , {status: 200})
    } catch (e) {
        return  NextResponse.json({ success: false }, {status: 500});
    }
}
