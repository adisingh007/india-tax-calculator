FROM ubuntu

# Copy only source code, tsconfig.json and package.json files
COPY ts/ /opt/taxy/ts/
COPY package.json /opt/taxy/package.json
COPY tsconfig.json /opt/taxy/tsconfig.json
WORKDIR /opt/taxy

# Install npm
RUN apt update -y
RUN apt install npm -y

# Install npm dependencies, clean up, build, and test
RUN npm install
RUN npm run clean
RUN npm run compile
RUN npm test

# Removed all other files as we only want package.json and compiled Javascript files
RUN rm -rf ts/
RUN rm tsconfig.json
RUN rm -rf node_modules/

# Install only prod dependencies
RUN npm install --only=prod

# Run the app
CMD ["npm", "start"]
