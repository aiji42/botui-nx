FROM cypress/browsers:node14.16.0-chrome89-ff86

RUN mkdir /app
WORKDIR /app

RUN yarn \
  && yarn nx run chat:build:production

CMD yarn chat-e2e:e2e:production --headless