import {Sequelize,DataTypes} from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
import sequelize from "../../config/connectdb.js"



const EmployeeAction = sequelize.define("employee_action", {
    
    action: {
        type: DataTypes.STRING,
        allowNull: true,
        notEmpty: true,
    },
    actionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        notEmpty: true,
    },
    employeeId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        // references: {
        //     model: 'employees',
        //     key: 'id'
        // }
    }
});

EmployeeAction.associate = function(models) {
    
 };

sequelize.sync().then(() => {
    EmployeeAction.associate = function(models) {
        EmployeeAction.belongsTo(Employee, {foreignKey: 'employeeId' , as: 'Employee'})
     };

    console.log('Action table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default EmployeeAction
