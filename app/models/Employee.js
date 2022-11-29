import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const Employee = sequelize.define("employees", {
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
    dob: {
        type: DataTypes.DATEONLY,
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
    maritalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    dateOfJoining: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: false,
    },
    basicSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    relationship: {
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
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
 });

sequelize.sync().then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Employee