FROM node:19-buster-slim

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

COPY private.key /usr/src/private.key
COPY .env /usr/src/.env

EXPOSE 8000

CMD npm run start