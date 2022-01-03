import mongoose from 'mongoose';
import debug from 'debug';
import dotenv from 'dotenv';
dotenv.config();

const log = debug('globant:db');
const uri = process.env.MONGO_URI;
const environment = process.env.NODE_ENV || 'default';

const mongodb = mongoose.connect(uri, {}, () =>{
    log('Database connection is ready.');
    log(`${environment} environment`);
    if(environment === 'dev'){
        mongoose.connection.db.dropDatabase();
    }
});

const connectDB = async () => { 
    await mongodb();
}

export {
    connectDB
}