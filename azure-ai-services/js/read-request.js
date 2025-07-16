const axios = require("axios");
const fs = require("fs");
require("dotenv").config({ quiet: true });

const endpoint = process.env.READ_REQUEST_ENDPOINT;
const apikey = process.env.IMAGE_ANALYZE_APIKEY;

const imagePath = "./images/korean-word.jpg";
const imageBuffer = fs.readFileSync(imagePath);

async function readRequest() {
  try {
    const response = await axios.post(endpoint, imageBuffer, {
      headers: {
        "Ocp-Apim-Subscription-Key": apikey,
        "Content-Type": "image/jpeg",
      },
    });

    const url = response.headers["operation-location"];
    console.log(url);

    // readRequest의 결과인 주소를 받아 주소를 실행하는 함수를 호출해야 하는데
    // read는 시간이 걸리므로 setTimeout() 함수로 5초 기다렸다가 호출
    setTimeout(() => {
      getResult(url);
    }, 5000);
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

// read의 응답 url을 받아 다시 접속해 진짜 결과를 받아오는 함수
async function getResult(url) {
  try {
    // get은 보낼 데이터가 없으므로 주소와 헤더만 보냄
    const response = await axios.get(url, {
      headers: {
        // 헤더도 마찬가지로 보낼 데이터가 없으므로 컨텐트 타입은 삭제
        "Ocp-Apim-Subscription-Key": apikey,
      },
    });

    const lines = response.data.analyzeResult.readResults[0].lines;

    lines.forEach((line) => {
      console.log(line.text);
    });
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

readRequest();
