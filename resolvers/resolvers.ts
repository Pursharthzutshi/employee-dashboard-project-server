import db from "../fakeData";
import mongoose from "mongoose"
// comn usersSignUpInfoTable from "../models/db"
const { usersSignUpInfoTable, employeesTaskTable } = require("../models/db")
import jwt from 'jsonwebtoken';

import crypto from "crypto"
import { PubSub } from "graphql-subscriptions";

const secret = crypto.randomBytes(64).toString('hex');

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

        async showAllEmployee(parent: any, args: any, context: any) {
            const allEmployees = await usersSignUpInfoTable.find();
            return allEmployees
        },

        // async genderTypeChartDataCount(parent: any, args: any, context: any){
        //     const totalGenders = await usersSignUpInfoTable.find();
        //     return totalGenders;
        // }
        
    },
    Mutation: {
        createUserSignUp(parent: any, args: any, context: any) {
            console.log(args)
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

        async createUserLogin(parent: any, args: any, context: any) {
            console.log(args)

            const checkExistingEmailId = await usersSignUpInfoTable.find({ emailId: args.userLoginParameters.emailId })

            const user = await usersSignUpInfoTable.findOne({ emailId: args.userLoginParameters.emailId })
            console.log(user)
            // const token = jwt.sign({userId:user._id})
            // const token = jwt.sign(

            //     // { userId: user._id, email: user.emailId },
            //     // secret,
            //     // { expiresIn: process.env.TOKEN_EXPIRY_TIME }
            //     { userId: user._id, email: user.emailId },
            //     secret,
            //     { expiresIn: "5h" }
            // );
            // return {
            //     token: token,
            //     success: true,
            //     message: 'User loggedin successfully',
            // }
            if (!user) {

                return {
                    success: false,
                    message: 'User Email Id does not exists',
                }
            }

            const token = jwt.sign(

                { userId: user._id, email: user.emailId },
                secret,
                { expiresIn: "5h" }
            );
            return {
                token: token,
                success: true,
                message: 'User loggedin successfully',
            }


        },
        createEmployeesTask(parent: any, args: any, context: any) {
            console.log(args)
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

    },
    Subscription:{
        showAllEmployee:{
            subscribe:()=>{
                return (PubSub as any).asyncIterator(`messageAdded`);
            }
        },
    }
}



export default resolvers;