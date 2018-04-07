FROM node:8-alpine

RUN apk add --no-cache git

WORKDIR /ui

CMD yarn install --network-concurrency 1 && yarn start
