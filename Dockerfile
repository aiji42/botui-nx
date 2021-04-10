FROM cypress/browsers:node14.16.0-chrome89-ff86

COPY . /app
RUN cd /app \
  && yarn \
  && yarn nx run chat:build:production

WORKDIR /app

CMD yarn nx chat-e2e:e2e:production --headless