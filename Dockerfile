FROM ubuntu

# Install npm
RUN apt update -y
RUN apt install npm -y

# Copy entire project
COPY . /opt/taxy-temp
WORKDIR /opt/taxy-temp

# Install npm deps, clean up, build, and test
RUN npm install
RUN npm run clean
RUN npm run compile
RUN npm run test

# Create another directory and copy the build files and package.json there
RUN mkdir -p /opt/taxy/target
RUN mv ./target/src /opt/taxy/target/src
RUN mv ./package.json /opt/taxy/package.json

# Change workdir containing only build files and delete the taxy-temp directory
WORKDIR /opt/taxy
RUN rm -rf /opt/taxy-temp

# Install npm dependencies (prod only) in the new working directory
RUN npm install --only=prod

# Ready to go
CMD ["npm", "run", "app"]
