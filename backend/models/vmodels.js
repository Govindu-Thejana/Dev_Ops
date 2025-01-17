import mongoose from "mongoose";

const vegiSchema = mongoose.Schema(
    {
        foodname: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
        },
        total: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

export const Vegi = mongoose.model('Vegi', vegiSchema);
