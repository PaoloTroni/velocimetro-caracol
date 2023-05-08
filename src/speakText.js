export function speakText(tiempoEstimadoViaje) {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  let voice = voices.find(
    (voice) => voice.voiceURI === "Google español de Estados Unidos"
  );
  if (!voice) {
    voice = voices[0];
  } // seleccionar la primera voz de la lista en caso no haya encontrado la voz correspondiente

  const utterance = new SpeechSynthesisUtterance(tiempoEstimadoViaje);
  utterance.voice = voice;
  synth.speak(utterance);
}

// En caso haya problemas, descomentar el código abajo para verificar lo que pasa

// window.addEventListener("DOMContentLoaded", () => {
//   const synth = window.speechSynthesis;
//   const voices = synth.getVoices();
//   console.log(voices);
// });

// if ("speechSynthesis" in window) {
//   console.log("API de síntesis de voz compatible");
// } else {
//   console.log("API de síntesis de voz no compatible");
// }

// const synth = window.speechSynthesis;
// let voices = [];

// if ("onvoiceschanged" in synth) {
//   synth.onvoiceschanged = () => {
//     voices = synth.getVoices();
//     console.log(voices);
//   };
// } else {
//   voices = synth.getVoices();
//   console.log(voices);
// }
