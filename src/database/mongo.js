import mongoose from 'mongoose';
import debug from 'debug';
import dotenv from 'dotenv';
dotenv.config();

const log = debug('globant:db');
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {}, () =>{
    log('Database connection is ready.');
});