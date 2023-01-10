import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"



const FileIssue = sequelize.define("files", {
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    
    size: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: false,
    },
   
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        // references: {
        //     model: 'Customer',
        //     key: 'id'
        // }
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        // references: {
        //     model: 'project',
        //     key: 'id'
        // }
    },
});



sequelize.sync().then(() => { 

    console.log('FileIssue table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default FileIssue;