import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const Job = sequelize.define("jobs", {
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    applicants: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    salaryFrom: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    salaryTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    jobtype: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    isActive: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    startdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: true,
    },
    expirydate: {
        type: DataTypes.DATEONLY,
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
    console.log('Job table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Job