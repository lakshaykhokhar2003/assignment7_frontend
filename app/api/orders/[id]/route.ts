import {NextResponse} from "next/server";
import {prisma} from "@/db";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await context.params;

        if (!id) return NextResponse.json({error: 'ID is required'}, {status: 400});

        const order = await prisma.orders.findUnique({
            where: {id: Number(id)},
            include: {orderProductMap: true},
        });

        if (!order) return NextResponse.json({error: "Order not found"}, {status: 404});

        return NextResponse.json(order, {status: 200});

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            {error: error instanceof Error ? error.message : 'Unknown error'},
            {status: 500}
        );
    }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    try {
        if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

        const body = await req.json();
        const { orderDescription, products } = body;

        const order = await prisma.orders.update({
            where: {id: parseInt(id)}, data: {
                orderDescription, orderProductMap: {
                    deleteMany: {}, create: products.map((productId:number) => ({
                        productId,
                    })),
                },
            },
        });
        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        return NextResponse.json({ message: "Order updated successfully", order }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        return NextResponse.json(
            { error: "Error updating order" },
            { status: 400 }
        );
    }
}



export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await context.params

        if (!id) return NextResponse.json({error: 'ID is required'}, {status: 400});
        await prisma.orderProductMap.deleteMany({
            where: {
                orderId: parseInt(id),
            },
        });

        const order = await prisma.orders.delete({
            where: {id: parseInt(id)},
        });

        return NextResponse.json({message: 'Order deleted successfully', order}, {status: 200});
    } catch (error) {
        if (error instanceof Error) console.error('Error:', error.message)
        return NextResponse.json({error}, {status: 400});
    }
}
