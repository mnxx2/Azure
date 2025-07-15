// 감정분석 azure language services

// 필요한 모듈 import
const axios = require("axios");
const dotenv = require("dotenv");

// 현재 폴더 안의 dotenv의 값을 읽어와 프로세스의 env에 값을 넣는다
dotenv.config();

const host = process.env.LANGUAGE_ENDPOINT;
const apikey = process.env.LANGUAGE_APIKEY;
const endpoint = `${host}/text/analytics/v3.1/sentiment`;

const data = {
  documents: [
    {
      id: "1",
      language: "ko",
      text: "오늘 하루 너무 기쁘고 즐거웠어요! 거리가 너무 예뻐요.",
    },
    {
      id: "2",
      language: "ko",
      text: "자동차가 지나갑니다.",
    },
    {
      id: "3",
      language: "ko",
      text: "오늘 하루 너무 슬퍼요.",
    },
    {
      id: "4",
      language: "en",
      text: "It's sunny day!",
    },
  ],
};

// async/await
async function extractSentiment() {
  try {
    // axios.post() 의 매개변수는 url, data, config 객체
    const response = await axios.post(endpoint, data, {
      // 헤더에도 여러개가 들어가므로 객체
      headers: {
        "Ocp-Apim-Subscription-Key": apikey,
        "Content-Type": "application/json",
      },
    });

    // documents array 반환
    const documents = response.data.documents;
    documents.forEach((document, index) => {
      console.log(
        `${document.id} [${data.documents[index].text}] : ${document.sentiment}`
      );
    });
  } catch (error) {
    console.log("error 발생 : ", error);
  }
}

extractSentiment();
