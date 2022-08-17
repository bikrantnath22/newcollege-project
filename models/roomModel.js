const mongoose = require("mongoose");
const RoomCategory = require('./roomCategoryModal')
const { Schema } = mongoose;

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Products'
    },
    

    // sold: {
    //   type: Number,
    //   default: 0,
    // },
    createDate: {
      type: Date,
    },
    outDate: {
      type: Date,
    },

    sold_endDate: {
      type: [],
      default: null,
    },

    hotelName: {
      type: String,
    },
    images: {
      type: Object,
    },

    // inStock: {
    //   type: Number,
    //   default: 0,
    // },

    roomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomsCategory",
      required: true,
    },

  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rooms", roomSchema);
