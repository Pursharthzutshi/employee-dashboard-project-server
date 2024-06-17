import express, { Application, Request, Response } from 'express';
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../server/typeDefs/typeDefs";
import resolvers from "../server/resolvers/resolvers";
const app: any = express();
const port = 3002;
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub()


// app.get("/",(req:Request,res:Response)=>{
//     res.send("Hello")
// })


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub }
    // context:()=>{
    //     return{name:"Pursharth"}
    // }
    // context:{
    //     PubSub,
    // }
    // context:({req,res})=>({req,res})
})

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer()


app.listen(port, () => {
    console.log(`${port} is running`);
})