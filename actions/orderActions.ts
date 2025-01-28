"use server"

import axios from "axios";
import {API} from "@/lib/utils";
import {createOrderProps} from "@/types";
import {NextResponse} from "next/server";

export const getAllOrders = async () => {
    try {
        const res = await axios.get(`${API}/api/orders`);
        return res.data;
    } catch (error) {
        if (error instanceof Error) console.error("Unexpected error:", error.message);
        throw error;
    }
}

export const getOrderById = async (id: number) => {
    try {
        const res = await axios.get(`${API}/api/orders/${id}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.warn(`Order with ID ${id} not found.`);
                return;
            }
            console.error(`Axios error: ${error.message}`);
        }
        else console.error(`Unexpected error: ${(error as Error).message}`);

        throw error;
    }
}
export const createOrder = async (data: createOrderProps) => {
    try {
         await axios.post(`${API}/api/orders`, data);
    } catch (error) {
        if (error instanceof Error) NextResponse.json({error: error.message}, {status: 400});
        throw error;
    }
};
export const updateOrder = async (id: number, data:createOrderProps) => {
    try {
         await axios.put(`${API}/api/orders/${id}`, data);
    } catch (error) {
        if (error instanceof Error) NextResponse.json({error: error.message}, {status: 400});
        throw error;
    }
}

export const deleteOrder = async (id: number) => {
    try {
        await axios.delete(`${API}/api/orders/${id}`);
    } catch (error) {
       if (error instanceof Error) NextResponse.json({error: error.message}, {status: 400});
        throw error;
    }
}

