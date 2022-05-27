FROM node:14-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . ./
CMD [ "node", "bin/www" ]
