const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
    {
        product: {
            type: ObjectId,
            ref: "Product",
            required: true,
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            maxlength: 2000,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
