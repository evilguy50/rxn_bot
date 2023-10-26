## build runner
FROM node:lts-alpine

# Set temp directory
WORKDIR /app

# Move source files
COPY . .

# Install dependencies
RUN npm install

# Build project
RUN npm run build

# Start bot
CMD [ "npm", "run", "start" ]