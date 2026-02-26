import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    discount: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    note: { type: String, default: "" }
})

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

export default foodModel;