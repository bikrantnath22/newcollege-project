const mongoose = require("mongoose");


const roomCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    

    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Products'

    },
   
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoomsCategory", roomCategorySchema);
