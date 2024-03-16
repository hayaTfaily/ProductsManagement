const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();

const mongoDB_URI = process.env.MONGODB_URI;

function dbConnect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
            resolve(); 
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
            reject(error);
        });
    });
}

module.exports = dbConnect;