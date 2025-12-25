"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfing = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "m2p2db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        accquire: 10000
    }
};
exports.default = dbConfing;
//# sourceMappingURL=dbConfig.js.map