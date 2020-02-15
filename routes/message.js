const mongoose = require('mongoose');
const Message = mongoose.model('messages');

module.exports = app => {
    app.post('/api/message', async (req, res) => {
        const {body, read, dateSent, _userId, name} = req.body;

        const message = new Message({body, read, dateSent, _userId, name});

        await message.save((err) => {
            if (err) return res.status(400).json(err);
        });
    });

    app.get('/api/messages', async (req, res) => {

        try {
            const messages = await Message.find({});
            res.send(messages);
        } catch (err) {
            res.status(404).json(err);
        }
    })
};
