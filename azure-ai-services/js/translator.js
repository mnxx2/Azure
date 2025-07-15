const axios = require("axios");
require("dotenv").config();

const host = process.env.TRANS_ENDPOINT;
const apikey = process.env.TRANS_APIKEY;
const endpoint = `${host}?to=en,fr,ja&api-version=3.0`;

const data = [
  {
    id: "1",
    text: "안녕하세요. 어떻게 도와드릴까요?",
  },
  {
    id: "2",
    text: "두바이초콜릿붕어빵 팔아요.",
  },
];

async function translator() {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": apikey,
        "Ocp-Apim-Subscription-Region": process.env.TRANS_REGION,
        "Content-Type": "application/json",
      },
    });

    const docs = response.data;
    // 배열 두개로 감싸있기 때문에 forEach도 두번해야 Text에 접근할 수 있다

    // respons.data 뒤의 Translations는 배열이기 때문에 forEach
    docs.forEach((doc) => {
      // doc.translations 뒤의 text와 To는 배열이기 때문에 한번 더 forEach
      doc.translations.forEach((text) => {
        console.log(text.text);
      });
    });

    // 데이터의 구조에 따라 forEach의 횟수같은 것들을 맞춰서 사용해야 한다
    docs.forEach((doc, index) => {
      console.log(`원문 : ${data[index].text}`);
      const trans = doc.translations;

      trans.forEach((item) => {
        console.log(`${item.to} : ${item.text}`);
      });
    });
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

translator();
