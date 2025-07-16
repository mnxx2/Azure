const axios = require("axios");
// [dotenv@17.2.0] injecting env ~ 안 나오게 하려면 config에 quiet : true 부여
require("dotenv").config({ quiet: true });

const endpoint = process.env.LNAG_UNDERSTAND_ENDPOINT;
const apikey = process.env.LANG_UNDERSTAND_APIKEY;
const requestId = process.env.LANG_UNDERSTAND_ID;

const query = {
  kind: "Conversation",
  analysisInput: {
    conversationItem: {
      id: "1",
      text: "turn off the tv",
      modality: "text",
      language: "en",
      participantId: "1",
    },
  },
  parameters: {
    projectName: "HomeAutomation",
    verbose: true,
    deploymentName: "homeautomation",
    stringIndexType: "TextElement_V8",
  },
};

async function languageUnderstanding() {
  try {
    const response = await axios.post(endpoint, query, {
      headers: {
        "Ocp-Apim-Subscription-Key": apikey,
        "Apim-Request-Id": requestId,
        "Content-Type": "application/json",
      },
      params: {
        "api-version": "2024-11-15-preview",
      },
    });

    const data = response.data.result;

    // const intents = data.prediction.intents;
    // intents.forEach((intent) => {
    //   console.log(
    //     `intent is [${intent.category}], confidenceScore is [${intent.confidenceScore}]`
    //   );
    // });

    // console.log(`질문은 [ ${data.query} ]`);
    // console.log(`의도는 [ ${data.prediction.topIntent} ]`);

    // const entities = data.prediction.entities;
    // entities.forEach((entity) => {
    //   console.log(`대상은 [ ${entity.text} ]`);
    // });

    const question = data.query;
    const intent = data.prediction.topIntent;
    const entity = data.prediction.entities[0];
    console.log(`${question} : ${intent} : ${entity.text}[${entity.category}]`);
  } catch (error) {
    console.log("에러 발생 : ", error);
  }
}

languageUnderstanding();
