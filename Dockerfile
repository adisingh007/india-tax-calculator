FROM ubuntu

RUN apt update -y
RUN apt install npm -y

COPY . /opt/taxy
WORKDIR /opt/taxy
RUN npm install
RUN npm run clean
RUN npm run compile
RUN npm run test

CMD ["npm", "run", "app"]
