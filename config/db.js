import mysql from "mysql2/promise";

const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'matra',
});
export default mySqlPool