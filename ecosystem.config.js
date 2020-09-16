module.exports = {
  apps: [
    {
      script: "index.js",
      watch: ".",
      ignore_watch: ["node_modules", "autoSettings.json", "combined.log", "err.log", "out.log"],
      error_file: "err.log",
      out_file: "out.log",
      log_file: "combined.log",
      time: false,
      app_name: "Friday",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
