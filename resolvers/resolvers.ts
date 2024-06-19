import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import crypto from "crypto"
import { PubSub, PubSubEngine } from "graphql-subscriptions";
import { createEmployeesTaskProps, createUserSignUpProps } from "../resolvers-types/resolvers-type";

const { employeesAccountInfoTable, employeesTaskTable, adminSignUpInfoTable } = require("../models/db")
const secret = crypto.randomBytes(64).toString('hex');

mongoose.connect(`mongodb+srv://13phzi:BGbeXfcV4dp9LX4G@cluster0.m8wabkl.mongodb.net/Dashboard?retryWrites=true&w=majority`).then((res) => {
    // console.log(res);
})

export const resolvers = {
    Query: {
        async fetchEmployeesTaskDetails() {
            const employeesDetails = await employeesTaskTable.find();
            return employeesDetails
        },
        async fetchEmailUsersIds() {
            const users = await employeesAccountInfoTable.find()
            return users
        },

        async showAllEmployee() {
            const allEmployees = await employeesAccountInfoTable.find();
            return allEmployees
        },


    },
    Mutation: {

        createUserSignUp(parent: undefined, args: { userSignUpParameters: createUserSignUpProps; }) {
            console.log(args)
            employeesAccountInfoTable.insertMany({ ...args.userSignUpParameters })
            return {
                success: true,
                message: "Sign Up was suscessful"
            }

        },
        // createAdmin
        createAdminSignUp(parent: undefined, args: { adminSignUpParameters: any; }) {
            console.log(args)

            adminSignUpInfoTable.insertMany({ ...args.adminSignUpParameters })
            return {
                success: true,
                message: "Admin Sign Up was suscessful"
            }
        },

        // async showWelcomeLogin(parent:undefined,args:any){

        // },

        async createUserLogin(parent: undefined, args: { userLoginParameters: { emailId: String, password: String }; }) {

            // const checkExistingEmailId = await employeesAccountInfoTable.find({ emailId: args.userLoginParameters.emailId })

            const user = await employeesAccountInfoTable.findOne({ emailId: args.userLoginParameters.emailId })

            console.log(user)
            if (!user) {

                return {
                    success: false,
                    message: 'User Email Id does not exists',
                }

            } else if (user.password !== args.userLoginParameters.password) {
                return {
                    success: false,
                    message: 'Password Incorrect',
                }
            } else {
                console.log(user)
                console.log(user.emailId)
                console.log(args.userLoginParameters.emailId)

                console.log(user.password)
                console.log(args.userLoginParameters.password)

                const uid = user.uid

                const token = jwt.sign(

                    { userId: user._id, name: user.name, email: user.emailId },
                    secret,
                    { expiresIn: "5h" }
                );
                return {
                    uid: uid,
                    name: user.name,
                    token: token,
                    success: true,
                    message: 'User loggedin successfully',
                }
            }


        },
        async createAdminLogin(parent: undefined, args: { adminLoginParameters: { emailId: String, password: String }; }) {
            // const checkExistingEmailId = await employeesAccountInfoTable.find({ emailId: args.adminLoginParameters.emailId })


            const admin = await adminSignUpInfoTable.findOne({ emailId: args.adminLoginParameters.emailId })

            console.log(admin)
            if (!admin) {

                return {
                    success: false,
                    message: 'Admin Email Id does not exists',

                }
            } else if (admin.password !== args.adminLoginParameters.password) {
                return {
                    success: false,
                    message: 'Password Incorrect',

                }
            } else {

                const uid = admin.uid

                const token = jwt.sign(

                    { adminId: admin._id, name: admin.name, email: admin.emailId },
                    secret,
                    { expiresIn: "5h" }
                );
                // uid:ID!
                // success: Boolean!
                // message: String
                //  token:String
                //  admin:Boolean!

                return {
                    uid: uid,
                    name: admin.name,
                    success: true,
                    message: 'admin loggedin successfully',
                    token: token,
                    admin: true

                }

            }
        },
        async updateEmployeeOfTheMonth(parent: undefined, args: { updateEmployeeOfTheMonthParameters: { uid: String; employeeOfTheMonth: Boolean; }; }) {
            // console.log(args)

            const findAlreadyExistingEmployeeOfTheMonth = await employeesAccountInfoTable.findOne({ employeeOfTheMonth: true })
            // console.log(findAlreadyExistingEmployeeOfTheMonth)

            if (findAlreadyExistingEmployeeOfTheMonth) {
                await employeesAccountInfoTable.updateOne({ employeeOfTheMonth: true }, { $set: { employeeOfTheMonth: false } })
            }
            const updateEmployeeOfTheMonthStatus = await employeesAccountInfoTable.updateOne({ uid: args.updateEmployeeOfTheMonthParameters.uid }, { $set: { employeeOfTheMonth: args.updateEmployeeOfTheMonthParameters.employeeOfTheMonth } })

            return updateEmployeeOfTheMonthStatus
        },
        createEmployeesTask(parent: undefined, args: { employeesTaskParameters: createEmployeesTaskProps; }) {
            console.log(args)
            // if(args.employeesTaskParameters.name = ""){
            //     return      {
            //         success: false,
            //         message: 'admin loggedin successfully',
            //         admin: true

            //     }
            // }

            return employeesTaskTable.insertMany({ ...args.employeesTaskParameters })
        },


        async deleteEmployeesTask(parent: undefined, args: { employeeUidParameter: { uid: String; }; }) {
            // console.log(parent)
            console.log(args.employeeUidParameter.uid)
            const deleteElement = await employeesTaskTable.deleteOne({ uid: args.employeeUidParameter.uid })
            return [args]
        },
        async editEmployeesTask(parent: undefined, args: { editEmployeesTaskParameter: { uid: String; }; }) {
            console.log(args);
            const updateElement = await employeesTaskTable.updateOne({ uid: args.editEmployeesTaskParameter.uid }, { $set: { ...args.editEmployeesTaskParameter } })
            return [args]
        },

        async updateSignUpStatus(parent: undefined, args: { updateSignUpStatusParameter: { uid: String; status: Boolean; }; }) {
            console.log(args);
            const updateStatus = await employeesAccountInfoTable.updateMany({ uid: args.updateSignUpStatusParameter.uid }, { $set: { status: args.updateSignUpStatusParameter.status } })
            return updateStatus
        }

    },
    Subscription: {
        showAllEmployee: {
            subscribe: () => {
                return (PubSub as unknown as PubSubEngine).asyncIterator(`messageAdded`);
            }
        },
    }
}



export default resolvers;