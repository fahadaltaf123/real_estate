import {DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import sequelize from "../../config/connectdb.js";

const JobCandidateStatus = sequelize.define("job_candidate_status", {
    jobCandidateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      notEmpty: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: true,
        notEmpty: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        notEmpty: false,
    }
 });

sequelize.sync().then(() => {
    console.log('Job candidates status table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default JobCandidateStatus;