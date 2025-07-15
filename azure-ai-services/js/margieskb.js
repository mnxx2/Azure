const axios = require("axios");
require("dotenv").config();

const endpoint = `${process.env.MARGEIS_ENDPOINT}?projectName=MargiesTravel&api-version=2021-10-01&deploymentName=production`;
const apikey = process.env.MARGIES_APIKEY;

const question = {
  question: "How can I book a flight?",
  top: 3,
  // confidenceScroe가 0.3 이상인 것들만
  confidenceScoreThreshold: 0.3,
};

async function customQna() {
  try {
    const response = await axios.post(endpoint, question, {
      headers: {
        "Ocp-Apim-Subscription-Key": apikey,
        "Content-Type": "application/json",
      },
    });

    const answers = response.data.answers;
    answers.forEach((answer) => {
      console.log(`질문 : ${answer.questions}`);
      console.log(`답변 : ${answer.answer}`);
    });
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

customQna();

// 강사님 답
const endPoint = process.env.MARGEIS_ENDPOINT;
const apiKey = process.env.MARGIES_APIKEY;
axios
  .post(endPoint, question, {
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Content-Type": "application/json",
    },
    // 엔드포인트 뒤에 길게 오는 파라미터는 매개변수 객체 안에 넣을 수 있다
    params: {
      projectName: "MargiesTravel",
      "api-version": "2021-10-01",
      deploymentName: "production",
    },
  })
  .then((response) => {
    const answs = response.data.answers;
    answs.forEach((answer) => {
      const question = answer.questions[0];
      const result = answer.answer;
      console.log(`[${question}] : ${result}`);
    });
  })
  .catch((error) => {
    console.log("에러 발생!! : ", error);
  });
