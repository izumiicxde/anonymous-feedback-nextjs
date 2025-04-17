// TO ESTABLISH CONNECTION WITH MONGODB.
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

//this return a promise of some type. Giving means it can be anything??
export default async function dbconnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "");
        connection.isConnected = db.connections[0].readyState;
        console.log("database connection successfull");
    } catch (error) {
        console.log("database connection failed.", error);
        process.exit(1);
    }
}
