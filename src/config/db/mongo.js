const { default: mongoose } = require("mongoose");
//const { countConnect } = require("/Visual Studio Code/-n-chuy-n-ng-nh/src/helpers/check.connect")
const { countConnect } = require("/Users/nhunhy/Documents/specialized-project/src/helpers/check.connect.js")


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