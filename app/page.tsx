import React from "react";
import NewOrder from "@/components/orders/new-order/NewOrder";
import {getAllOrders} from "@/actions/orderActions";
import {getAllProducts} from "@/actions/productActions";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import TableWrap from "@/components/orders/table/TableWrap";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    })

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    })

    return (
        <div className="w-full container mx-auto py-10">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-6xl font-bold">Order Management</h1>
                    <NewOrder/>
                </div>
                <TableWrap/>
            </HydrationBoundary>
        </div>
    );
}
