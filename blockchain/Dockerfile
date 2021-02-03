FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get install -y software-properties-common \
&& add-apt-repository -y ppa:ethereum/ethereum \
&& apt-get update -y \
&& apt-get -y install ethereum

RUN apt-get -y install sudo

RUN echo "ac934d5957cf99bdf11944cbcc22b004844ab8a780709882dcff181a76eb8b4a" >> ./key.txt
RUN echo "dumb_password" >> ./password.txt
RUN geth account import --datadir ./datadir --password ./password.txt ./key.txt


COPY ./fast.sh .
RUN chmod +x /fast.sh
EXPOSE 8501
CMD [ "bash", "fast.sh" ]
