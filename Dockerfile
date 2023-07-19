FROM node:20-alpine

COPY . /app/

WORKDIR /app/

RUN yarn install

# RUN yarn typeorm:migration:generate

# RUN yarn build

CMD [ "yarn", "start:dev" ]
