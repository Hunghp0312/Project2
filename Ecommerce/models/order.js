const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema(
    {
        count: {
            type: Number,
        },
        product: {
            type: ObjectId,
            ref: "Product",
        },
        price: {
            type: Number,
        },
        name: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
const orderSchema = new mongoose.Schema(
    {
        orderDetails: [orderDetailSchema],
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        },
        status: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Processing",
                "Shipping",
                "Received",
                "Cancelled",
            ],
        },
        phone: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        address: {
            type: String,
            required: true,
            maxlength: 2000,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
