const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MonneyProvider = new Schema(
  {
    matricule: {
        type: String,
        required: true
    }
    
  },
  {
    versionKey: false
}
);

const MonneyProviderList = mongoose.model("MonneyProvider", MonneyProvider);
module.exports = MonneyProviderList;
