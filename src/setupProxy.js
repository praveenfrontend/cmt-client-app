/* const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/subcribeprogram", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/unsubscribeprogram", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/deletefile", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/addgrade", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/upload", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/displayfiles", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/showprograms", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_adpgm", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_aduser", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/add_adpgm", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/show_aduser", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/show_adpgm", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/profile", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/schedules", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/delete_schedule", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/update_schedule", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/add_schedule", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/returnzipcode", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/returncategory", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/reportprograms", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/notesreport", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/goalreport", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/programreport", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_addHealth", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_programUpdate", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/gethealth_programs", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_programUpdate", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childDelete", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childUpdate", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_childAdd", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_deleteGoal", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_updateGoal", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_addGoal", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/getprograms", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_userUpdate", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_search", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/login", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/checkToken", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/doesUsernameExist", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/checkemail", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/register", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/irf_register", {
      target: "http://cmtbackend-env.eba-zkcq7ycr.ap-south-1.elasticbeanstalk.com/api",
      changeOrigin: true
    })
  );
};
 */
