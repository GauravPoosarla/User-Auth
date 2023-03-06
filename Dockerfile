FROM alpine:latest

# install node and npm
RUN apk add --update nodejs npm

# set working directory
WORKDIR /app

# install dependencies
COPY package.json package.json
RUN npm install

# install redis
# RUN apk add --update redis

# copy source code
COPY . .

# expose port
EXPOSE  8080

# start app
CMD ["node", "index.js"]
