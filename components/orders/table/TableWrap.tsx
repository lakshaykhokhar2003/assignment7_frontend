"use client"

import React from 'react'
import DataTable from "@/components/orders/table/data-table";
import useOrder from "@/hooks/useOrder";
import {OrderProps} from "@/types";
import Loader from "@/components/loading-spinner/Loader";

const TableWrap = () => {
    const {orders,isLoading} = useOrder();
    const data = orders?.map((order: OrderProps) => {
        return {
            ...order,
            orderId: order.id,
            count: order?.orderProductMap
        }
    })
    if (isLoading) return <Loader/>

    return <DataTable data={data}/>

}
export default TableWrap
