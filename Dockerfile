FROM node:12.16-alpine

ENV NPM_CONFIG_LOGLEVEL=error

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
