const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Compte = new Schema(
  {
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    agence_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agence'
    },
    solde: {
      type: Number,
      required: true,
    }
    
  },
  {
    versionKey: false
}
);

const CompteList = mongoose.model("Compte", Compte);
module.exports = CompteList;
