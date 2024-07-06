FROM node:14-alpine as base

WORKDIR /
COPY package*.json ./
EXPOSE 3000

FROM base
RUN npm ci
COPY . /
CMD ["npm", "start"]