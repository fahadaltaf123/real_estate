import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const employeeAsset= sequelize.define("EmployeeAsset", {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      notEmpty: true,
    },
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    }
 });

sequelize.sync().then(() => {
    console.log('Assets table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default employeeAsset