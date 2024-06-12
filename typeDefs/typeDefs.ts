import { gql } from "apollo-server";

const typeDefs = gql`
type signUpTable {
name:String
emailId:String
password:String
}

type employeesTaskTable{
name:String
emailId:[String]
taskDesc:String
deadLine:String
}

input createUserSignUpInput{
name:String
emailId:String
password:String
}

input createLoginInput{
emailId:String
password:String
}

input createEmployeesTaskInput{
name:String
emailId:[String]
taskDesc:String
deadLine:String
}

type Query{
getUser:[signUpTable]
fetchEmailUsersIds:[signUpTable]
}

type Mutation{
createUserSignUp(userSignUpParameters:createUserSignUpInput!):signUpTable
createUserLogin(userLoginParameters:createLoginInput!):signUpTable
createEmployeesTask(employeesTaskParameters:createEmployeesTaskInput!):employeesTaskTable
}
`
export default typeDefs