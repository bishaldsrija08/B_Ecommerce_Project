import dbConfing from "../config/dbConfig";
import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(dbConfing.DB, dbConfing.USER, dbConfing.PASSWORD, {
    host: dbConfing.HOST,
    dialect: dbConfing.dialect,
    port: 3306,
    pool: {
        max: dbConfing.pool.max,
        min: dbConfing.pool.min,
        idle: dbConfing.pool.idle,
        acquire: dbConfing.pool.accquire
    }
})

sequelize.authenticate()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err)
    })

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({
    force: false
}).then(() => {
    console.log("Yes re-sync done!");
})

export default db;