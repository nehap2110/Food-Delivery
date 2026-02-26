# Use official Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose your server port
EXPOSE 4000

# Run the server
CMD ["node", "index.js"]
