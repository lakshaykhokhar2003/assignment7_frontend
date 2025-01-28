import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "sonner";
import {toastProps} from "@/types";

export const API = process.env.NEXT_PUBLIC_SERVER_URL;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

export const nameFix = (columnName: string) => {
    switch (columnName) {
        case 'count':
            return 'Count of Products';
        case 'orderDescription':
            return 'Order Description';
        case 'createdAt':
            return 'Created Date';
        case 'orderId':
            return 'Order ID';
        default:
            return columnName;
    }
}

export const toastNotification = ({type, message}: toastProps) => toast[type](message)