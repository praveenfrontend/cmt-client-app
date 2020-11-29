const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/login", {
      target: "https://test4cmt.000webhostapp.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/checkToken", {
      target: "https://test4cmt.000webhostapp.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/doesUsernameExist", {
      target: "https://test4cmt.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/checkemail", {
      target: "https://test4cmt.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/register", {
      target: "https://test4cmt.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_register", {
      target: "https://test4cmt.000webhostapp.com/api",
      changeOrigin: true
    })
  );
};
