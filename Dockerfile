FROM cypress/browsers:node14.16.0-chrome89-ff86

RUN mkdir /app && cd $_
COPY package.json /app/package.json
COPY patches /app/patches
RUN yarn

WORKDIR /app

CMD yarn nx run chat:build:production && yarn chat-e2e:e2e:production --headless