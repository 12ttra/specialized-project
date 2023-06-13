const { default: mongoose } = require("mongoose");
const { countConnect } = require("/Visual Studio Code/-n-chuy-n-ng-nh/src/helpers/check.connect")

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


async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://tra:123@cluster0.rb2ac3u.mongodb.net/Sprezza?retryWrites=true&w=majority');
        console.log("DB connect successfuly", countConnect());
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;