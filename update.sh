#!/bin/sh

#docker compose down
git pull
docker compose up --build --detach
# docker-compose-prod.yml is called docker-compose.yml in production server
