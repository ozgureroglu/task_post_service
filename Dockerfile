FROM node:19-alpine
WORKDIR /usr
COPY package.json ./
RUN npm i
COPY . ./


ENV NODE_PATH=./build
RUN npm run build

EXPOSE 8000
CMD ["yarn","start"]
