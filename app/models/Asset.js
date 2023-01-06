import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const Assets = sequelize.define("Asset", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    brand:{
        type:DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    expiryDate:{
        type:DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: true,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    addedDate:{
        type:DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: true,
    }
 });

sequelize.sync().then(() => {
    console.log('Assets table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Assets