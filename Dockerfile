FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Copy wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Build the application
RUN npm run build

# Verify the build output and copy to the correct location
RUN ls -la dist/ && \
    cp -r dist/* ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 