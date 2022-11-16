import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

// const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_CONNECTION
//     });

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

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
        type: DataTypes.NUMBER,
        allowNull: true,
        notEmpty: true,
    },
    experience: {
        type: DataTypes.NUMBER,
        allowNull: true,
        notEmpty: true,
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: true,
        notEmpty: true,
    },
    salaryFrom: {
        type: DataTypes.DATE,
        allowNull: true,
        notEmpty: true,
    },
    salaryTo: {
        type: DataTypes.DATE,
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
        type: DataTypes.DATE,
        allowNull: true,
        notEmpty: true,
    },
    expiredDate: {
        type: DataTypes.DATE,
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

export default Job;