const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/*", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/facebook", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/github", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/login", { target: "http://localhost:5000" }));
};

  
// https://github.com/login/oauth/authorize?client_id=1f5211f61755504c897