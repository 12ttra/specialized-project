const { default: mongoose } = require("mongoose");

//const { countConnect } = require("/Visual Studio Code/-n-chuy-n-ng-nh/src/helpers/check.connect")
const { countConnect } = require("/Users/nhunhy/Documents/specialized-project/src/helpers/check.connect.js")

//const connectString = 'mongodb+srv://tra:123@cluster0.rb2ac3u.mongodb.net/Sprezza?retryWrites=true&w=majority'

// class Database{
//     constructor(){
//         this.connect()
//     }
//     //connect
//     connect(type = 'mongodb'){
        // if(1 === 1){
        //     mongoose.set('debug', true)
        //     mongoose.set('debug', { color: true})
        // }
//         mongoose.connect(connectString).then( _ => console.log('DB connect successfuly'))
//         .catch( err => console.log('Error connect!'))
//     }
    // static getInstance(){
    //     if(!Database.instance){
    //         Database.instance = new Database()
    //     }
    //     return Database.instance
    // }
// }

// const connectDB = Database.getInstance()


const { countConnect } = require("../../helpers/check.connect")
const config = require("../config");
require('dotenv').config();


async function connectDB(){
    try {
        await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            //useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log("DB connect successfuly", countConnect());
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = connectDB;