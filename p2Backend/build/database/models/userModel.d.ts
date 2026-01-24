import { Model } from "sequelize-typescript";
declare class User extends Model {
    id: string;
    username: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
}
export default User;
//# sourceMappingURL=userModel.d.ts.map