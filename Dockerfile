# node version to use
FROM node:22
# Directory to save image
WORKDIR /app
# Install all dependencies in the root directory
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# Bundle app source
COPY . .
# port used for the app
EXPOSE 3000
CMD ["npm", "run", "start"]