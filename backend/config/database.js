const mongoose = require('mongoose');
const { countConnect } = require("../check.connect")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`, countConnect())
    })
}

module.exports = connectDatabase