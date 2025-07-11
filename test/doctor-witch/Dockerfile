FROM node:22.17.0
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install --legacy-peer-deps
ENV NODE_ENV=development
EXPOSE 3000 80
CMD ["npm","start"]