import { BASE_URL } from "./config.js";
const definitionSection = document.querySelector(".definitions");
export const searchForm = document.querySelector("form.search__form");
export const errorMessageSpan = document.querySelector(
  ".search__input__validation-message"
);
const spinner = document.querySelector(".lds-dual-ring");
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
  spinner.classList.add("active");
  const data = await getWordDefinitionAsync(wordInputVal);
  clearWordDefinitions();
  spinner.classList.remove("active");
  if (data.length > 1) {
    const { word, phonetics } = data[0];
    setWordHead(word, phonetics);
    for (const datum of data) {
      const { meanings, sourceUrls } = datum;
      setWordBody(meanings, sourceUrls);
    }
  } else {
    const { word, meanings, phonetics, sourceUrls } = data[0];
    setWordHead(word, phonetics);
    setWordBody(meanings, sourceUrls);
  }
  searchForm.reset();
});

async function getWordDefinitionAsync(word) {
  const URL = `${BASE_URL}${word}`;
  const response = await fetch(URL);
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
  const phoneticSpan = setWordPhonetic(phonetic.text ?? "---");
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

function setWordBody(meanings, sourceUrls) {
  const definitionsBody = definitionSection.querySelector(".definitions__body");
  for (const meaning of meanings) {
    const { partOfSpeech, definitions, synonyms } = meaning;
    setPartOfSpeech(partOfSpeech, definitionsBody);
    const meaningsTitle = document.createElement("h3");
    meaningsTitle.innerText = "Meaning";
    meaningsTitle.classList.add("definitions__title");
    definitionsBody.appendChild(meaningsTitle);
    setDefinitions(definitions, definitionsBody);
    setSynonyms(synonyms, definitionsBody);
  }
  setWordSource(sourceUrls, definitionsBody);
  definitionSection.appendChild(definitionsBody);
}
function setWordSource(sourceUrls, divToAppend) {
  const sourceDiv = document.createElement("div");
  sourceDiv.classList.add("sources");
  for (const sourceUrl of sourceUrls) {
    const sourceParagraph = document.createElement("p");
    const sourceAnchor = document.createElement("a");
    const windowIconImg = document.createElement("img");
    windowIconImg.src = "./icon-new-window.svg";
    windowIconImg.alt = "new window icon";
    windowIconImg.classList.add("new-window-icon");
    sourceAnchor.href = sourceUrl;
    sourceAnchor.target = "_blank";
    sourceAnchor.appendChild(windowIconImg);
    sourceParagraph.innerText = `${sourceUrl}`;
    sourceParagraph.classList.add("source");
    sourceParagraph.appendChild(sourceAnchor);
    sourceDiv.appendChild(sourceParagraph);
  }
  divToAppend.appendChild(sourceDiv);
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
    const definitionHasExample = definition.example !== undefined;
    if (definitionHasExample) {
      const exampleParagraph = document.createElement("p");
      exampleParagraph.innerHTML = `<q>${definition.example}</q>`;
      exampleParagraph.classList.add("example");
      definitionElement.appendChild(exampleParagraph);
    }
    definitionList.appendChild(definitionElement);
  }
  divToAppend.appendChild(definitionList);
}
function setSynonyms(synonyms, divToAppend) {
  let synonymsString = synonyms.join(", ");
  if (synonymsString !== "") {
    const synonymParagraph = document.createElement("span");
    synonymParagraph.innerText = synonymsString;
    synonymParagraph.classList.add("synonym");
    divToAppend.appendChild(synonymParagraph);
  }
}
