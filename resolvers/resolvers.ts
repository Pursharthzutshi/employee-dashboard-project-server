import db from "../fakeData";
import mongoose from "mongoose"
// comn usersSignUpInfoTable from "../models/db"
const { usersSignUpInfoTable,employeesTaskTable } = require("../models/db")

mongoose.connect(`mongodb+srv://13phzi:BGbeXfcV4dp9LX4G@cluster0.m8wabkl.mongodb.net/Dashboard?retryWrites=true&w=majority`).then((res) => {
    // console.log(res);
})

export const resolvers = {
    Query: {
        getUser(parent: any, args: any, context: any) {

            return db.UserList
        },
        async fetchEmailUsersIds(parent: any, args: any, context: any){
            const users = await usersSignUpInfoTable.find() 
            console.log(parent)
            return users
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

        createUserLogin(parent: any, args: any, context: any){
            console.log(args)
            const checkExistingEmailId = usersSignUpInfoTable.find({emailId:args.emailId}) 
            if(checkExistingEmailId.length > 0){
                return "Already Exist"
            }else{
                return "Success" 
            }
        },
        createEmployeesTask(parent: any, args: any, context: any){
            console.log(args)
           return employeesTaskTable.insertMany({...args.employeesTaskParameters})
        }
    }
}



export default resolvers;