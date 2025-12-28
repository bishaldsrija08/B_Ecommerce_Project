import { Request, Response } from "express";
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
        } else {
            console.log("Categories already exist, seeding skipped")
        }
    }

    // Add Category
    async addCategory(req: Request, res: Response): Promise<void> {
        const { categoryName } = req.body;
        if (!categoryName) {
            res.status(400).json({
                message: "Category name is required"
            })
            return;
        }
        await Category.create({
            categoryName
        })
        res.status(200).json({
            message: "Category added successfully"
        })
    }
    // Get All Categories
    async getAllCategoriess(req: Request, res: Response): Promise<void> {
        const categories = await Category.findAll();
        if (categories.length === 0) {
            res.status(404).json({
                message: "No categories found"
            })
            return;
        }
        res.status(200).json({
            data: categories
        })
    }
    // Delete Category
    async deleteCategory(req: Request, res: Response): Promise<void> {
        const categoryId = req.params.id;
        const isCategory = await Category.findByPk(categoryId);
        if (!isCategory) {
            res.status(404).json({
                message: "Category not found"
            })
            return;
        }
        await Category.destroy({
            where: { id: categoryId }
        });
        res.status(200).json({
            message: "Category deleted successfully"
        })
    }

        // Update Category
    async updateCategory(req: Request, res: Response): Promise<void> {
        const { categoryName } = req.body;
        const categoryId = req.params.id;
        const isCategory = await Category.findByPk(categoryId);
        if (!isCategory) {
            res.status(404).json({
                message: "Category not found"
            })
            return;
        }
        if (!categoryName) {
            res.status(400).json({
                message: "Category name is required"
            })
            return;
        }
        await Category.update({
            categoryName
        }, {
            where: { id: categoryId }
        })
        res.status(200).json({
            message: "Category updated successfully"
        })
    }
}
export default new CategoryController();