const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
    body: String,
    status: String,
    dateSent: Date,
    userId: String,
    name: String
});

mongoose.model('messages', MessageSchema);
