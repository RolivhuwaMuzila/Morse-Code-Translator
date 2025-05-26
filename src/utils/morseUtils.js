const morseCodeMap = {
  A: ".-",     B: "-...",   C: "-.-.",  D: "-..",
  E: ".",      F: "..-.",   G: "--.",   H: "....",
  I: "..",     J: ".---",   K: "-.-",   L: ".-..",
  M: "--",     N: "-.",     O: "---",   P: ".--.",
  Q: "--.-",   R: ".-.",    S: "...",   T: "-",
  U: "..-",    V: "...-",   W: ".--",   X: "-..-",
  Y: "-.--",   Z: "--..",
  0: "-----",  1: ".----",  2: "..---", 3: "...--",
  4: "....-",  5: ".....",  6: "-....", 7: "--...",
  8: "---..",  9: "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..",
  "!": "-.-.--", "-": "-....-", "/": "-..-.",
  "(": "-.--.", ")": "-.--.-", "'": ".----.",
  " ": "/"
};

const reverseMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

export const lettersToMorseCode = (text) => {
  return text.toUpperCase().split("")
    .map(char => morseCodeMap[char] || "?")  // use ? for unknown chars
    .join(" ");
};

// Decode Morse code string to letters
export const morseCodeToLetters = (code) => {
  return code.trim()
    .split(" ")  // split by space (letter separator)
    .map(symbol => {
      if (symbol === "/") return " ";  // treat / as space between words
      return reverseMap[symbol] || "?"; // ? for unknown sequences
    })
    .join("");
};
