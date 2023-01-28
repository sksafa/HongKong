const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () =>{
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`server running On ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

module.exports = connectDb