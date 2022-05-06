FROM ubuntu

RUN apt update -y
RUN apt install npm -y

COPY . /opt/taxy
WORKDIR /opt/taxy
RUN npm install

EXPOSE 8080
CMD ["npm", "run", "app"]
