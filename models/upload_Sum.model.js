const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UploadSum = new Schema({
    total_up: {
        type: Number,
        required: true,
    },
    id_money_provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MonneyProvider'
       
    },
    gab_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GabOperation'
       
    }

}, {
    versionKey: false
});

const UploadSumList = mongoose.model("UploadSum", UploadSum);
module.exports = UploadSumList;