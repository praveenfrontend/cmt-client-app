/* const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/profileUpdate", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irfprogramlist", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/ProgramUsers", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/req-password-reset", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/UpdateProfilePic", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/subcribeprogram", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/unsubscribeprogram", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/deletefile", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/addgrade", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/upload", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/displayfiles", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/showprograms", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_adpgm", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_aduser", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/add_adpgm", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/show_aduser", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/show_adpgm", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/profile", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/schedules", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_schedule", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/update_schedule", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/add_schedule", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/returnzipcode", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/returncategory", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/reportprograms", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/notesreport", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/goalreport", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/programreport", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_addHealth", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_programUpdate", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/gethealth_programs", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_programUpdate", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childDelete", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childUpdate", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childAdd", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_deleteGoal", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_updateGoal", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_addGoal", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/getprograms", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_userUpdate", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_search", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/login", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/checkToken", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/doesUsernameExist", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/checkemail", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/register", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_register", {
      target: "http://cmtapis-env.eba-km2pdkb3.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
}; */