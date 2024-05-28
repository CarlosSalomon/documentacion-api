import { Router } from "express"
import ProductManager from "../dao/mongoDB/mongomanagers/productManagerMongo.js"
import { __dirname } from "../utils.js"


const manager = new ProductManager()
const router = Router()


router.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();

    if (products.length === 0) {

      res.status(204).json("No hay productos en la tienda");
    } else {
      res.status(200).json({ status: "success", products });
    }
  } catch (error) {

    res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
  }
});
router.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid
  const productfind = await manager.getProductById(pid);
  res.json({ status: "success", productfind });
});

router.post("/products", async (req, res) => {
  try {
    const obj = req.body;
    const newproduct = await manager.addProduct(obj);
    res.status(201).json({ status: "success", newproduct });
  } catch (error) {

    res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
  }
});

router.put("/products/:pid", async (req, res) => {
  const pid = req.params.pid
  const obj = req.body
  const updatedproduct = await manager.updateProduct(pid, obj);
  res.json({ status: "success", updatedproduct });
});

router.delete("/products/:pid", async (req, res) => {
  const id = req.params.pid
  const deleteproduct = await manager.deleteProduct(id);
  res.json({ status: "success", deleteproduct });
});




export default router