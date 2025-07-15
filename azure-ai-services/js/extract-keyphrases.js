// 핵심구추출 azure language services

// 필요한 모듈 require
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const host = process.env.LANGUAGE_ENDPOINT;
const apikey = process.env.LANGUAGE_APIKEY;
const endpoint = `${host}/text/analytics/v3.1/keyphrases`;

const data = {
  documents: [
    {
      id: "1",
      language: "en",
      text: "These keys are used to access your Azure AI Foundry API. Do not share your keys. Store them securely– for example, using Azure Key Vault. We also recommend regenerating these keys regularly. Only one key is necessary to make an API call. When regenerating the first key, you can use the second key for continued access to the service.",
    },
    {
      id: "2",
      language: "ko",
      text: "올여름 이상기후가 기승을 부리고 있다. 서울은 물론 전국 곳곳의 낮 최고기온이 1907년 기상 관측 이래 가장 높은 수준으로 오르면서 '100년 만의 폭염'이 현실화되고 있다. 온열질환자는 집계가 시작된 2011년 이래 가장 빠른 속도로 늘면서 약 1500명의 환자가 응급실에 실려 가고 9명이 목숨을 잃었다. 최근 지방의 한 공사장에서는 베트남 국적의 20대 근로자가 온열질환으로 인해 사망한 것으로 알려졌다.",
    },
  ],
};

async function extractKeyPhrases() {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": apikey,
        "Content-Type": "application/json",
      },
    });

    const documents = response.data.documents;
    documents.forEach((docu) => {
      //   console.log(`${docu.id} 핵심구 : ${docu.keyPhrases}`);
      console.log(docu.id);
      docu.keyPhrases.forEach((item) => {
        console.log(item);
      });
    });
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

extractKeyPhrases();
