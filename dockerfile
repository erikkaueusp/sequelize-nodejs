FROM node:16-alpine

# Create app directory
WORKDIR /src

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Exports
EXPOSE 3000
CMD npm run start