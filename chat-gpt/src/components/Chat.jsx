// 전체 프로세스를 담는 메인 컴포넌트

import { useState } from "react";
import {
  chatGPT,
  speechToText,
  synthesizeSpeech,
  translate,
} from "../utils/apis";
import AudioRecorder from "./AudioRecorder";

// 일의 시작은 오디오 플레이어 > 녹음 > 녹음 중지 > 파일로 변환 > 시작
export default function Chat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [trans, setTrans] = useState("");

  // 오디오가 캡쳐됐을 때 실행하는 함수
  const handleAudioCaptured = async (audioBlob) => {
    try {
      // 1. stt
      const resultSTT = await speechToText(audioBlob);
      setQuery(resultSTT);

      // 2. chat
      const resultChat = await chatGPT(resultSTT);
      setResponse(resultChat);

      // 3. tts
      // 다음에 전달받을 함수가 없기 때문에 변수 선언 생략
      await synthesizeSpeech(resultChat);

      // 4. translate
      const resultTrans = await translate(resultChat);
      setTrans(resultTrans);
    } catch (error) {
      console.log("error 발생 : ", error.message);
    }
  };

  return (
    <div>
      {/* 대기 지연 시간이 있기 때문에 ux 추가 */}
      <p>녹음된 질문 : {query}</p>
      {/* 실행할 시점을 audiorecorder가 시작하기 때문에 넘겨주는것 */}
      <AudioRecorder onAudioCaptured={handleAudioCaptured} />
      <p>gpt의 응답 : {response}</p>
      <p>Translate to English : {trans}</p>
    </div>
  );
}
