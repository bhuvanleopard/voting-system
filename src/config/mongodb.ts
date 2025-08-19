import mongoose, { Connection, ConnectOptions } from "mongoose";

type Cached = { conn: Connection | null; promise: Promise<Connection> | null };

declare global {
var _mongoConns: Map<string, Cached> | undefined;
}

const cache = (globalThis._mongoConns ??= new Map<string, Cached>());

export default async function getMongo(uri: string, opts?: ConnectOptions): Promise<Connection> {
let c = cache.get(uri);
if (!c) {
c = { conn: null, promise: null };
cache.set(uri, c);
}
if (c.conn) return c.conn;
if (!c.promise) c.promise = mongoose.createConnection(uri, opts).asPromise();
c.conn = await c.promise;
return c.conn;
}


// const root = await getMongo(process.env.MONGODB_URI!);
// const tenantA = root.useDb("tenantA", { useCache: true });
// const tenantB = root.useDb("tenantB", { useCache: true });

// // Models must be registered per connection:
// // const TenantAUser = tenantA.model("User", userSchema);
