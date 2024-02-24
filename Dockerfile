FROM node:20.11-bookworm

COPY ["package.json","package-lock.json","/usr/src/"]

WORKDIR /usr/src/

RUN npm install

COPY [".","/usr/src/"]

EXPOSE 3310

CMD ["npm","run","dev"]
