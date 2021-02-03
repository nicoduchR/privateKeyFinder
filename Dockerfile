FROM node:12.18.1


RUN apt-get update -y

WORKDIR /app

RUN mkdir keys

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY ./index.js .

EXPOSE 3333

CMD [ "node", "index.js" ]
