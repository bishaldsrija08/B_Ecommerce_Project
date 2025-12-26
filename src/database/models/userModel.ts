import { ENUM } from "sequelize";
import {Table, Column, Model, DataType, CreatedAt, PrimaryKey, AllowNull} from "sequelize-typescript"
import { toDefaultValue } from "sequelize/lib/utils";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true,
})

class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        // unique: true,
        // allowNull: false
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare userEmail: string;
    
    @Column({
        type: DataType.STRING
    })
    declare userPassword: string;

    @Column({
        type:DataType.ENUM("admin", "customer"),
        defaultValue: "customer"
    })
    declare role: string
}

export default User;