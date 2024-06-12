import db from "../fakeData";
import mongoose from "mongoose"
// comn usersSignUpInfoTable from "../models/db"
const { usersSignUpInfoTable, employeesTaskTable } = require("../models/db")

mongoose.connect(`mongodb+srv://13phzi:BGbeXfcV4dp9LX4G@cluster0.m8wabkl.mongodb.net/Dashboard?retryWrites=true&w=majority`).then((res) => {
    // console.log(res);
})

export const resolvers = {
    Query: {

        
        async fetchEmployeesTaskDetails(parent: any, args: any, context: any) {
            const employeesDetails = await employeesTaskTable.find();
            return employeesDetails
        },
        async fetchEmailUsersIds(parent: any, args: any, context: any) {
            const users = await usersSignUpInfoTable.find()
            console.log(parent)
            return users
        },

        async showAllEmployee(parent: any, args: any, context: any){
            const allEmployees = await usersSignUpInfoTable.find();
            return allEmployees
        }

    },
    Mutation: {
        createUserSignUp(parent: any, args: any, context: any) {

            if (args.userEmailPassword !== args.userEmailPassword) {
                return "Sign Up not suscessful"
            } else {
                usersSignUpInfoTable.insertMany({ ...args.userSignUpParameters })
                // context.res.send("Send")
                return "Sign Up suscessful"
            }
            // console.log(args)
            //  usersSignUpInfoTable.insertMany({ name: args.name, emailId: args.emailId, password: args.password })

        },

        createUserLogin(parent: any, args: any, context: any) {
            console.log(args)

            const checkExistingEmailId = usersSignUpInfoTable.find({ emailId: args.userLoginParameters.emailId })
            console.log(args.userLoginParameters.emailId)
            console.log(checkExistingEmailId)
            if (checkExistingEmailId.length >0) {
                return {
                    success: true,
                    message: 'User loggedin successfully',
                }
               
            } else {
                return {
                    success: false,
                    message: 'User Email Id does not exists',
                }
            }
        },
        createEmployeesTask(parent: any, args: any, context: any) {
            // console.log(args)
            return employeesTaskTable.insertMany({ ...args.employeesTaskParameters })
        },


        async deleteEmployeesTask(parent: any, args: any, context: any) {
            console.log(args.employeeUidParameter.uid)
            const deleteElement = await employeesTaskTable.deleteOne({ uid: args.employeeUidParameter.uid })
            return [args]
        },
        async editEmployeesTask(parent: any, args: any, context: any) {
            console.log(args);
            const updateElement = await employeesTaskTable.updateOne({ uid: args.editEmployeesTaskParameter.uid }, { $set: { ...args.editEmployeesTaskParameter } })
            return [args]
        }

    }
}



export default resolvers;