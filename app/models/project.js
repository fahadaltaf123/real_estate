import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"
import Employee from './Employee.js';


const Project = sequelize.define("project", {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    }
    });

 Project.associate = function(models) {
    
 };

sequelize.sync().then(() => {
    Project.associate = function(models) {
        Project.hasMany(Employee , {as: 'Employee'})
        
     };

    console.log('Project table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Project