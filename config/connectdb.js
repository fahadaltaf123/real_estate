import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

// const connectDB = mysql.createConnection({
//     host : ,
//     database : ,
//     user : ,
//     password : 
// });

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION
    },
    process.env.DB_PORT
    );

// connectDB.connect (function(error){
//     if(error){
//         throw error;
//     }else{
//         console.log('MySQL Database is connected successfully!');
//     }
// });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default sequelize;