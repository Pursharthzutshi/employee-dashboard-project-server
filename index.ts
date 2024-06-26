import express, { Express } from 'express';
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../server/typeDefs/typeDefs";
import resolvers from "../server/resolvers/resolvers";
import { PubSub } from 'graphql-subscriptions';

const app: any = express();
const port = 4000;

const pubsub = new PubSub()


// app.get("/",(req:Request,res:Response)=>{
//     res.send("Hello")
// })


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub }
})

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer()


app.listen(port, () => {
    console.log(`${port} is running`);
})