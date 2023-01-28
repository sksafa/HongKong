const mongoose = require('mongoose')
const { Schema } = mongoose;

const userInfoModelSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        sector: {
            type: mongoose.Schema.ObjectId,
            ref: "sectors",
            required: true,

        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            // required: true,
        },
        active: {
            type: String,
            trim: true,
            required: true,
        }
    },
    { timestamps: true }
);

const userInfoModel = mongoose.model("userInfo", userInfoModelSchema);
module.exports = userInfoModel
