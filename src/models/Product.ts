import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        lowercase: true
    },
    image: {
        type: String,
        required: false,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    }
});

export default model('Product', ProductSchema);