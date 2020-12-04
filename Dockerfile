FROM node:12

RUN npm i -g npm

WORKDIR /graphql-server
COPY package*.json ./
RUN npm i

COPY index.js ./

EXPOSE 4000/tcp
CMD node /graphql-server/index.js
