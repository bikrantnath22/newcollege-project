
  
const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
   hotel_id : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Products'
   } , 
   room_id : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Rooms'
   } ,
   start : {
    type : Date 
   },
   end : {
    type : Date 
   }
}, {
    timestamps: true
})

module.exports = mongoose.model("booking", bookingSchema)