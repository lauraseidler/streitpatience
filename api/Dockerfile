FROM node:8-alpine

RUN apk add --no-cache git

WORKDIR /api

CMD yarn install --network-concurrency 1 && yarn run dev
