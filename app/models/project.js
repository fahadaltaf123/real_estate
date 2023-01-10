import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"
import Employee from './Employee.js';
import Customer from './Customer.js';


const Project = sequelize.define("project", {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: false,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: false,
    },
    priority: {
        type: Sequelize.ENUM('high', 'low', "medium"),
        allowNull: true,
        notEmpty: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    status: {
        type: Sequelize.ENUM('active', 'InActive'),
        allowNull: true,
        notEmpty: true,
    },
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        // references: {
        //     model: 'Customer',
        //     key: 'id'
        // }
    }
});


Project.associate = function (models) {

};

sequelize.sync().then(() => {
    // Project.associate = function (models) {
    //     Project.hasMany(Employee, { as: 'Employee' })
    //     Project.hasOne(Customer, { as: 'Customer' })

    // };

    console.log('Project table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Project