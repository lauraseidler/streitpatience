FROM node:8-alpine

RUN apk add --no-cache git

# install dependencies needed for flow
# @see https://github.com/facebook/flow/issues/3649
# @see https://github.com/sgerrand/alpine-pkg-glibc
RUN apk add --no-cache ca-certificates wget \
    && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub \
    && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.27-r0/glibc-2.27-r0.apk \
    && apk add glibc-2.27-r0.apk \
    && rm glibc-2.27-r0.apk

WORKDIR /ui

CMD yarn install --network-concurrency 1 && yarn start