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
  clearWordDefinitions();
  const { word, meanings, phonetics } = data[0];
  setWordHead(word, phonetics);
  setWordBody(meanings);
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

function clearWordDefinitions() {
  clearWordHead();
  clearWordBody();
}

function clearWordHead() {
  const definitionHead = definitionSection.querySelector(".definitions__head");
  definitionHead.innerHTML = "";
}
function clearWordBody() {
  const definitionBody = definitionSection.querySelector(".definitions__body");
  definitionBody.innerHTML = "";
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
  return true;
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

function setWordBody(meanings) {
  const definitionsBody = definitionSection.querySelector(".definitions__body");
  for (const meaning of meanings) {
    const { partOfSpeech, definitions, synonyms } = meaning;
    setPartOfSpeech(partOfSpeech, definitionsBody);
    setDefinitions(definitions, definitionsBody);
    setSynonyms(synonyms, definitionsBody);
  }
  definitionSection.appendChild(definitionsBody);
}
function setPartOfSpeech(partOfSpeech, divToAppend) {
  const partOfSpeechHeader = document.createElement("h2");
  partOfSpeechHeader.innerText = partOfSpeech;
  partOfSpeechHeader.classList.add("part-of-speech");
  divToAppend.appendChild(partOfSpeechHeader);
}

function setDefinitions(definitions, divToAppend) {
  const definitionList = document.createElement("ul");
  definitionList.classList.add("definition-list");
  for (const definition of definitions) {
    const definitionElement = document.createElement("li");
    definitionElement.innerText = definition.definition;
    definitionList.appendChild(definitionElement);
  }
  divToAppend.appendChild(definitionList);
}
function setSynonyms(synonyms, divToAppend) {
  for (const synonym of synonyms) {
    const synonymParagraph = document.createElement("p");
    synonymParagraph.innerText = synonym;
    divToAppend.appendChild(synonymParagraph);
  }
}
