import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const Job = sequelize.define("jobs", {
    title: {
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
    noOfVacancies: {
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
    jobType: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    jobStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: true,
    },
    expiredDate: {
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