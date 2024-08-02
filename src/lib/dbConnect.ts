
import mongoose from "mongoose";

 // databse k connection k bad ki value

 // option means if isConnected came then it will be in number format otherwise it won't come
type ConnectionObject = {
    isConnected?:number
}
//Here, connection is declared as a constant (const connection). In TypeScript, when you use const with an object or array, it means the reference to that object or array (connection in this case) cannot be reassigned to another object or array. However, you can still modify the properties or elements of the object or array itself.
const connection: ConnectionObject = {}


// void means it won't matter what datatype data came
async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database");
        return 
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '', {});
        console.log("db -> ", db.connections[0].readyState);

        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully");
        
        
    } catch (error) {
        console.log("Databse connection failed",error);
        
        process.exit(1);
    }
}

export default dbConnect;

