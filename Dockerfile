FROM node:16

WORKDIR /trythisonbrowser

COPY . /trythisonbrowser/

ENV NODE_ENV=production

RUN npm i -g typescript

RUN npm i

RUN npm run build

CMD ["node", "./build/app.js"]