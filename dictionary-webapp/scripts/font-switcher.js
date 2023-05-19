export const navDropdown = document.querySelector(".nav__dropdown");
export const navDropdownList = document.querySelector(".nav__dropdown__list");
const navDropdownListItems = document.querySelectorAll(
  ".nav__dropdown__list__item"
);

for (const listItem of navDropdownListItems) {
  listItem.addEventListener("click", () => {
    if (listItem.innerText === "Mono") {
      setSelectedFontFamily("Inconsolata");
    } else if (listItem.innerText === "Sans Serif") {
      setSelectedFontFamily("Inter");
    } else {
      setSelectedFontFamily("Lora");
    }
  });
}

function setSelectedFontFamily(fontFamily) {
  document.documentElement.style.setProperty("--font-family", fontFamily);
}
