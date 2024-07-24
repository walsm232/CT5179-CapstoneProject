# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY ../student-placement-platform/package*.json ./

RUN npm install --legacy-peer-deps

COPY student-placement-platform/ ./

RUN npm run build --legacy-peer-deps



# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY /delivery/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
