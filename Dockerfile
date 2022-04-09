FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install && yarn cache clean

COPY . .

FROM builder as prod
RUN yarn build
EXPOSE 3000
CMD yarn start:prod


FROM builder as dev
EXPOSE 3000
CMD yarn start:dev

