# Use the official Node.js image as the base image
FROM node:16.14.0 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.1-alpine

COPY --from=build-stage /app/dist/issuer-controller /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]