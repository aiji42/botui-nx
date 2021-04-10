FROM cypress/browsers:node14.16.0-chrome89-ff86

COPY ./package.json /app/package.json
COPY ./patches /app/patches
RUN cd /app && yarn

RUN yarn nx run chat:build:production

WORKDIR /app

CMD yarn nx run chat-e2e:e2e --configuration=production --headless