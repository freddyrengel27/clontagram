'use strict'
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_TABLES,
});

conn.connect().then(console.log("data activa"));

export default conn;