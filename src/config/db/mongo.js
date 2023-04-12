const { default: mongoose } = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://tratran:Tratran12@cluster0.pvzatmr.mongodb.net/?retryWrites=true&w=majority');
        console.log("connect successfuly");
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;