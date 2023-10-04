import { Router } from "express";

const router = Router();
const products = []; // Initialize an empty array to store products

router.get("/", (req, res) => {
  res.render("home", { products }); // Pass the products array to the home view
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { products }); // Pass the products array to the realTimeProducts view
});

export default router;
