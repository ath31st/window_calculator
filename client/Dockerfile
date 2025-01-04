FROM node:20-alpine3.17 AS builder

WORKDIR /app

RUN apk add --no-cache yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
COPY .env.prod .env

RUN yarn build


FROM node:20-alpine3.17 AS runner

ENV NODE_ENV production

WORKDIR /app

RUN apk add --no-cache yarn

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["yarn", "start"]