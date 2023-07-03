## Latest verison of node
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json .

##
# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi  

RUN if [ "$NODE_ENV" = "development" ]; then npm install -g nodemon; fi
 
## Bundle source code
COPY . ./

EXPOSE 8000

CMD ["node","index.js"]