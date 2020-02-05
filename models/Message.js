const mongoose = require("mongoose");
const { Schema } = mongoose;

// const UserSchema = require('./User');

const messageSchema = new Schema({
    body: String,
    // user: [UserSchema],
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
});

mongoose.model('surveys', messageSchema);
