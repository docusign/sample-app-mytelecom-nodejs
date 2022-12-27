FROM node:19-buster-slim

WORKDIR /usr/src/app/client
COPY client /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app/server
COPY server /usr/src/app/server
COPY .env_example /usr/src/app/server/.env
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]