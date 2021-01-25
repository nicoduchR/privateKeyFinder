FROM node:12.18.1


RUN apt-get update -y


ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY ./index.js .

CMD [ "node", "index.js" ]

# # CMD [ "/bin/bash"]