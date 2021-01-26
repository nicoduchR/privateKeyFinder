FROM node:12.18.1


RUN apt-get update -y

WORKDIR /master-api

COPY . .
RUN npm i

EXPOSE 3334
CMD [ "node", "index.js" ]