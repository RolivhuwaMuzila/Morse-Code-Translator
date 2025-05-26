import React, { useState } from "react";
import { 
  container, twoColumnLayout, box, inputBox, button, result 
} from "../styles";
import { morseCodeMap, reverseMorseCodeMap } from "../data/morseCodeMap";

const Translator = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [decoded, setDecoded] = useState("");

  // Convert text to morse code
  const lettersToMorseCode = (text) => {
    return text.toUpperCase().split("").map(char =>
      morseCodeMap[char] || ""
    ).join(" ");
  };

  // Convert morse code to text
  const morseCodeToLetters = (code) => {
    return code.split(" ").map(symbol =>
      reverseMorseCodeMap[symbol] || ""
    ).join("");
  };

  // Play sound for a dot (short beep)
  const playDot = (audioCtx, startTime) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(700, startTime); // frequency in Hz
    gainNode.gain.setValueAtTime(0.1, startTime); // volume
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.1);
  };

  // Play sound for a dash (long beep)
  const playDash = (audioCtx, startTime) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(700, startTime);
    gainNode.gain.setValueAtTime(0.1, startTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.3);
  };

  // Play Morse code sound sequence
  const playSound = (code) => {
    if (!code) return;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let time = audioCtx.currentTime;

    for (const char of code) {
      if (char === ".") {
        playDot(audioCtx, time);
        time += 0.2;
      } else if (char === "-") {
        playDash(audioCtx, time);
        time += 0.4;
      } else {
        // space or slash: short pause
        time += 0.2;
      }
    }
  };

  // Encode button handler
  const handleEncode = () => {
    const encoded = lettersToMorseCode(text);
    setMorse(encoded);
    playSound(encoded);
  };

  // Decode button handler
  const handleDecode = () => {
    const decodedText = morseCodeToLetters(morse);
    setDecoded(decodedText);
  };

  return (
    <div style={container}>
      <h1>🎯 Mission: Morse Code – R2-D2 Needs You!</h1>
      <div style={twoColumnLayout}>
        {/* Left box: Morse Code Reader */}
        <div style={box}>
          <h2>Morse Code Encoder</h2>
          <textarea
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={inputBox}
          />
          <button onClick={handleEncode} style={button}>
            🔐 Encode & Play Sound
          </button>
          <p style={result}><strong>Morse Code:</strong> {morse}</p>
        </div>

        {/* Right box: Morse Code Decoder */}
        <div style={box}>
          <h2>Morse Code Decoder</h2>
          <textarea
            placeholder="Paste Morse code here..."
            value={morse}
            onChange={(e) => setMorse(e.target.value)}
            style={inputBox}
          />
          <button onClick={handleDecode} style={button}>
            🔓 Decode
          </button>
          <p style={result}><strong>Decoded Text:</strong> {decoded}</p>
        </div>
      </div>
    </div>
  );
};

export default Translator;
