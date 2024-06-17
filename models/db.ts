
import mongoose from "mongoose";

const usersSignUpInfoSchema = new mongoose.Schema({
    uid: String,
    name: String,
    emailId: String,
    password: String,
    genderType: String,
    status: Boolean,
    department: String,
})

const adminSignUpInfoSchema = new mongoose.Schema({
    uid: String,
    name: String,
    emailId: String,
    password: String,
    status: Boolean,
    adminSecretKey: String
})

const adminSecretKeySchema = new mongoose.Schema({
    adminSecret: String,
})

const employeesTaskSchema = new mongoose.Schema({
    uid: String,
    name: String,
    emailId: {
        type: [String],
        ref: "usersSignUpInfo"
    },
    taskDesc: String,
    deadLine: String,
    assignedBy: String
})

// type usersSignUpInfoTableProps = {
//     usersSignUpInfoTable=()=> void
// }

const usersSignUpInfoTable = mongoose.model("usersSignUpInfo", usersSignUpInfoSchema, "usersSignUpInfo")

const adminSignUpInfoTable = mongoose.model("adminSignUpInfo", adminSignUpInfoSchema, "adminSignUpInfoInfo")

const adminSecretKey = mongoose.model("adminSecretKeyInfo", adminSecretKeySchema, "adminSecretKeyInfo")

const employeesTaskTable = mongoose.model("employeesTaskInfo", employeesTaskSchema, "employeesTaskInfo")

module.exports = { usersSignUpInfoTable, adminSignUpInfoTable, adminSecretKey, employeesTaskTable }