FROM node:16

WORKDIR /usr/src/eventchamp-node

COPY /EventChamp_Node/package*.json ./

RUN npm install

COPY ./EventChamp_Node .

EXPOSE 8080

CMD ["npm","install","-g","node-gyp"]

CMD ["cd","/usr/src/eventchamp-node"]

CMD ["rm","-rf","node_modules"]

CMD ["npm","install"]

CMD ["npm","run","server"]
