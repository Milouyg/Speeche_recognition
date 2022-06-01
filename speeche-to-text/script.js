const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const message = document.getElementById("message");
const output = document.getElementById("result");
const image1 = document.getElementById("image1");

startRecognition = () => {
  if (SpeechRecognition !== undefined) { // test if speechrecognitio is supported
    let recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL'; // which language is used?
    recognition.interimResults = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
    recognition.continuous = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous

    recognition.onstart = () => {
      message.innerHTML = `Ik luister, praat in de microfoon alsjeblieft<br>Zeg"help me" voor help`;
      output.classList.add("hide"); // hide the output
    };

    recognition.onspeechend = () => {
      message.innerHTML = `Ik ben gestop met luisteren `;
      recognition.stop();
    };

    recognition.onresult = (result) => {
      let transcript = result.results[0][0].transcript;
      let confidenceTranscript = Math.floor(result.results[0][0].confidence * 100); // calc. 'confidence'
      output.classList.remove("hide"); // show the output
      output.innerHTML = `Ik ben ${confidenceTranscript}% zeker dat je dit zei: <b>${transcript}</b>`;
      actionSpeech(transcript);
    };

    recognition.start();
  }
  else {  // speechrecognition is not supported
    message.innerHTML = "sorry speech to text support deze browser niet";
  }
};

// process speech results
actionSpeech = (speechText) => {
  speechText = speechText.toLowerCase().trim(); // trim spaces + to lower case
  console.log(speechText); // debug 
  switch (speechText) {
    // switch evaluates using stric comparison, ===
    case "milou":
      message.innerHTML = "Hallo Milou";
      document.body.style.background = "#B8FFF9";
      window.open("https://www.linkedin.com/", "_self");
      break;
    case "reset":
      document.body.style.background = "#ffe6ab";
      document.body.style.color = "#000000";
      image1.classList.add("hide"); // hide image (if any)
      break;
    case "albert heijn":
      window.open("https://www.ah.nl/", "_self");// opent in dezelfde _self pagina
      break;
    case "image": // let op, "fall-through"
    case "product": // let op, "fall-through"
      image1.src = "img/logo.png";
      image1.style.width = "400px";
      image1.classList.remove("hide") // show image
      break;
    case "help me":
      alert("Kan alleen de commando's: Milou, Albert Heijn en product uitvoeren");
      break;
    default:
    // do nothing yet
  }
}