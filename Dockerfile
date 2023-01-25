FROM python:latest
WORKDIR /tradingeconomics
RUN apt update
RUN apt install -y git
RUN git clone https://github.com/tradingeconomics/tradingeconomics ./
RUN pip install tradingeconomics