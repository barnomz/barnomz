#!/bin/sh

# Start Supercronic with the specified crontab file
supercronic /app/crontab &

npm run db:migrate

# Start your application
node server.js
