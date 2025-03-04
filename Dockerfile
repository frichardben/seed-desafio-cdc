# Use a Node.js base image
FROM node:20-alpine3.20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8082

# Command to run the application
CMD ["npm", "run", "start:dev"]
