import db from "../fakeData";
import mongoose from "mongoose"
// comn usersSignUpInfoTable from "../models/db"
const { usersSignUpInfoTable, employeesTaskTable, adminSignUpInfoTable } = require("../models/db")
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


            usersSignUpInfoTable.insertMany({ ...args.userSignUpParameters })
            return {
                success: true,
                message: "Sign Up was suscessful"
            }

        },
        // createAdmin
        createAdminSignUp(parent: any, args: any, context: any) {
            console.log(args)

            adminSignUpInfoTable.insertMany({ ...args.adminSignUpParameters })
            return {
                success: true,
                message: "Admin Sign Up was suscessful"
            }
        },
        async createUserLogin(parent: any, args: any, context: any) {
            // console.log(args.uid)

            // const checkExistingEmailId = await usersSignUpInfoTable.find({ emailId: args.userLoginParameters.emailId })

            const user = await usersSignUpInfoTable.findOne({ emailId: args.userLoginParameters.emailId })

            const uid = user.uid
            console.log(user.uid)

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
                uid: uid,
                token: token,
                success: true,
                message: 'User loggedin successfully',
            }


        },
        async createAdminLogin(parent: any, args: any, context: any) {
            // console.log(args.uid)

            // const checkExistingEmailId = await usersSignUpInfoTable.find({ emailId: args.userLoginParameters.emailId })

            const admin = await adminSignUpInfoTable.findOne({ emailId: args.adminLoginParameters.emailId })

            const uid = admin.uid

            if (!admin) {

                return {
                    success: false,
                    message: 'Admin Email Id does not exists',
                }
            }

            const token = jwt.sign(

                { adminId: admin._id, email: admin.emailId },
                secret,
                { expiresIn: "5h" }
            );
            return {
                uid: uid,
                token: token,
                success: true,
                message: 'admin loggedin successfully',
                admin: true

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
            // console.log(args);
            const updateElement = await employeesTaskTable.updateOne({ uid: args.editEmployeesTaskParameter.uid }, { $set: { ...args.editEmployeesTaskParameter } })
            return [args]
        },

        async updateSignUpStatus(parent: any, args: any, context: any) {
            console.log(args);
            const updateStatus = await usersSignUpInfoTable.updateMany({ uid: args.updateSignUpStatusParameter.uid }, { $set: { status: args.updateSignUpStatusParameter.status } })
            return updateStatus
        }

    },
    Subscription: {
        showAllEmployee: {
            subscribe: () => {
                return (PubSub as any).asyncIterator(`messageAdded`);
            }
        },
    }
}



export default resolvers;