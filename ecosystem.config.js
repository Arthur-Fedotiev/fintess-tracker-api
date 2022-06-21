module.exports = {
  apps: [
    {
      name: 'fitness-tracker-api',
      script: 'yarn start',
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 8080,
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '104.248.129.253',
      key: 'deploy.key',
      ref: 'origin/master',
      repo: 'https://github.com/Arthur-Fedotiev/fintess-tracker-api',
      path: '/root/apps/fintess-tracker-api',
      'post-deploy':
        'yarn install && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
