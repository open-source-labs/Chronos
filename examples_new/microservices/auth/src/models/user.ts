import { DbConnectionError,errorHandler } from "@chronosrx/common";
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log(`Connected to MongoDB Database`))
.catch((err)=> {throw new DbConnectionError()} );

const Schema = mongoose.Schema;
const