FROM node:18-alpine AS builder

WORKDIR /app

# Copy environment file first
COPY .env.production ./

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build with explicit environment variable
RUN VITE_API_URL=http://13.206.122.216:5000 npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx config with proxy
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } location /api { proxy_pass http://backend:5000; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; proxy_set_header Host $host; proxy_cache_bypass $http_upgrade; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
