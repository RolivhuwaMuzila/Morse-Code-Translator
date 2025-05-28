import React, { useState } from 'react';
import { lettersToMorseCode, morseCodeToLetters } from '../utils/morseUtils';
import './TranslatorBox.css';

const beep = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

export default function TranslatorBox() {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');
  const [error, setError] = useState('');

  const playBeep = () => {
    beep.currentTime = 0;
    beep.play().catch(err => {
      console.warn('Beep failed to play:', err);
    });
  };

  const handleEncrypt = () => {
    if (!text.trim()) {
      setError("Please enter plain text to encrypt.");
      return;
    }

    const containsMorse = /^[.\-/\s]+$/.test(text.trim());
    if (containsMorse) {
      setError("Morse code detected. Please use the Decode section.");
      return;
    }

    const morseResult = lettersToMorseCode(text);
    setMorse(morseResult);
    setError('');
    playBeep();
  };

  const handleDecrypt = () => {
    if (!morse.trim()) {
      setError("Please enter Morse code to decrypt.");
      return;
    }

    const decoded = morseCodeToLetters(morse);
    setText(decoded);
    setError('');
  };

  const clearText = () => {
    setText('');
    setMorse('');
    setError('');
  };

  return (
    <div className="translator-wrapper">
      <h1 className="title"> Morse Code – R2-D2 Translator</h1>

      <div className="translator-grid">
        <div className="box encode-box">
          <h3>📤 Encode (Text ➡️ Morse)</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter plain text to convert to Morse"
          />
          <button onClick={handleEncrypt} disabled={!text.trim()}>
            🔐 Encrypt
          </button>
        </div>

        <div className="box decode-box">
          <h3>📥 Decode (Morse ➡️ Text)</h3>
          <textarea
            value={morse}
            onChange={(e) => setMorse(e.target.value)}
            placeholder="Enter Morse code to convert to text"
          />
          <button onClick={handleDecrypt} disabled={!morse.trim()}>
            🔓 Decrypt
          </button>
        </div>
      </div>

      {error && <p className="error-message">⚠️ {error}</p>}

      <div className="clear-box">
        <button onClick={clearText} className="clear-button">
          🧹 Clear All
        </button>
      </div>

      <footer className="footer">
        <p>🔁 Morse Code Translator | Built with ❤️ by Rolly</p>
      </footer>
    </div>
  );
}
