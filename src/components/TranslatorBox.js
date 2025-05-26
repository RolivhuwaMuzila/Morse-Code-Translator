import React, { useState } from 'react';
import { lettersToMorseCode, morseCodeToLetters } from '../utils/morseUtils';
import './TranslatorBox.css';

// ✅ Use a reliable online beep
const beep = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

export default function TranslatorBox() {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');

  const playBeep = () => {
    beep.currentTime = 0;
    beep.play().catch(err => {
      console.warn('Beep failed to play:', err);
    });
  };

  const handleEncrypt = () => {
    if (!text.trim()) return;
    const morseResult = lettersToMorseCode(text);
    setMorse(morseResult);
    playBeep(); // simple feedback
  };

  const handleDecrypt = () => {
    if (!morse.trim()) return;
    const decoded = morseCodeToLetters(morse);
    setText(decoded);
  };

  return (
    <div className="translator-wrapper">
      <div className="box">
        <h3>📤 Encode</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to Morse"
        />
        <button onClick={handleEncrypt} disabled={!text.trim()}>
          🔐 Encrypt
        </button>
      </div>

      <div className="box">
        <h3>📥 Decode</h3>
        <textarea
          value={morse}
          onChange={(e) => setMorse(e.target.value)}
          placeholder="Enter Morse code to decode"
        />
        <button onClick={handleDecrypt} disabled={!morse.trim()}>
          🔓 Decrypt
        </button>
      </div>
    </div>
  );
}

