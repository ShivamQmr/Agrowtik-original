import mongoose from "mongoose";

const goodsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  goods: {
    type: String,
    required: true, // Name/type of the grain (e.g., Paddy, Wheat)
  },
  weight: {
    type: Number,
    required: true, // Weight in kilograms
  },
  age: {
    type: Number,
    required: true, // Age in months
    min: 0, // Ensure age is a non-negative value
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  remarks: {
    type: String,
    default: "", // Optional field for additional remarks
  },
  time: {
    type: String,
  },
  bid: [
    {
      bidderId: {
        type: String, // or type: mongoose.Schema.Types.ObjectId if using ObjectId
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
      },
    },
  ],
});

const Goods = mongoose.model("good", goodsSchema);

export default Goods;
