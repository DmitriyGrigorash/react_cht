const mongoose = require("mongoose");
const { Schema } = mongoose;


const MessageSchema = new Schema({
    body: String,
    read: Boolean,
    dateSent: Date,
    _userId: String,
    name: String
});

mongoose.model('surveys', MessageSchema);
