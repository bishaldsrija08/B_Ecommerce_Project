type Database = {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'
    pool: {
        max: number,
        min: number,
        idle: number,
        accquire: number
    }
}

const dbConfing: Database = {
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
}

export default dbConfing;