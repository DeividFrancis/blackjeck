FROM node:8-slim

RUN npm -g install browser-sync

RUN apt-get update
# RUN apt-get install iputils-ping

WORKDIR /app

ENTRYPOINT ["browser-sync", "-w"]