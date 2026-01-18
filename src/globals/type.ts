


export enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export enum PaymentMethod {
    Khalti = "Khalti",
    Esewa = "Esewa",
    COD = "cod"
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
        paymentStatus?: PaymentStatus,
        pidx?: string
    },
    items: OrderItem[]
}

export interface OrderItem {
    productId: string;
    quantity: number;
}

export interface KhaltiResponse {
    pidx: string,
    payment_url: string,
    expires_at: string,
    expires_in: number
}

export interface TransactionVerification {
    "pidx": string,
    "total_amount": number,
    "status": TransactionStatus,
    "transaction_id": string,
    "fee": number,
    "refunded": boolean
}

export enum TransactionStatus {
    Completed= "Completed",
    Expired = "Expired",
    UserCanceled = "User canceled",
    Pending= "Pending",
    Initiated = "Initiated",
    Refunded = "Refunded"
}