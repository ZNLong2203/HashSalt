FROM node:22 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html
RUN echo "worker_processes 1;" > /etc/nginx/nginx.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
