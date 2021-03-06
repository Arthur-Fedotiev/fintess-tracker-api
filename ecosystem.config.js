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
      key: '~/.ssh/deploy.key',
      ref: 'origin/master',
      repo: 'https://github.com/Arthur-Fedotiev/fintess-tracker-api',
      path: '/root/apps/fintess-tracker-api',
      'post-deploy':
        'yarn --frozen-lockfile && pm2 reload ecosystem.config.js && pm2 save && git checkout yarn.lock',
    },
  },
};
