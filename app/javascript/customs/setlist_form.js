document.addEventListener("turbo:load", setupRemoveButton);
document.addEventListener("turbo:load", setupAddItemButton);
document.addEventListener("turbo:render", setupRemoveButton);
document.addEventListener("turbo:render", setupAddItemButton);

function setupAddItemButton() {
  const itemForms = document.querySelectorAll("[id^='setlist_setlist_items_attributes_'][id$='_song_title']");
  const lastItemForm = itemForms[itemForms.length - 2];
  const lastItemFormId = lastItemForm ? lastItemForm.id : null;
  const lastItemFormIndex = lastItemFormId ? parseInt(lastItemFormId.match(/\d+/)[0]) : null;
  let count = lastItemFormIndex;
  console.log("セットリスト登録フォーム用js");
  const addItemButton = document.getElementById("add_setlist_item");
  const setlistItemContainer = document.getElementById("setlist_items_container");
  const itemForm = document.getElementById("template_setlist_item");

  if (!addItemButton || !setlistItemContainer || !itemForm) {
    console.log("必要な要素が見つかりません");
    return;
  }

  if (addItemButton.getAttribute("id") === "add_item_button") {
    console.log("ボタンがすでに設定されています");
    return;
  } else {
    console.log("ボタンが設定されていません");
    addItemButton.setAttribute("id", "add_item_button");
  }

  // 「曲を追加」ボタンにイベントを設定
  addItemButton.addEventListener("click", () => {
    counter();
    console.log("カウント", count);
    const itemFormClone = itemForm.children[0].cloneNode(true);
    itemFormClone.children[1].setAttribute("name", `setlist[setlist_items_attributes][${count}][song_title]`);
    itemFormClone.children[1].setAttribute("id", `setlist_setlist_items_attributes_${count}_song_title`);

    const removeButton = itemFormClone.querySelector("[id^='remove_setlist_item']");
    removeButton.setAttribute("id", `remove_setlist_item_${count}`);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      const itemFormToRemove = removeButton.parentElement;
      itemFormToRemove.remove();
      console.log("削除ボタンが押されました");
    });
    console.log(itemFormClone);
    setlistItemContainer.appendChild(itemFormClone);
  });

  function counter() {
    count++;
    return count;
  }
};

function setupRemoveButton() {
  console.log("removeButton");
  const removeButtons = document.querySelectorAll("[id^='remove_setlist_item_']");
  console.log(removeButtons);
  removeButtons.forEach((removeButton, index) => {
    removeButton.setAttribute("id", `remove_setlist_item_${index}`);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      const itemFormToRemove = removeButton.parentElement;
      itemFormToRemove.remove();
      console.log("削除ボタンが押されました");
    });
  });
};