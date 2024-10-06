import express from "express";
const router = express.Router();
import { bidGoods, getPost, getSold, getUserPost, postGoods, toDelInfo } from "../controller/goods.controller.js";

router.post("/postGoods", postGoods);
router.post("/getUserPost", getUserPost);
router.post("/bidGoods", bidGoods);
router.post("/getSold", getSold);
router.get("/getPost", getPost);
router.post("/toDelInfo", toDelInfo);

export default router;
