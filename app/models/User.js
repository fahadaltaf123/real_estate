import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    password: {
    type: DataTypes.STRING,
    notEmpty: true,
    }
 });

sequelize.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default User;