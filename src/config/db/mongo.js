const { default: mongoose } = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://tra:123@cluster0.rb2ac3u.mongodb.net/Sprezza?retryWrites=true&w=majority');
        //await mongoose.connect('mongodb+srv://tratran:tra123@sprezza.2ztwp8c.mongodb.net/');
        console.log("DB connect successfuly");
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;