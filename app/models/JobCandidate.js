import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"

const JobCandidate = sequelize.define("job_candidates", {
    jobId: {
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
    currentSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    expectedSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    resume: {
        type: DataTypes.TEXT,
        allowNull: true,
        notEmpty: true,
    },
    coverLetter: {
        type: DataTypes.TEXT,
        allowNull: true,
        notEmpty: true,
    }
 });

sequelize.sync().then(() => {
    console.log('Job Candidates table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default JobCandidate