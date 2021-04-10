FROM cypress/browsers:node14.16.0-chrome89-ff86

RUN mkdir /app
WORKDIR /app

COPY package.json package.json

RUN yarn

CMD yarn nx run chat:build:production && yarn chat-e2e:e2e:production --headless