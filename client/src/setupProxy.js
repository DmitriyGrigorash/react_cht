const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('api/users/register', { target: 'http://localhost:5000/'}));
    app.use(proxy('api/users/login', { target: 'http://localhost:5000/'}));
    app.use(proxy('api/users/me', { target: 'http://localhost:5000/'}));
    // app.use(proxy('/api', { target: 'http://localhost:5000/', ws: true}));
};
