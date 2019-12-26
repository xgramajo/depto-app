const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    floor: {type: String, require: true},
    number: {type: String,require: true},
    owner_dni: {type: String,require: true},
    owner_name: {type: String,require: false},
    owner_lastname: {type: String,require: false}
});

module.exports = mongoose.model("Apartment", apartmentSchema);