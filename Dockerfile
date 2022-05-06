FROM ubuntu

RUN apt update -y
RUN apt install nvm npm -y

RUN nvm install lts/gallium
COPY . /opt/taxy
WORKDIR /opt/taxy
RUN npm install

ENTRYPOINT [ "npm", "run", "app" ]
