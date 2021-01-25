FROM node:12.18.1


RUN apt-get update -y

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY ./index.js .

CMD [ "node", "index.js" ]
