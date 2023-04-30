import mongoose from "mongoose";

async function main(){
    try {
        const dbconnectionstring = process.env.NEXT_PUBLIC_DB_CONNECTION
        await mongoose.connect(dbconnectionstring).then(()=>{}, () => console.log('Database connection error!'))
    } catch (e) {
        console.log('Database error: ' + e.message);
    }
}
export default main