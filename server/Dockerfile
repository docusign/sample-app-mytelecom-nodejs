FROM node:19-buster-slim

WORKDIR /usr/src/app
COPY . /usr/src/app
COPY .env_example /usr/src/app/.env

RUN npm install

COPY private.key /usr/src/private.key

EXPOSE 3000

CMD [ "npm run server" ]