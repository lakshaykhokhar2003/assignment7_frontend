import {NextResponse} from "next/server";
import {prisma} from "@/db";

export async function GET() {
    try {
        const products = await prisma.products.findMany({
            include: {orderProductMap: false},
        });

        return NextResponse.json(products, {status: 200});
    } catch (error) {
        if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
            return NextResponse.json(
                {error: "An unexpected error occurred"},
                {status: 500}
            );
        }
    }
}