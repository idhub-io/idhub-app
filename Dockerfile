# Stage 1 - the build process
FROM node:12-alpine as build-ui

RUN apk --no-cache add git

WORKDIR /src
ADD package.json package-lock.json /src/

RUN NG_CLI_ANALYTICS=ci npm ci

ADD . /src

RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.19.1-alpine

EXPOSE 80

RUN rm -rf /etc/nginx/conf.d
COPY --from=build-ui /src/www /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx","-g","daemon off;"]