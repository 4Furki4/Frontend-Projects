export const navDropdown = document.querySelector(".nav__dropdown");
export const navDropdownList = document.querySelector(".nav__dropdown__list");
const selectedFontSpan = document.querySelector("#selected__font");
const navDropdownListItems = document.querySelectorAll(
  ".nav__dropdown__list__item"
);

for (const listItem of navDropdownListItems) {
  listItem.addEventListener("click", () => {
    if (listItem.innerText === "Mono") {
      setSelectedFontFamily("Inconsolata");
      selectedFontSpan.innerText = "Mono";
    } else if (listItem.innerText === "Sans Serif") {
      setSelectedFontFamily("Inter");
      selectedFontSpan.innerText = "Sans Serif";
    } else {
      setSelectedFontFamily("Lora");
      selectedFontSpan.innerText = "Serif";
    }
  });
}

function setSelectedFontFamily(fontFamily) {
  document.documentElement.style.setProperty("--font-family", fontFamily);
}
