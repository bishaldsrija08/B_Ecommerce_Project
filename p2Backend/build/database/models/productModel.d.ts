import { Model } from "sequelize-typescript";
declare class Product extends Model {
    id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    procuctTotalStockQty: number;
    productImageUrl: string;
}
export default Product;
//# sourceMappingURL=productModel.d.ts.map