const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Agence = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
    
  },
  {
    versionKey: false
}
);

const AgenceList = mongoose.model("Agence", Agence);
module.exports = AgenceList;
