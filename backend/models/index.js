import sequelize from "../config/Database.js"
import defineEmployeeModel from "./Employee.js"

defineEmployeeModel(sequelize);

const {Employee} = sequelize.models

console.log('Models and Associations defined');


export { sequelize }
export const models = sequelize.models;
