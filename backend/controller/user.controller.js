import User from "../modal/user.modal.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, type } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashPwd = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullName: fullName,
      email: email,
      password: hashPwd,
      type: type,
    });
    await createdUser.save();

    res.status(200).json({
      message: "User created" + fullName,
      newUser: {
        email: email,
        fullName: fullName,
        type: type,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error from user.controller.js" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user && !isMatch) {
      return res.status(400).json({ message: "Wrong credentals" });
    } else {
      return res.status(200).json({
        message: "matched",
        user: {
          _id: user.id,
          password: user.password,
          email: user.email,
          type: user.type,
          fullName: user.fullName,
        },
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: "error from user logon controller js" });
  }
};
