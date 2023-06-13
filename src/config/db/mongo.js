const { default: mongoose } = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://tra:123@cluster0.rb2ac3u.mongodb.net/Sprezza?retryWrites=true&w=majority', {
            //maxPoolSize: 50
        });
        console.log("DB connect successfuly", 
            //countConnect()
        );
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;