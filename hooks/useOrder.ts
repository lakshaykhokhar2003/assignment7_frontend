import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createOrder, deleteOrder, getAllOrders, updateOrder} from "@/actions/orderActions";
import {createOrderProps} from "@/types";
import {toastNotification} from "@/lib/utils";
import {useRouter} from 'next/navigation'


const useOrder = () => {
    const queryClient = useQueryClient();
    const navigate = useRouter()

    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
        staleTime: Infinity,
        enabled: true,
    });

    const invalidation = () => queryClient.invalidateQueries({queryKey: ['orders']});

    const addOrderMutation = useMutation({
        mutationFn: (data: createOrderProps) => createOrder(data),
        onSuccess: () => toastNotification({type: 'success', message: 'Order created successfully'}),
        onError: () => toastNotification({type: 'error', message: 'An error occurred while creating the order'}),
        onSettled: () => invalidation()
    });

    const updateOrderMutation = useMutation({
        mutationFn: ({id,data}:{id:number,data: createOrderProps}) => updateOrder(id,data),
        onSuccess: () => {
            toastNotification({type: 'success', message: 'Order updated successfully'})
            navigate.push('/')
        },
        onError: () => toastNotification({type: 'error', message: 'An error occurred while updating the order'}),
        onSettled: () => invalidation()
    })

    const deleteOrderMutation = useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => toastNotification({type: 'success', message: 'Order deleted successfully'}),
        onError: () => toastNotification({type: 'error', message: 'An error occurred while deleting the order'}),
        onSettled: () => invalidation()
    })

    return { orders, isLoading, addOrderMutation,updateOrderMutation,deleteOrderMutation};
}
export default useOrder
