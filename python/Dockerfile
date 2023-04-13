FROM python:slim
WORKDIR /tradingeconomics
RUN apt update
RUN apt install -y git
RUN pip install tradingeconomics
RUN git clone https://github.com/tradingeconomics/tradingeconomics ./
CMD [ "python"]

# Build
# docker build -t tradingeconomics/python:latest .

# run
# docker run -it --name te-python tradingeconomics/python:latest

# push
# docker push tradingeconomics/python:latest

