import { gql } from "apollo-server";

const typeDefs = gql`
type signUpTable {
name:String
emailId:String
password:String
genderType:String
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
}

input createLoginInput{
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
 success: Boolean!
 message: String
 token:String
}
type SignUpResponse{
 success: Boolean!
 message: String
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
uid:ID
name:String
emailId:[String]
taskDesc:String
deadLine:String
}


type Mutation{
createUserSignUp(userSignUpParameters:createUserSignUpInput!):SignUpResponse!
createUserLogin(userLoginParameters:createLoginInput!):LoginResponse!
createEmployeesTask(employeesTaskParameters:createEmployeesTaskInput!):employeesTaskTable
deleteEmployeesTask(employeeUidParameter:deleteEmployeesTaskInput!):[employeesTaskTable]
editEmployeesTask(editEmployeesTaskParameter:editEmployeesTaskInput!):[employeesTaskTable]
}
`
export default typeDefs