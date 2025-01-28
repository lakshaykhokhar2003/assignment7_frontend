"use client"

import React, {useEffect} from 'react'
import {getOrderById} from "@/actions/orderActions";
import {motion} from "framer-motion";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Loader from "@/components/loading-spinner/Loader";
import {orderProductMap} from "@/types";
import {useParams} from "next/navigation";
import EditOrderForm from "@/components/orders/update-form/EditForm";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";


const Page = () => {
    const queryClient = useQueryClient();
    const params = useParams();
    const orderId = params?.id ? Number(params.id) : null;

    const { data, error, isLoading } = useQuery({
        queryKey: ['order-id', orderId],
        queryFn: () => getOrderById(orderId as number),
        enabled: !!orderId,
        retry: 1
    });

    useEffect(() => {
        return () => queryClient.removeQueries({queryKey: ['order-id', orderId]})
    }, [orderId]);

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    const items = data?.orderProductMap?.map((item: orderProductMap) => item.productId) ?? [];

    return (
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 20}}
        className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
    >
        <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
            <div className="absolute top-4 left-4">
                <Link href="/">
                    <Button className="text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                        <ArrowLeft size={18}/> Back Home
                    </Button>
                </Link>
            </div>
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">Edit Order</CardTitle>
            </CardHeader>
            <CardContent>
                <EditOrderForm description={data.orderDescription} items={items}/>
            </CardContent>
        </Card>
    </motion.div>

    );

}
export default Page
