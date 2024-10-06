import Goods from "../modal/goods.modal.js";

export const postGoods = async (req, res) => {
  try {
    const { id, goods, weight, age, price, remarks, time } = req.body;

    if (!id || !goods || !weight || !age || !price || !remarks || !time) {
      return res.status(430).json({ message: "All fields are required" });
    }
    const createdPost = new Goods({
      id: id,
      goods: goods,
      weight: weight,
      age: age,
      price: price,
      remarks: remarks,
      time: time,
    });
    await createdPost.save();
    res.status(200).json({ message: "Sell created" });
  } catch (error) {
    res.status(500).json({ message: "error at goods.controller" });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { id } = req.body;
    const goods = await Goods.find({ id: id }); // Make sure this is correct
    return res.status(200).json(goods);
  } catch (error) {
    console.error("Error fetching goods:", error); // More descriptive logging
    res.status(500).json({ message: "Server Error", error: error.message }); // Send back a clearer error message
  }
};
export const getPost = async (req, res) => {
  try {
    const goods = await Goods.find(); // Make sure this is correct
    return res.status(200).json(goods);
  } catch (error) {
    console.error("Error fetching goods:", error); // More descriptive logging
    res.status(500).json({ message: "Server Error", error: error.message }); // Send back a clearer error message
  }
};

export const bidGoods = async (req, res) => {
  try {
    const { bidderId, amount, id } = req.body;

    const updateGoods = await Goods.findOneAndUpdate({ _id: id }, { $push: { bid: { bidderId, amount } } }, { new: true });
    return res.status(200).json(updateGoods);
  } catch (error) {
    console.error("Error bidding on goods:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const getSold = async (req, res) => {
  try {
    const { id, bidsId } = req.body;
    const sold = await Goods.findOneAndUpdate({ _id: id, "bid._id": bidsId }, { $set: { "bid.$.status": "sold" } }, { new: true });
    if (!sold) {
      console.log("something went wrong");
    }
    return res.status(200).json(sold);
  } catch (error) {
    console.error("Error bidding on goods:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const toDelInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const del = await Goods.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully", del });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server from del error" });
  }
};
