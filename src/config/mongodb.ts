import mongoose, { Connection, ConnectOptions } from "mongoose";
import _dotenv from 'dotenv';

type Cached = { conn: Connection | null; promise: Promise<Connection> | null };

declare global {
    var _mongoConns: Map<string, Cached> | undefined;
}

const cache = (globalThis._mongoConns ??= new Map<string, Cached>());

const getDb =  async function getMongo(uri: string, opts?: ConnectOptions): Promise<Connection> {
    let c = cache.get(uri);
    if (!c) {
        c = { conn: null, promise: null };
        cache.set(uri, c);
    }
    if (c.conn) return c.conn;
    if (!c.promise) c.promise = mongoose.createConnection(uri, opts).asPromise();
    c.conn = await c.promise;
    return c.conn;
};

export const authDb = getDb(process.env.AUTH_DB_URI!);
