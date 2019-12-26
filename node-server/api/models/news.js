const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, require: false},
    description: {type: String,require: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, require: false}
});

module.exports = mongoose.model("News", newsSchema);