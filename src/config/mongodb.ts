import mongoose, { Connection, ConnectOptions } from "mongoose";
import _dotenv from 'dotenv';

type Cached = { conn: Connection | null; promise: Promise<Connection> | null };

const dbCached = new Map<string, Cached>();

const getDb =  async function getMongo(uri: string, opts?: ConnectOptions): Promise<Connection> {
    
    const isPresent = dbCached.has(uri);

    if(!isPresent){

        const req_connection: Promise<Connection> = mongoose.createConnection(uri, opts).asPromise();
        const new_connection: Cached = {conn: null, promise: req_connection};
        
        dbCached.set(uri, new_connection);
        
        req_connection
        .then((conn)=>new_connection.conn = conn)
        .catch((err)=>{
            dbCached.delete(uri);
            console.log(err)
        });
        
        return await req_connection;

    }else{

        const fetched_connection: Cached = dbCached.get(uri)!;

        if(!fetched_connection.conn){

            return await fetched_connection.promise!
        };

        return fetched_connection.conn;

    };    
};

export const authDb = getDb(process.env.AUTH_DB_URI!);
