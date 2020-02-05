module.exports = {
    mongoUri: process.env.MONGO_URI,
    redirectDomain: process.env.REDIRECT_DOMAIN,
    aKey: process.env.A_KEY,
    tKey: process.env.T_KEY,
};

//TODO: 1: generate and set new aKey for .env prod variable
//TODO: 2: set others variables on heroku environment
