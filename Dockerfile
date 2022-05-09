FROM ubuntu

# Copy all files to /opt/taxy
COPY . /opt/taxy
WORKDIR /opt/taxy

# Install npm
RUN apt update -y
RUN apt install npm -y

# Install npm dependencies, clean up, build, and test
RUN npm install
RUN npm run clean
RUN npm run compile
RUN npm test

# Remove all node_modules
RUN rm -rf node_modules/

# Install only prod dependencies
RUN npm install --only=prod

# Run the app
CMD ["npm", "start"]
