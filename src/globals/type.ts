


export enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export enum PaymentMethod {
    Khalti = "Khalti",
    Esewa = "Esewa",
    COD = "Cash On Delivery"
}

export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID"
}

export interface OrderData {
    phoneNumber: string;
    shippingAddress: string;
    totalAmount: number;
    paymentDetails: {
        paymentMethod: PaymentMethod,
        paymentStatus: PaymentStatus,
        pidx?: string
    },
    items: OrderItem[]
}

export interface OrderItem {
    productId: string;
    quantity: number;
}
