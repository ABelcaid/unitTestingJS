const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const creditCard = new Schema({
    compte_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compte'
    },
    pin: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }

}, {
    versionKey: false
});

const creditCardList = mongoose.model("creditCard", creditCard);
module.exports = creditCardList;