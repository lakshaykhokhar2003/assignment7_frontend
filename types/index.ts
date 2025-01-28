import React from "react";
import {z} from "zod";

export type Order = {
    id: string | number
    orderId: number
    orderDescription: string
    count: number
    createdAt: string
}
export type orderProductMap = {
    id: number
    productId: number
    orderId: number
}

export type createOrderProps = {
    orderDescription: string,
    products: number[]
}

export interface OrderProps extends Partial<Order> {
    orderProductMap: orderProductMap[]
}

export type ModalProps = {
    isForm?: boolean
    onClose: () => void;
    children: React.ReactNode;
}

export type ProductProps = {
    id: number
    productName: string
    productDescription: string
}

export interface NewOrderFormProps {
    onClose: () => void;
}


export type FormDataType = {
    orderDescription: string
    products: number[]
}

export type toastProps = {
    type: 'success' | 'error' | 'info' | 'warning',
    message: string
}

export type editOrderProps = {
        description: string;
        items: number[]
}

export const FormSchema = z.object({
    description: z.string().min(1, "Order description is required."),
    items: z.array(z.number()).min(1, {message: "You must select at least one option."}),
});

export type OrderFormProps = {
    defaultValues?: z.infer<typeof FormSchema>;
    products: { id: number; productName: string; productDescription: string }[];
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
    onClose?: () => void;
};
