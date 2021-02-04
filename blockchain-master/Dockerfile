FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get install -y software-properties-common \
&& add-apt-repository -y ppa:ethereum/ethereum \
&& apt-get update -y \
&& apt-get -y install ethereum

RUN apt-get -y install sudo

RUN sudo apt-get -y update
RUN sudo apt-get -y install nodejs npm

WORKDIR /blockchain-master
COPY . .

RUN chmod +x light.sh
EXPOSE 3334
CMD [ "bash", "light.sh" ]
