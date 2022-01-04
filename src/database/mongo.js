import mongoose from 'mongoose';
import debug from 'debug';
import dotenv from 'dotenv';
dotenv.config();

const log = debug('globant:db');

let namedb = process.env.NAME_DB_PROD;
const environment = process.env.NODE_ENV || 'default';
if(environment === 'test' || environment === 'dev'){
    namedb = process.env.NAME_DB_TEST
}
const uri = process.env.MONGO_URI.replace('{NAME_DB}', namedb);

const connectDB = async () => { 
    mongoose.connect(uri, {}, () =>{
        log('Database connection is ready.');
        log(`${environment} environment`);
        if(environment === 'test' || environment === 'dev'){
            mongoose.connection.db.dropDatabase();
        }
    });
}

export {
    connectDB
}