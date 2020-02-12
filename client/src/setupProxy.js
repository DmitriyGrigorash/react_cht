const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('api/register', { target: 'http://localhost:5000/'}));
    app.use(proxy('api/login', { target: 'http://localhost:5000/'}));
    app.use(proxy('api/me', { target: 'http://localhost:5000/'}));
};
