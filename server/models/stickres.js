const mongoose = require('mongoose');

const stickreschema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    category: { type: String }


});

module.exports = mongoose.model('stickres', stickreschema);
