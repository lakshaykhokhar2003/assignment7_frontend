"use client"

import {useState} from 'react'
import Modal from "@/components/ui/Modal";
import {AnimatePresence} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import OrderForm from "@/components/orders/form/OrderForm";
import useProduct from "@/hooks/useProduct";
import {editOrderProps} from "@/types";
import useOrder from "@/hooks/useOrder";

const NewOrder = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const {products} = useProduct()
    const {addOrderMutation} = useOrder()

    const toggleModal = (): void => setModalOpen(!isModalOpen);

    const handleSubmit = (data: editOrderProps) => {
        const newData = {
            orderDescription: data.description,
            products: data.items,
        }

        addOrderMutation.mutate(newData);
        toggleModal();
    }

    return (
        <>
            <Button onClick={toggleModal}>New Order +</Button>

            <AnimatePresence>
                {isModalOpen && <>
                    <Modal onClose={toggleModal}>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Create New Order</CardTitle>
                                <CardDescription>Fill in the form below to create a new order</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <OrderForm
                                    defaultValues={{ description: "", items: [] }}
                                    products={products}
                                    onSubmit={handleSubmit}
                                    onClose={toggleModal}
                                />
                            </CardContent>
                        </Card>
                </Modal>
                </>}
            </AnimatePresence>
        </>
    );
}
export default NewOrder