FROM node:18-alpine

ARG SERVICE_NAME=appgateway-service

WORKDIR /app

COPY $SERVICE_NAME/package.json .
COPY $SERVICE_NAME/yarn.lock .

RUN yarn install --production

COPY $SERVICE_NAME/src ./src
COPY $SERVICE_NAME/tsconfig.json .
COPY shared /shared


ENV NODE_ENV production

RUN yarn global add tsx

CMD ["yarn", "start"]

EXPOSE 3005

