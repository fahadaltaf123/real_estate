import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"
import Job from './Job.js';

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
    isShortListed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
        defaultValue: 0,
    },
    isOffered: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
        defaultValue: 0,
    },

    offerStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },

    offerSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: true,
    },
    coverLetter: {
        type: DataTypes.TEXT,
        allowNull: true,
        notEmpty: true,
    },
    interviewDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: false,
    },
    interviewTime: {
        type: DataTypes.TIME,
        allowNull: true,
        notEmpty: false,
    },
    interviewDesc: {
        type: DataTypes.TEXT,
        allowNull: true,
        notEmpty: false,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
        notEmpty: false,
    },
    dateOfJoining: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: false,
    }
 });

sequelize.sync().then(() => {
    JobCandidate.belongsTo(Job, {foreignKey: 'jobId' , as: 'jobs'})
    console.log('Job Candidates table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


export default JobCandidate