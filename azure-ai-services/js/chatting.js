const axios = require("axios");
require("dotenv").config({ quiet: true });

const endpoint = process.env.CHATTING_ENDPOINT;
const apikey = process.env.CHATTING_APIKEY;

const question = {
  messages: [
    {
      role: "system",
      content:
        "일체의 마크업이나 html, 줄바꿈 기호 등을 제외하고 일반 텍스트로만 대답해줘",
    },
    { role: "user", content: "로맨스판타지를 제외한 웹소설 추천해줘" },
  ],
};

async function chatting() {
  try {
    const response = await axios.post(endpoint, question, {
      headers: {
        "api-key": apikey,
        "Content-Type": "application/json",
      },
      params: {
        "api-version": "2025-01-01-preview",
      },
    });

    const answers = response.data.choices;

    answers.forEach((answer) => {
      console.log(`답변 : ${answer.message.content}`);
      console.log(`role : ${answer.message.role}`);
    });
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

chatting();

axios
  .post(endpoint, question, {
    headers: {
      "api-key": apikey,
      "Content-Type": "application/json",
    },
    params: {
      "api-version": "2025-01-01-preview",
    },
  })
  .then((response) => {
    const result = response.data.choices[0].message.content;
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
