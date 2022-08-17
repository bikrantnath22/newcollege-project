const RoomsCategory = require('../models/roomCategoryModal')
const Products = require('../models/productModel');
const mongoose = require('mongoose');

const roomsCategory={
 
    // createRoomCategory : async (req,res) => {
    //     try{
    //         const {title,hotelName} =req.body
    //         const roomCategory =await RoomsCategory.findOne({title})
    //         if(roomCategory) return res.status(400).json({msg:"the already exist"})

    //         const newRoomCategory =new RoomsCategory({title,hotelName})
    //         await newRoomCategory.save()
    //         res.json({msg:"Created a Category"})
    //     }
    //     catch(err){
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    getRoomCategories: async(req,res) =>{
        const {products_id} =req.params ; 
        console.log(products_id)
        if(!products_id) {
            return res.status(500).json({msg:"asdas"})
        }
        try {
            const categories =await RoomsCategory.find({hotel_id:products_id})
            res.json(categories)
        } catch (err) { 
            console.log(err)
            return res.status(500).json({msg: err.message})
            
        }
    },
    // getRoomCategory: async(req,res) =>{
    //     try {
    //         const {products_id} = req.params;
    //         const room = await RoomsCategory.findById({hotel_id:products_id})
    //         console.log(room);
    //         res.json({room})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
            
    //     }
    // },

     
    createRoomCategory: async (req, res) => {
        try {
            const { products_id } = req.params;
            console.log(products_id)
            const unique_room_id = new mongoose.Types.ObjectId()
            console.log(req.body)
            const roomObject = {
                title: req.body.title,
                hotel_id:products_id,
                
            }
           
            
            const roomCategory = new RoomsCategory(roomObject);
            //check if room title already exist  
            //condition is checked based on title and product_id 
            // if any document is rooms collection has the title and product_id matched it wont be added
            const findIfRoomExist = await RoomsCategory.findOne({ title: req.body.title, product_id: products_id });
            if (findIfRoomExist) return res.status(400).json({ msg: "Room Category already exist" })
            // to update the array in our product collection
            Products.findByIdAndUpdate(products_id, { $addToSet: { RoomsCategory: unique_room_id } }, (err, updatedProduct) => {
                if (!err) console.log('Room Category added');
            })
            //when all conditions and updates are made we save the room to rooms collection
            roomCategory.save()
                .then((savedRoom) => {
                    res.send(savedRoom)
                })
                .catch(err => {
                    console.log(err);
                    res.send(err)
                })
        } catch (err) {
            console.log(err);
        }

    },


    editRoomCategory : async (req, res) => {
        try{
            const {room_id} = req.params;
            const room = req.body;
            const updatedRoom = await RoomsCategory.findByIdAndUpdate({_id:room_id} ,{
                $set: room
            }, { new: true })
            res.send(updatedRoom)
        }catch(err){
            console.log(err);
        }
    },
    // removeRoomCategory: async (req, res) => {
    //     try {
    //         const {hotel_id , room_id} = req.params ;
    //          const deletedRoomFromHotel = await RoomsCategory.findOneAndUpdate({ _id: hotel_id }, {
    //            $pull : {roomCategory : room_id} 
    //         },
    //         {
    //           new : true
    //         }); 
        
    //         if(deletedRoomFromHotel){
    //           await RoomsCategory.findByIdAndDelete(room_id)
    //           .exec((err,deletedRoom) => {
    //             if(err || !deletedRoom) {
    //               return res.status(402).json({msg:'forbidden'})
    //             }
    //           })
    //         }
    //         return res.status(200).json({msg:'success'})

        
    //       } catch (err) {
    //           console.log(err)
    //         // res.status(400).json({ success: false, err });
    //       };
    // },
    removeRoomCategory: async (req, res) => {
        try {
           const {id} =req.params;
           const {products_id} =req.query
           const roomCategory =await RoomsCategory.findById(id);
           if (!roomCategory) return res.status(404).json({ msg: "Room Category not found" });
           await RoomsCategory.findByIdAndDelete(id);
           await Products.findByIdAndUpdate(products_id,{
            $pull:{RoomsCategory:id},
           })
           return res.status(200).json({ msg: "Delete was a success" });

        
          } catch (err) {
              console.log(err)
            // res.status(400).json({ success: false, err });
          };
    },
    getRoomCategoryId: async (req, res) => {
        try {
          const { id } = req.params; 
          console.log(id)
          
          console.log('sadasd')
          const roomCategory = await RoomsCategory.findById(id);
          console.log(roomCategory);
          res.json({ roomCategory });
        } catch (err) { 
            console.log(err) 
          return res.status(500).json({ msg: err.message });
        }
    },








}

module.exports=roomsCategory