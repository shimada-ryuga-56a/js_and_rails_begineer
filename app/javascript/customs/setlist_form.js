// document.addEventListener("turbo:load", setupRemoveButton);
// document.addEventListener("turbo:load", setupAddItemButton);
// document.addEventListener("turbo:render", setupRemoveButton);
// document.addEventListener("turbo:render", setupAddItemButton);

document.addEventListener("turbo:load", setupAddItemButton);
document.addEventListener("turbo:load", setupRemoveButton);
document.addEventListener("turbo:render", setupAddItemButton);
document.addEventListener("turbo:render", setupRemoveButton);
document.addEventListener("turbo:render", cleanupItemFormIDs);

function setupRemoveButton() {
  const setlistItemsContainer = document.getElementById("setlist_items_container");
  if (!setlistItemsContainer) {
    console.log("セットリスト登録において必要な要素が見つかりません");
    return;
  }

  setlistItemsContainer.addEventListener("click", (event) => {
    if (event.target.id.startsWith("remove_setlist_item_")) {
      event.preventDefault();
      const itemFormToRemove = event.target.parentElement;
      itemFormToRemove.remove();
      cleanupItemFormIDs();
    } else {
      console.log("削除ボタンが無効かも！");
    }
  });
}

function setupAddItemButton() {
  const addButtonContainer = document.getElementById("add-button-container");
  if (!addButtonContainer) {
    console.log("セットリスト登録において必要な要素が見つかりません");
    return;
  }
  console.log("setupAddItemButtonが呼ばれました");
  addButtonContainer.addEventListener("click", (event) => {
    console.log("setupAddItemButtonのイベントが発火しました");
    if (event.target.id === "add_setlist_item") {
      event.preventDefault();
      addSetlistItemForm();
    }
  });
  addButtonContainer.setAttribute("id", "setup-add-button-container");
}

function cleanupItemFormIDs() {
  const setlistItemForms = document.querySelectorAll('[id^="setlist_setlist_items_attributes_"][id$="_song_title"]');
  if (setlistItemForms.length === 0) {
    console.log("セットリストアイテムフォームが見つかりません");
    return;
  }

  setlistItemForms.forEach((form, index) => {
    if (setlistItemForms.length === index + 1) {
      console.log("templateのため処理をスキップ");
      return;
    }
    form.setAttribute("id", `setlist_setlist_items_attributes_${index}_song_title`)
    form.setAttribute("name", `setlist[setlist_items_attributes][${index}][song_title]`)
  });
}

function addSetlistItemForm() {
  const container = document.getElementById("setlist_items_container");
  const itemFormTemplate = document.getElementById("template_setlist_item");
  if (!container || !itemFormTemplate) {
    console.log("フォーム追加のためのアイテムが見つかりません");
    return;
  }
  const itemFormClone = itemFormTemplate.children[0].cloneNode(true);
  itemFormClone.children[1].setAttribute("id", "setlist_setlist_items_attributes__song_title");
  container.appendChild(itemFormClone);
  cleanupItemFormIDs();
}