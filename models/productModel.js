const mongoose = require('mongoose')
const { Schema } = mongoose;
const roomModel = require('./roomModel')
const userModel=require('./userModel')
const {ObjectId} = mongoose.Schema.Types




const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    },



    location: {
        type: String,
        trim: true,
        required: true
    },
    startDate: {
        type: Date,



    },
    endDate: {
        type: Date,



    },
    // numReviews: { type: Number,
    //     trim: true,
    //     required: true},

    // rating: { type: Number,
    //     trim: true,
    //     required: true},



    Rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Rooms',

    }],

    RoomsCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'RoomsCategory'
    }
   

}, {
    timestamps: true
})


module.exports = mongoose.model("Products", productSchema)