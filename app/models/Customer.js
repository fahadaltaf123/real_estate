import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"
// import project from './project.js';
// import Project from './project.js';


const Customer = sequelize.define("customer", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    fatherName: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: true,
    },
    customerId: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: true,
        notEmpty: true,
    },
    cnic: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },

    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },


    emergencyContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    emergencyContactAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        // references: {
        //     model: 'Project',
        //     key: 'id'
        // }
    }




});

sequelize.sync().then(() => {
    // Customer.belongsTo(Project, {foreignKey: 'projectId' , as: 'project'})
    // Customer.belongsTo(Project, {foreignKey: 'projectId' , as: 'project'})
    // Customer.hasMany(CustomerAction, { as: 'CustomerAction' })
    console.log('Customer table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Customer