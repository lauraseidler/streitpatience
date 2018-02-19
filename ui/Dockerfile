FROM node:8-alpine

WORKDIR /ui

RUN apk add --no-cache git

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]