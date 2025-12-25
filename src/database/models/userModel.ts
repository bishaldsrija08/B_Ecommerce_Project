import {Table, Column, Model, DataType, CreatedAt, PrimaryKey} from "sequelize-typescript"

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
        type: DataType.STRING
    })
    declare userEmail: string;
    
    @Column({
        type: DataType.STRING
    })
    declare userPassword: string;
}

export default User;