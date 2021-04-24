/* const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/deletefile", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/addgrade", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/documents", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/displayfiles", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/showprograms", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_adpgm", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_aduser", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/add_adpgm", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/show_aduser", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/show_adpgm", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/profile", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/schedules", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_schedule", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/update_schedule", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/add_schedule", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/returnzipcode", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/returncategory", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/reportprograms", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/notesreport", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/goalreport", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/programreport", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_addHealth", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_programUpdate", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/gethealth_programs", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_programUpdate", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childDelete", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childUpdate", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childAdd", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_deleteGoal", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_updateGoal", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_addGoal", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/getprograms", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_userUpdate", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_search", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/login", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/checkToken", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/doesUsernameExist", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/checkemail", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/register", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_register", {
      target: "https://cmt2019.000webhostapp.com/api",
      changeOrigin: true
    })
  );
};
 */
