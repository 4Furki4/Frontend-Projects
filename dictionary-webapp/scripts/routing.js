export function handleLocation() {
  const path = window.location.pathname;
  return path.slice(1);
}

export function route(wordInputVal) {
  window.history.pushState({}, "", `/${wordInputVal}`);
}
