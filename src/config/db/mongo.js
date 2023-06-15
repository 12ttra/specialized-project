const { default: mongoose } = require("mongoose");
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