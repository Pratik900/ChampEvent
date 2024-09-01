FROM node:16

WORKDIR /usr/src/eventchamp-node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","install","-g","node-gyp"]

CMD ["cd","/usr/src/eventchamp-node"]

CMD ["rm","-rf","node_modules"]

CMD ["npm","install"]

CMD ["npm","run","server"]
