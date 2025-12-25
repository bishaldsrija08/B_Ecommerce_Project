"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_js_1 = __importDefault(require("../config/dbConfig.js"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(dbConfig_js_1.default.DB, dbConfig_js_1.default.USER, dbConfig_js_1.default.PASSWORD, {
    host: dbConfig_js_1.default.HOST,
    dialect: dbConfig_js_1.default.dialect,
    port: 3306,
    pool: {
        max: dbConfig_js_1.default.pool.max,
        min: dbConfig_js_1.default.pool.min,
        idle: dbConfig_js_1.default.pool.idle,
        acquire: dbConfig_js_1.default.pool.accquire
    }
});
sequelize.authenticate()
    .then(() => {
    console.log("Connected to database");
})
    .catch((err) => {
    console.log(err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({
    force: false
}).then(() => {
    console.log("Yes re-sync done!");
});
exports.default = db;
//# sourceMappingURL=index.js.map