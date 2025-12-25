type Database = {
    HOST: string;
    USER: string;
    PASSWORD: string;
    DB: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    pool: {
        max: number;
        min: number;
        idle: number;
        accquire: number;
    };
};
declare const dbConfing: Database;
export default dbConfing;
//# sourceMappingURL=dbConfig.d.ts.map