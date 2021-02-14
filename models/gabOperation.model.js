const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GabOperation = new Schema({
    creditCard_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreditCard'
    },
    money_requested: {
        type: Number,
        required: true,
    }

}, {
    versionKey: false
});

const GabOperationList = mongoose.model("GabOperation", GabOperation);
module.exports = GabOperationList;