import Category from "../database/models/categoryModel"



class CategoryController {
    categoryData = [
        {
            categoryName: "Electronics"
        },
        {
            categoryName: "Grocery"
        },
        {
            categoryName: "Clothing"
        },
        {
            categoryName: "Books"
        }
    ]
    async seedCategories(): Promise<void> {
        const categoryData = await Category.findAll()
        if (categoryData.length === 0) {
            await Category.bulkCreate(this.categoryData)
            console.log("Categories Seeded")
        }else{
            console.log("Categories already exist, seeding skipped")
        }
    }
}

export default new CategoryController();