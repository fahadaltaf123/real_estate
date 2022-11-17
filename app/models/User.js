import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

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