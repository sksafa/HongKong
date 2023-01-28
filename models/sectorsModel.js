const mongoose = require('mongoose')
const { Schema } = mongoose;

const sectorsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    value: {
      type: String,
      required: [true, 'value is required'],
      trim: true,
      unique: true,
    }
  },
  { timestamps: true }
);

 const sectorModel = mongoose.model("sectors", sectorsSchema);
 module.exports = sectorModel