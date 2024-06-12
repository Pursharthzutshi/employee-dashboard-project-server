
import mongoose from "mongoose";

const usersSignUpInfoSchema = new mongoose.Schema({
    name:String,
    emailId:String,
    password:String
})


const employeesTaskSchema = new mongoose.Schema({
    name:String,
    emailId:{
        type:[String],
        ref:"usersSignUpInfo"
    },
    taskDesc:String,
    deadLine:String,
    assignedBy:String
})

// type usersSignUpInfoTableProps = {
//     usersSignUpInfoTable=()=> void
// }

const usersSignUpInfoTable =  mongoose.model("usersSignUpInfo",usersSignUpInfoSchema,"usersSignUpInfo")

const employeesTaskTable =  mongoose.model("employeesTaskInfo",employeesTaskSchema,"employeesTaskInfo")

module.exports = {usersSignUpInfoTable,employeesTaskTable}