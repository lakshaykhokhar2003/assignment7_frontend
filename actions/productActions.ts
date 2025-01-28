"use server"

import axios from "axios";
import {API} from "@/lib/utils";

export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${API}/api/product`);
        return res.data;
    } catch (error) {
        if (error instanceof Error) console.error("Unexpected error:", error.message);
        throw error;
    }
}