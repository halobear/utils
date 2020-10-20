interface SpWin extends Window {
  SpeechSynthesisUtterance?: new () => SpeechSynthesisUtterance;
}

let speaker: any;
const win = window as SpWin;

// 停止语音
function stop() {
  if (win.speechSynthesis) {
    win.speechSynthesis.cancel();
  }
}

// 播放语音
function speak(text: string) {
  stop();
  if (!speaker && win.SpeechSynthesisUtterance) {
    speaker = new win.SpeechSynthesisUtterance();
  }
  if (speaker) {
    speaker.text = text;
    win.speechSynthesis.speak(speaker);
  }
}

// 监听语音结束
function onend(callback: Function = () => {}) {
  if (!speaker && win.SpeechSynthesisUtterance) {
    speaker = new win.SpeechSynthesisUtterance();
  }
  speaker && (speaker.onend = callback);
}

export default {
  speak,
  stop,
  onend
};
