const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');

const keys = require('./config/keys');


/*** Models ***/
require('./models/User');
require('./models/Message');


/*** Mongoose ***/
mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('#### Connected to DB');
// });

/*** Run express ***/
const app = express();
app.use(passport.initialize());
require('./services/auth')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}


/*** Routes ***/
require('./routes/user')(app);
require('./routes/message')(app);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


// *** Express listen
app.listen(port, () => {
    console.log('#### Server is running on port: ', port);
});
