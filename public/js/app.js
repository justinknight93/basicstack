const documentReady = (fn) => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

documentReady(() => {
  // Loads the inner HTML from the API for every element with the data-api-inner attribute.
  handleInnerFromApi();
});

handleInnerFromApi = () => {
  // For every tag with the data-api-inner attribute, get the inner text from the API.
  const elements = document.querySelectorAll("[data-api-inner]");
  elements.forEach((element) => {
    const targetData = element.getAttribute("data-api-inner");
    fetch(`/api/inner/id=${targetData}`).then((response) => {
      response.text().then((text) => {
        element.innerHTML = text;
      });
    });
  });
};
