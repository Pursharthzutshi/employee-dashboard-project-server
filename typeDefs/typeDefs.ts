import { gql } from "apollo-server";

const typeDefs = gql`
type signUpTable {
uid:ID!
name:String
emailId:String
password:String
genderType:String
status:Boolean
department:String
}

type adminSignUpTable {
uid:ID!
name:String
emailId:String
password:String
status:Boolean
adminSecretKey:String
}

type employeesTaskTable{
uid:ID!
name:String
emailId:[String]
taskDesc:String
deadLine:String
}

input createUserSignUpInput{
uid:ID!
name:String
emailId:String
password:String
genderType:String
status:Boolean
department:String
}

input adminSignUpTableInput{
uid:ID!
name:String
emailId:String
password:String
status:Boolean
adminSecretKey:String
}

input createLoginInput{
emailId:String
password:String
}

input createAdminLoginInput{
emailId:String
password:String
}

input createEmployeesTaskInput{
uid:ID!
name:String
emailId:[String]
taskDesc:String
deadLine:String
}

type LoginResponse{
 uid:ID!
 success: Boolean!
 message: String
 token:String
}
type SignUpResponse{
 success: Boolean!
 message: String
}

type adminSignUpResponse{
 success: Boolean!
 message: String
}

type AdminLoginResponse{
 uid:ID!
 success: Boolean!
 message: String
  token:String
  admin:Boolean!

}

type Query{
getUser:[signUpTable]
fetchEmailUsersIds:[signUpTable]
fetchEmployeesTaskDetails:[employeesTaskTable]
showAllEmployee:[signUpTable]

}

type Subscription{
showAllEmployee:signUpTable
}


input deleteEmployeesTaskInput{
uid:ID!
}

input editEmployeesTaskInput{
uid:ID!
name:String
emailId:[String]
taskDesc:String
deadLine:String
}



input updateSignUpStatusInput{
uid:ID!
status:Boolean
}
    

type Mutation{
createUserSignUp(userSignUpParameters:createUserSignUpInput!):SignUpResponse!
createAdminSignUp(adminSignUpParameters:adminSignUpTableInput!):adminSignUpResponse!
createUserLogin(userLoginParameters:createLoginInput!):LoginResponse!
createAdminLogin(adminLoginParameters:createAdminLoginInput!):AdminLoginResponse!
createEmployeesTask(employeesTaskParameters:createEmployeesTaskInput!):employeesTaskTable
deleteEmployeesTask(employeeUidParameter:deleteEmployeesTaskInput!):[employeesTaskTable]
editEmployeesTask(editEmployeesTaskParameter:editEmployeesTaskInput!):[employeesTaskTable]
updateSignUpStatus(updateSignUpStatusParameter:updateSignUpStatusInput!):[signUpTable]
}
`
export default typeDefs