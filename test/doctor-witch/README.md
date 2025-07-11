# Doctor-Witch : 1st Mini Project - Docker upload

첫 번째 미니 프로젝트인 doctor-witch를 docker에 올리기

## doctor-witch 폴더를 감쌀 test 폴더 생성

작업할 디렉토리를 감싸고 test에서 명령어 입력
doctor-witch 폴더를 지정할 때 ./doctor-witch 로 입력

###

Dockerfile 작성

FROM node:22.17.0
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install --legacy-peer-deps
ENV NODE_ENV=development
EXPOSE 3000 80
CMD ["npm","start"]

### 실행

처음 실행한다면
docker image build ./doctor-witch -t doctorwitch
docker container run -d —name doctorwitch doctorwitch
npm start

다시 실행한다면
docker container restart doctorwitch
npm start

이 모든 것은 doctorwitch가 있는 test 폴더에서 작업해야 함
Dockerfile 등이 test/doctor-witch 안에 있기 때문!
