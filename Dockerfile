# node-vite is a custom image
ARG IMAGE=node-vite
FROM $IMAGE as base

# Vite app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install node modules
COPY --link package.json ./
RUN pnpm install --prod=false

# Copy application code
COPY --link . .

# Environment variables
ARG API_URL=
ARG CDN_URL=https://db2cdn.fra1.cdn.digitaloceanspaces.com/
ARG SHORTCUTS=
ARG SENTRY_DSN=
ARG SENTRY_ENV=
ARG SENTRY_RELEASE=
ARG SENTRY_AUTH_TOKEN=

RUN echo "VITE_API=$API_URL" > .env
RUN echo "VITE_CDN=$CDN_URL" >> .env
# Shortcuts
RUN echo "VITE_SHORCUTS=$SHORTCUTS" >> .env
# Sentry DSN and environment
RUN echo "VITE_SENTRY_DSN=$SENTRY_DSN" >> .env
RUN echo "VITE_SENTRY_ENV=$SENTRY_ENV" >> .env
RUN echo "VITE_SENTRY_RELEASE=$SENTRY_RELEASE" >> .env
RUN echo "SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN" >> .env

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod

# Final stage for app image
FROM nginx

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY --link nginx.conf /etc/nginx/nginx.conf

# Start the server by default, this can be overwritten at runtime
EXPOSE 80
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
