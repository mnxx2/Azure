// STT : 음성으로 말하는 질문에서 텍스트 추출, 질문을 받아올때는 음성이기 때문에 audio로 받음
const speechToText = async (audio) => {
  const endPoint = process.env.REACT_APP_STT_ENDPOINT;
  const apiKey = process.env.REACT_APP_SPEECH_KEY;

  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Content-Type": "audio/wav",
    },
    body: audio,
  });

  const result = await response.json();
  return result.DisplayText;
};

// Chat : speechToText에서 넘겨주는 result.DisplayText를 text로 받아 챗지피티에게 전달
const chatGPT = async (text) => {
  const endPoint = process.env.REACT_APP_CHAT_ENDPOINT;
  const apiKey = process.env.REACT_APP_CHAT_KEY;

  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    // body에 들어오는 messages는 자바스크립트 객체이기 때문에 json 형태로 바꿔줘야 한다
    // 따라서 객체를 JSON.stringify()로 감싸준다
    body: JSON.stringify({
      messages: [
        { role: "system", content: "너는 친절한 조력자야" },
        {
          role: "system",
          content:
            "일체의 마크업이나 Html, 줄바꿈 기호 등을 생략하고 일반 텍스트로만 대답해줘.",
        },
        // 실제로 물어볼 질문은 SpeechToText에서 넘어온 text를 입력
        { role: "user", content: text },
      ],
    }),
  });

  const result = await response.json();
  return result.choices[0].message.content;
};

// TTS : text를 받아 음성으로 변환(wave), blob으로 떨어지고 url을 만들어 재생
const synthesizeSpeech = async (text) => {
  const endPoint = process.env.REACT_APP_TTS_ENDPOINT;
  const apiKey = process.env.REACT_APP_SPEECH_KEY;

  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm",
    },
    body: `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">
           <voice name="ko-KR-SunHiNeural">
                ${text}
            </voice>
            </speak>`,
  });

  // 데이터를 받았을 때 바이트 단위로 직렬화돼서 넘어오는데 그것을 파일로 바꿔주는 작업
  const audioBlob = await response.blob();
  // 오디오가 저장되고 url이 저장된다
  const audioURL = URL.createObjectURL(audioBlob);
  // 오디오 플레이어 생성
  const audio = new Audio(audioURL);
  // 오디오의 Play 함수 호출
  audio.play();
};

const translate = async (text) => {
  const endpoint = process.env.REACT_APP_TRANS_ENDPOINT;
  const apikey = process.env.REACT_APP_TRANS_KEY;
  const region = process.env.REACT_APP_TRANS_REGION;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": apikey,
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Region": region,
    },
    body: JSON.stringify([{ id: 1, text: text }]),
  });

  const result = await response.json();
  return result[0].translations[0].text;
};

export { speechToText, chatGPT, synthesizeSpeech, translate };
