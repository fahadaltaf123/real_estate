import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const Department = sequelize.define("departments", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    }
 });

sequelize.sync().then(() => {
    console.log('Department table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Department