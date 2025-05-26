import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="intro-box">
        <h1 className="title">🚀 Morse Code Translator – R2-D2!</h1>

        <section className="section briefing">
          <h2>🧪 Secret Agent Briefing</h2>
          <p>
            🚨 The Rebel Alliance intercepted a message from the Empire… but it's in Morse Code!
          </p>
          <p>
            💡 Your mission, young Padawan, is to build a Morse Code Translator so R2-D2 can decode the message — and maybe send encrypted jokes to C-3PO.
          </p>
        </section>

        <section className="section goals">
          <h2>🎯 Translator Goals</h2>
          <ul>
            <li>📤 Encrypt messages into Morse code</li>
            <li>📥 Decode Morse code into plain text</li>
            <li>🔊 Hear R2-D2-style beeps as feedback</li>
          </ul>
        </section>

        <section className="section use-cases">
          <h2>🎮 Fun Use Cases</h2>
          <ul>
            <li>🔒 Send encrypted love notes</li>
            <li>👻 Confuse your friends in chat</li>
            <li>💥 Hide spoilers</li>
          </ul>
        </section>

        <section className="section morse-info">
          <h2>❓ What is Morse Code?</h2>
          <p>
            Morse Code is an alphabet or code in which letters are represented by combinations of long and short light or sound signals.
          </p>
          <p>
            Invented in the 1830s, it was used extensively for telegraph communication and still serves as a clever way to send secret messages using dots (short signals) and dashes (long signals).
          </p>
          <p>
            This translator helps you convert back and forth between plain text and Morse Code — just like a secret agent or a friendly droid!
          </p>
        </section>

        <div className="button-container">
          <Link to="/translate">
            <button className="start-button">💬 Start Translating</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
