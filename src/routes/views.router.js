import { Router } from "express";

const router = Router();
const products = []; 

router.get("/", (req, res) => {
  res.render("home", { products }); 
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { products }); 
});

export default router;
