# Build stage
FROM node:18 AS build

# Set the working directory in the build stage
WORKDIR /usr/src/app

# Copy the frontend directory contents into the container at /usr/src/app
COPY . .

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Serve stage
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
# copy .env.example as .env to the relase build
COPY --from=build /usr/src/app/.env.example /usr/share/nginx/html/.env
COPY --from=build /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf

# (Optional) Copy the custom Nginx config into the image
# COPY custom_nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add --update nodejs
RUN apk add --update npm
# Install runtime-env-cra
RUN npm i -g runtime-env-cra@0.2.0

# Expose port 80 for the app
EXPOSE 80

# Start Nginx with runtime-env-cra
CMD ["/bin/sh", "-c", "cd /usr/share/nginx/html && runtime-env-cra && nginx -g \"daemon off;\""]
