import {NextResponse} from "next/server";
import {prisma} from "@/db";

export async function GET() {
    try {
        const orders = await prisma.orders.findMany({
            include: {orderProductMap: true},

        });
        return NextResponse.json(orders, {status: 200});
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

export async function POST(req: Request) {
    try {
        const {orderDescription, products} = await req.json();
        const order = await prisma.orders.create({
            data: {
                orderDescription,
                orderProductMap: {
                    create: products.map((productId: number) => ({productId})),
                },
            },
        });
        return NextResponse.json(order, {status: 201});
    } catch (error) {
        if (error instanceof Error) console.error('Error:', error.message);
    }
}
