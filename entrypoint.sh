#!/bin/sh

# Start Supercronic with the specified crontab file
supercronic /app/crontab &

# Start your application
node server.js
