"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import React from "react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {FormSchema, OrderFormProps} from "@/types";
import Link from "next/link";

const OrderForm: React.FC<OrderFormProps> = ({defaultValues, products, onSubmit, onClose}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const cancelButton =  <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Order Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className={cn(form.formState.errors.description ? "text-red-600" : "text-base", "font-semibold")}>
                                Order Description
                            </FormLabel>
                            <FormControl>
                                <Input id="description" placeholder="Description of your project" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Checkbox Multiple Selection */}
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel
                                    className={cn(form.formState.errors.items ? "text-red-600" : "text-base", "font-semibold")}>
                                    Product Options
                                </FormLabel>
                                <FormDescription>Select the items you want to order.</FormDescription>
                            </div>
                            {products.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="items"
                                    render={({field}) => {
                                        const isChecked = field.value?.includes(item.id);
                                        return (
                                            <FormItem key={item.id}
                                                      className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl className="m-2">
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(field.value?.filter((value) => value !== item.id));
                                                        }}
                                                    />
                                                </FormControl>
                                                <div className="flex-col justify-items-start p-0 m-0">
                                                    <FormLabel
                                                        className="text-sm font-normal cursor-pointer">{item.productName}</FormLabel>
                                                    <FormDescription
                                                        className="block">{item.productDescription}</FormDescription>
                                                </div>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex justify-between">
                    {onClose ?  cancelButton : <Link href="/">{cancelButton}</Link>}
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default OrderForm;
