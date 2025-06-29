import foodModel from "../models/foodModel.js";
import fs from 'fs'
import path from 'path'
import {v2 as cloudinary} from "cloudinary";

const addFood = async (req, res) => {
    const response=await cloudinary.uploader.upload(req.file.path);
    let image_filename = response.secure_url;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: 'food added' })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })

    }

}
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food.image) {
      const publicId = food.image.split("/").pop().split(".")[0]; // Extract public_id from URL
      await cloudinary.uploader.destroy(publicId); // No folder prefix
    }
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })

    }
}

export { addFood, listFood,removeFood }
