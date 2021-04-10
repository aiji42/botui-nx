FROM cypress/browsers:node14.16.0-chrome89-ff86

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./patches /app/patches
RUN cd /app && yarn

RUN yarn nx run chat:build:production

COPY ./nx.json /app/nx.json
COPY ./workspace.json /app/workspace.json
COPY ./babel.config.json /app/babel.config.json
COPY ./tsconfig.base.json /app/tsconfig.base.json
COPY ./apps /app/apps
COPY ./libs /app/libs

WORKDIR /app

CMD yarn nx run chat-e2e:e2e --configuration=production --headless