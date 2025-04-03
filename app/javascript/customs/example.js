document.addEventListener("turbo:load", () => {
  initializeAddButton();
  initializeExamples();
  initializeDeleteButtons();
});

function initializeAddButton() {
  const addButton = document.getElementById("add-example-button");
  if (!addButton) {
    console.log("addButtonが見つかりません");
    return;
  }
  addButton.addEventListener("click", () => {
    const examplesContainer = document.getElementById("examples-container");
    const exampleTemplate = document.getElementById("template-example");
    const exampleClone = exampleTemplate.cloneNode(true);
    exampleClone.setAttribute("id", `example-new`);
    exampleClone.children[1].setAttribute("id", "delete-example");
    examplesContainer.appendChild(exampleClone);

    initializeExamples();
  });
}

function initializeExamples() {
  const examples = document.querySelectorAll('[id^="example-"]');
  examples.forEach((example, index) => {
    example.setAttribute("id", `example-${index}`);
  });
}

function initializeDeleteButtons() {
  const examplesContainer = document.getElementById("examples-container");
  examplesContainer.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.id.startsWith("delete-example")) {
      event.target.parentElement.remove();
      initializeExamples();
    }
  });
}