import { error } from "console";
import mongoose, {type Connection, type Types} from "mongoose";


interface Hobbies extends Document{

    name: string;
    user: Types.ObjectId;
};

const schema_hobby = new mongoose.Schema<Hobbies>({

    name: {

        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

});

const connectDb = async(uri: string, req_db: string)=>{
    
    try{

        const db =  await mongoose.createConnection(uri).asPromise();
        const md = db.useDb(req_db, {useCache: true});
        return md

    }catch(err){

        throw error(err)
    }
};

async function printData(conn: Connection, collection_name: string){

    const req_model = conn.model(collection_name, schema_hobby)
    const new_hob = new req_model({
        name: "samplehobby",
        user: "user_1"        
    })
    await new_hob.save()
    const ress =  await req_model.find({})
    console.log(ress)
}

const t1 = await connectDb("mongodb://localhost:27017/", "playgound");
const res = await printData(t1, "hobbies");
console.log(res);
