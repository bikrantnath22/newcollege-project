// const  mongoose  = require('mongoose');
// // const roomModel = require('../models/roomModel');
// // const productModel = require('../models/productModel');

// const roomCtrl={

//     addRoom : async (req, res) => {
//     try {
//       const {_id, title, price, description,sold } = req.body;
  
//       const newRoom = await new Rooms({
//         products: _id,
//         title, description,
//         price: parseInt(price, 10),
        
//       })
//       await newRoom.save()
  
//       await products.findOneAndUpdate(
//         { product_id: _id },
//         { "$push": { "Rooms": _id } }
//       );
  
//       res.status(200).json(Rooms);
//     }
//      catch (err) {
//       res.status(400).json({ success: false, err });
//     };
//   }
  
//   exports.getHotelRooms = async (req, res) => {
//     try {
//       const rooms = await Room.find({ hotel: req.params.hotelId });
  
//       res.status(200).json(rooms);
//     } catch (err) {
//       res.status(400).json({ success: false, err });
//     };
//   };

// module.exports = roomCtrl;