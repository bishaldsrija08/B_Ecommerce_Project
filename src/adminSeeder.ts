import User from "./database/models/userModel"
import bcrypt from "bcryptjs"

const adminSeeder = async (): Promise<void> => {
    const [data] = await User.findAll({
        where: {
            userEmail: "admin@gmail.com"
        }
    })
    if (!data) {
        await User.create({
            userEmail: "admin@gmail.com",
            userPassword: bcrypt.hashSync("admin", 10),
            username: "admin",
            userRole: "admin"
        })
    } else {
        console.log("Admin already exists!")
        return
    }
    console.log("Admin seeded successfully!")
}

export default adminSeeder