FROM --platform=linux/amd64 node:19-alpine AS development

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 nginx:1.22.1-alpine

COPY --from=development /usr/src/app/build /usr/share/nginx/html
COPY nginx/conf/default.conf /etc/nginx/conf.d/
