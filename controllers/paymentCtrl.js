const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");
const Rooms = require("../models/roomModel"); 
const Bookings = require('../models/bookings')

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const { cart, paymentID, address } = req.body;

      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
      cart.filter((item) => {
        return sold(
          item._id,
          item.product_id , 
          // item.quantity,
          // item.inStock,
          // item.sold,
          item.date
        );
      });

      await newPayment.save();

      res.json({ msg: "Payment Success!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id,hotelId, date) => {
  try {
    const startDate = new Date( date.split(',')[0]) ;  
    const endDate =  new Date(date.split(',')[1])  ;   
    const newBooking  = new Bookings({
        hotel_id : hotelId , 
        room_id : id , 
        start : startDate ,
        end : endDate
    })
    // await Rooms.findByIdAndUpdate(id, {
    //   inStock: oldInStock - quantity,
    //   sold: quantity + oldSold,
    //   $addToSet: {
    //     sold_endDate: sold_endDate,
    //   },
    // }); 
    await newBooking.save() ;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = paymentCtrl;
