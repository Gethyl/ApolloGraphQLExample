import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"

import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql';
import { graphqlExpress } from 'graphql-server-express'
import schema from './graphql/Schema'

const app = express();

//app.use(bodyParser.urlencoded({extended:true}))

// middleware to use for all requests
app.use((req, res, next) => {
    // do logging
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log('+++Gethyl entering the middleware');
    next(); // make sure we go to the next routes and don't stop here
});

app.options('/graphql', cors())
// app.use('/graphql',bodyParser.json(), graphqlExpress(req =>({
// 	schema
// 	,graphiql:true
// })))
app.use('/graphql',bodyParser.json(), graphqlHTTP (req => ({
	schema
	,graphiql:true
})))

app.listen(3000,()=> {console.log("+++Express Server is Running!!!")})