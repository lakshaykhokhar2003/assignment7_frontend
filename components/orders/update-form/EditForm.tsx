"use client";

import React from "react";
import useOrder from "@/hooks/useOrder";
import useProduct from "@/hooks/useProduct";
import Loader from "@/components/loading-spinner/Loader";
import OrderForm from "@/components/orders/form/OrderForm";
import {editOrderProps} from "@/types";
import {useParams} from "next/navigation";

const EditOrderForm: React.FC<editOrderProps> = ({description, items}) => {
    const params = useParams();
    const orderId = Number(params.id);

    const {products, isLoading} = useProduct();
    const {updateOrderMutation} = useOrder();

    if (isLoading) return <Loader/>;

    const handleSubmit = (data: editOrderProps) => {
        const updatedData = {
            orderDescription: data.description,
            products: data.items,
        };

        updateOrderMutation.mutate({
            id: orderId,
            data: updatedData,
        });

    };

    return (
        <OrderForm
            defaultValues={{description: description, items: items}}
            products={products}
            onSubmit={handleSubmit}/>
    );
};

export default EditOrderForm;
