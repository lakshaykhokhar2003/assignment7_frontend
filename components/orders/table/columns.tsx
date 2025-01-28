import {ColumnDef} from "@tanstack/react-table";
import {Order} from "@/types";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, Pen, Trash} from "lucide-react";
import {formatDate} from "@/lib/utils";
import {TooltipContext} from "@/components/ui/tooltip";
import Link from "next/link";
import {DeleteDialog} from "@/components/ui/alert-dialog";
import React from "react";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderId",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 pr-0 text-center w-full"
                >
                    Order ID
                    <ArrowUpDown/>
                </Button>

            )
        },
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("orderId")}</div>
        ),
    },
    {
        accessorKey: "orderDescription",
        header: 'Order Description',
        cell: ({row}) => <div className="lowercase">{row.getValue("orderDescription")}</div>,
    },
    {
        accessorKey: "count",
        header: 'Count of Products',
        cell: ({row}) => {
            return <div className="capitalize">{(row.getValue("count") as [])?.length}</div>
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 pr-0"
                >
                    Created Date
                    <ArrowUpDown/>
                </Button>

            )
        },
        cell: ({row}) => (
            <div className="capitalize">{formatDate(row.getValue("createdAt"))}</div>
        ),
    },
    {
        accessorKey: "actions",
        header: 'Actions',
        cell: ({row}) => {
            return (
                <div className="flex gap-2">
                    <TooltipContext text="Edit">
                        <Link href={`/update-order/${row.original.orderId}`}>
                            <Pen size={18} className="text-black cursor-pointer"/>
                        </Link>
                    </TooltipContext>
                    <TooltipContext text="Delete">
                        <DeleteDialog product={row.original}>
                            <Trash size={18} className="text-red-600 cursor-pointer"/>
                        </DeleteDialog>
                    </TooltipContext>
                </div>
            )
        }
    },
]