FROM cypress/browsers:node14.16.0-chrome89-ff86

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./patches /app/patches
RUN cd /app && yarn

COPY ./nx.json /app/nx.json
COPY ./workspace.json /app/workspace.json
COPY ./babel.config.json /app/babel.config.json
COPY ./tsconfig.base.json /app/tsconfig.base.json
COPY ./apps /app/apps
COPY ./libs /app/libs

RUN yarn nx run chat:build:production

CMD yarn nx run chat-e2e:e2e --configuration=production --headless