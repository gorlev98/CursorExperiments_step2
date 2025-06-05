FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Build the application
RUN npm run build

# Verify the build output and copy to the correct location
RUN ls -la dist/ && \
    cp -r dist/* ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 