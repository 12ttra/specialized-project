const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/d_stories_dev');
        console.log("connect successfuly");
    } catch (error) {
        console.log(error);
    }
}
module.exports = {connect}