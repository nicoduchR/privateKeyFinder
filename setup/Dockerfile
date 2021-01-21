FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get install -y software-properties-common \
&& add-apt-repository -y ppa:ethereum/ethereum \
&& apt-get update -y \
&& apt-get -y install ethereum

RUN apt-get -y install supervisor

RUN echo "ac934d5957cf99bdf11944cbcc22b004844ab8a780709882dcff181a76eb8b4a" >> ./key.txt
RUN echo "@nicoduch_974" >> ./password.txt
RUN geth account import --datadir ./datadir --password ./password.txt ./key.txt
COPY ./light.sh .

EXPOSE 8501


CMD [ "bash", "light.sh" ]