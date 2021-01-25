FROM node:12.18.1


RUN apt-get update -y

WORKDIR /master-api

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm i

COPY . .
# COPY ./index.js .
# COPY ./utils ./utils

CMD [ "node", "index.js" ]