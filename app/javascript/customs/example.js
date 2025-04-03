document.addEventListener("turbo:load", () => {
  initializeExamples();
  initializeDeleteButtons();
});

function initializeExamples() {
  const examples = document.querySelectorAll('[id^="example-"]');
  examples.forEach((example, index) => {
    example.setAttribute("id", `example-${index}`);
  });
}

function initializeDeleteButtons() {
  const deleteButtons = document.querySelectorAll('[id^="delete-example-"]');
  deleteButtons.forEach((button, index) => {
    button.setAttribute("id", `delete-example-${index}`);
    button.addEventListener("click", () => {
      const id = index;
      deleteExample(id);
      initializeExamples();
      initializeDeleteButtons();
    });
  })
}

function deleteExample(exampleId) {
  const exampleForDelete = document.getElementById(`example-${exampleId}`);
  exampleForDelete.remove();
}