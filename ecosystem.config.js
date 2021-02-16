module.exports = {
  apps: [{
    name: "Express Environment",
    script: 'index.js',
    watch: '.',
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }]
};
