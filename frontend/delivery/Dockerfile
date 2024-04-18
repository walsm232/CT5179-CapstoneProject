# Stage 1: Build the React app
FROM node:14-alpine AS build

WORKDIR /app

COPY ../student-placement-platform/package*.json ./

RUN npm install

COPY student-placement-platform/ ./

RUN npm run build



# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
