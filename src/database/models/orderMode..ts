import { Table, Column, Model, DataType } from "sequelize-typescript"
import { OrderStatus } from "../../globals/type";

@Table({
    tableName: "orders",
    modelName: "Order",
    timestamps: true
})

class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare phoneNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare shippingAddress: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare totalAmount: number;

    @Column({
        type: DataType.ENUM(OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.SHIPPED),
        defaultValue: OrderStatus.PENDING
    })
    declare orderStatus: number;
}

export default Order;