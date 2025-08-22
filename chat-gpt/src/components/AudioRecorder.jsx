import { useRef, useState } from "react";
import { encodeWAV } from "../utils/wavUtil";

export default function AudioRecorder({ onAudioCaptured }) {
  // 녹음중지 -> 녹음시작, 녹음시작 -> 녹음중지로 버튼 상태가 바뀌어야 함
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecordRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 버튼을 누를때마다 실행되는 함수가 달라야 하므로 함수 생성 후 onClick 이벤트
  // 녹음을 하지 않고 있을 때 녹음 시작 함수
  const startRecording = async () => {
    // 녹음을 하기 위해선 먼저 마이크 사용 허가를 받아야 함
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // mediarecorder를 새로 만들고 이걸 stoprecording 함수에서도 사용해야 하므로 Useref 훅에 넣어 사용
    // mediarecordref의 현재값에 새로 만든 mediarecorder의 참조값 대입
    mediaRecordRef.current = new MediaRecorder(stream);

    // mediarecordref에 데이터가 충분히 쌓이면 이벤트 실행
    // 여러 값이 쌓이므로 빈 배열이 필요, 여기에 만들면 여기에서만 사용할 수 있으니 useRef() 사용해서 초기값 빈 배열
    mediaRecordRef.current.ondataavailable = (e) => {
      // 데이터 쌓임
      audioChunksRef.current.push(e.data);
    };

    mediaRecordRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);

      const wavBlob = encodeWAV(
        audioBuffer.getChannelData(0),
        audioBuffer.sampleRate
      );

      // 녹음된 오디오 듣기
      const wavUrl = URL.createObjectURL(wavBlob);

      setAudioUrl(wavUrl);
      onAudioCaptured(wavBlob);
      audioChunksRef.current = [];
    };

    mediaRecordRef.current.start();
    setIsRecording(true);
  };

  // 녹음을 마치고 중지할 때 사용하는 함수
  // 녹음이 중지된 후에는 쌓인 데이터를 외부로 보내야함
  const stopRecording = async () => {
    mediaRecordRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "녹음 중지" : "녹음 시작"}
      </button>
      {audioUrl && (
        <div>
          <p>녹음된 오디오</p>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}
