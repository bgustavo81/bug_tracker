const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api/**", { target: "http://localhost:5000" }));
    app.use(createProxyMiddleware("/auth/google", { target: "http://localhost:5000" }));
    app.use(createProxyMiddleware("/auth/facebook", { target: "http://localhost:5000" }));
    app.use(createProxyMiddleware("/auth/github", { target: "http://localhost:5000" }));
    app.use(createProxyMiddleware("/auth/logout", { target: "http://localhost:5000" }));
    app.use(createProxyMiddleware("/auth/current_user", { target: "http://localhost:5000" }));

    app.use(createProxyMiddleware("/api/**", { target: "https://bugtrackerly.herokuapp.com/" }));
    app.use(createProxyMiddleware("/auth/google", { target: "https://bugtrackerly.herokuapp.com/" }));
    app.use(createProxyMiddleware("/auth/facebook", { target: "https://bugtrackerly.herokuapp.com/" }));
    app.use(createProxyMiddleware("/auth/github", { target: "https://bugtrackerly.herokuapp.com/" }));
    app.use(createProxyMiddleware("/auth/logout", { target: "https://bugtrackerly.herokuapp.com/" }));
    app.use(createProxyMiddleware("/auth/current_user", { target: "https://bugtrackerly.herokuapp.com/" }));
};


// const proxy = require("http-proxy-middleware");

// module.exports = function(app) {
//   app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
//   app.use(proxy("/api/*", { target: "http://localhost:5000" }));
//   app.use(proxy("/auth/facebook", { target: "http://localhost:5000" }));
//   app.use(proxy("/auth/github", { target: "http://localhost:5000" }));
//   app.use(proxy("/auth/login", { target: "http://localhost:5000" }));
// };

  
// https://github.com/login/oauth/authorize?client_id=1f5211f61755504c897