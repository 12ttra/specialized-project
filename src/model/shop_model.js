const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

// Declare the Schema of the Mongo model
const shopSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxLength: 150
    },
    email:{
        type:String,
        //required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verfify:{
        type: Schema.Types.Boolean,
        default: false
    },
    roles:{
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model('MyShop', shopSchema); 