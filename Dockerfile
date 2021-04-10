FROM cypress/browsers:node14.16.0-chrome89-ff86

RUN mkdir /app && cd $_
COPY ./* /app
RUN yarn \
  && yarn nx run chat:build:production

WORKDIR /app

CMD yarn chat-e2e:e2e:production --headless