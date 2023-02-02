FROM node:lts-alpine

WORKDIR /app
CMD ["npm", "run", "start"]

COPY package* ./
RUN npm ci
COPY . .
