FROM nicoduch/blockchain


RUN sudo apt update
RUN sudo apt install nodejs
RUN sudo apt install npm

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ./index.js .

CMD [ "node", "index.js" ]