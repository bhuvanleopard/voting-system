import mongoose, { Schema } from "mongoose";
import _dotenv from 'dotenv';
const connections_cached = new Map();
const getDbServer = async function (uri, opts) {
    const isPresent = connections_cached.has(uri);
    if (!isPresent) {
        const req_connection = mongoose.createConnection(uri, opts).asPromise();
        const new_connection = { conn: null, promise: req_connection };
        connections_cached.set(uri, new_connection);
        req_connection
            .then((conn) => new_connection.conn = conn)
            .catch((_err) => {
            connections_cached.delete(uri);
            console.log(`request faild: can not connect to ${uri}`);
        });
        return await req_connection;
    }
    else {
        const fetched_connection = connections_cached.get(uri);
        if (!fetched_connection.conn) {
            return await fetched_connection.promise;
        }
        ;
        return fetched_connection.conn;
    }
    ;
};
const getDb = async function (conn, db_name) {
    try {
        return await conn.useDb(db_name, { useCache: true }).asPromise();
    }
    catch (err) {
        console.log(`request failed: can not connect to  database: ${db_name}`);
    }
    ;
};
const mongodb = { getDbServer, getDb };
export default mongodb;
