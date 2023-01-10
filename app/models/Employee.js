import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"
import project from './project.js';
import Project from './project.js';
import EmployeeAction from './EmployeeAction.js';
import Designation from './Designation.js';

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
        // primaryKey: true,
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
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        // references: {
        //     model: 'projects',
        //     key: 'id'
        // }
    }


});

sequelize.sync().then(() => {
    Employee.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
    Employee.belongsTo(Designation, { foreignKey: 'designation', as: 'designationAss' })

    Employee.hasMany(EmployeeAction, { as: 'EmployeeAction' })
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Employee