FROM nginx:latest

# Copy nginx main configuration
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy proxy configuration for backend API
COPY docker/nginx/php-proxy.conf /etc/nginx/conf.d/default.conf

# Create nginx log directories
RUN mkdir -p /var/log/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
