import { BASE_URL } from "./config.js";
const definitionSection = document.querySelector(".definitions");
export const searchForm = document.querySelector("form.search__form");
export const errorMessageSpan = document.querySelector(
  ".search__input__validation-message"
);
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const wordInput = event.target["word"];
  wordInput.addEventListener("input", () => {
    removeSearchInputValidationMessages(wordInput);
  });
  const wordInputVal = wordInput.value;
  if (!setSearchInputValidationMessages(wordInput)) {
    return;
  }
  const data = await getWordDefinitionAsync(wordInputVal);
  clearWordHead();
  const { word, meanings, phonetics } = data[0];
  setWordHead(word, phonetics);
});

async function getWordDefinitionAsync(word) {
  const response = await fetch(`${BASE_URL}${word}`);
  const wordData = await response.json();
  return wordData;
}

function setWordHead(word, phonetics) {
  const definitionHead = definitionSection.querySelector(".definitions__head");
  const h1 = document.createElement("h1");
  phonetics = phonetics.filter((phonetic) => phonetic.audio !== "");
  h1.innerText = word;
  definitionHead.appendChild(h1);
  for (const phonetic of phonetics) {
    const phoneticAndAudioDiv = setPhoneticAndAudio(phonetic);
    phoneticAndAudioDiv.classList.add("phonetic-and-audio");
    definitionHead.appendChild(phoneticAndAudioDiv);
  }
}

function clearWordHead() {
  const definitionHead = definitionSection.querySelector(".definitions__head");
  definitionHead.innerHTML = "";
}

function setWordPhonetic(phoneticText) {
  const phoneticSpan = document.createElement("span");
  phoneticSpan.innerText = phoneticText;
  phoneticSpan.classList.add("phonetic-and-audio__text");
  return phoneticSpan;
}

function setWordAudio(phoneticAudioLink) {
  const playButton = document.createElement("div");
  const playButtonWrapper = document.createElement("div");
  playButtonWrapper.appendChild(playButton);
  playButtonWrapper.classList.add("play-button--wrapper");
  playButton.classList.add("play-button");
  const audioEl = document.createElement("audio");
  audioEl.src = phoneticAudioLink;
  playButton.addEventListener("click", () => {
    audioEl.play();
  });
  return playButtonWrapper;
}
function setPhoneticAndAudio(phonetic) {
  const phoneticAndAudioDiv = document.createElement("div");
  const phoneticSpan = setWordPhonetic(phonetic.text);
  const audioEl = setWordAudio(phonetic.audio);
  phoneticAndAudioDiv.appendChild(phoneticSpan);
  phoneticAndAudioDiv.appendChild(audioEl);
  return phoneticAndAudioDiv;
}

function setSearchInputValidationMessages(input) {
  if (input.value.length < 1) {
    errorMessageSpan.innerText = "Please enter a word";
    errorMessageSpan.classList.remove(
      "search__input__validation-message--hidden"
    );
    errorMessageSpan.classList.add(
      "search__input__validation-message--visible"
    );
    input.classList.add("search__input--invalid");
    return false;
  }
}
function removeSearchInputValidationMessages(input) {
  if (
    input.classList.contains("search__input--invalid") &&
    input.value.length > 0
  ) {
    errorMessageSpan.classList.remove(
      "search__input__validation-message--visible"
    );
    errorMessageSpan.classList.add("search__input__validation-message--hidden");
    input.classList.remove("search__input--invalid");
  }
}
