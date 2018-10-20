FROM node:8-slim

RUN npm -g install browser-sync

WORKDIR /app

ENTRYPOINT ["browser-sync", "-w"]