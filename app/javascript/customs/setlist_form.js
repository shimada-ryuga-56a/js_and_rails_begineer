// document.addEventListener("turbo:load", setupRemoveButton);
// document.addEventListener("turbo:load", setupAddItemButton);
// document.addEventListener("turbo:render", setupRemoveButton);
// document.addEventListener("turbo:render", setupAddItemButton);

document.addEventListener("turbo:load", setupAddItemButton);
document.addEventListener("turbo:load", setupRemoveButton);
document.addEventListener("turbo:load", cleanupItemFormIDs);
document.addEventListener("turbo:load", moveHiddenSetlistItemForm);
document.addEventListener("turbo:render", setupAddItemButton);
document.addEventListener("turbo:render", setupRemoveButton);
document.addEventListener("turbo:render", cleanupItemFormIDs);

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
  setupArrowButtons();
}

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
      setupHiddenIdForms();
    } else {
      console.log("削除ボタンが無効かも！");
    }
  });
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

  const setlistItemIds = document.querySelectorAll('[id^="setlist_item_"]');
  if (setlistItemIds.length === 0) {
    console.log("セットリストアイテムIDが見つかりません");
    return;
  }
  setlistItemIds.forEach((item, index) => {
    if (setlistItemIds.length === index + 1) {
      console.log("templateのため処理をスキップ");
      return;
    }
    item.setAttribute("id", `setlist_item_${index}`);
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

function moveHiddenSetlistItemForm(){
  const hidden_forms = document.querySelectorAll('[id^="setlist_setlist_items_attributes_"][id$="_id"]');
  if (hidden_forms.length === 0) {
    console.log("隠しフォームが見つかりません");
    return;
  }
  hidden_forms.forEach((form, index) => {
    // formのsetlist_setlist_items_attributes_と_idの間の部分を取得
    const id = form.id.split("_").slice(4, -1).join("_");
    const parentDiv = document.getElementById(`setlist_item_${id}`);
    if (!parentDiv) {
      console.log("親要素が見つかりません");
      return;
    }
    const childrenClone = form.cloneNode(true);
    console.log(childrenClone);
    parentDiv.appendChild(childrenClone);
    form.remove();
  });
}

function setupHiddenIdForms() {
  const hiddenItemIds = document.querySelectorAll('[id^="setlist_setlist_items_attributes_"][id$="_id"]');
  if (hiddenItemIds.length === 0) {
    console.log("隠しフォームが見つかりません");
    return;
  }
  hiddenItemIds.forEach((form) => {
    const parentDiv = form.parentElement;
    const id = parentDiv.id.split("_").slice(2).join("_");
    form.setAttribute("id", `setlist_setlist_items_attributes_${id}_id`);
    form.setAttribute("name", `setlist[setlist_items_attributes][${id}][id]`);
  });
}

function setupArrowButtons() {
  const setlistItemsContainer = document.getElementById("setlist_items_container");
  if (!setlistItemsContainer) {
    console.log("セットリスト登録において必要な要素が見つかりません");
    return;
  }

  setlistItemsContainer.addEventListener("click", (event) => {
    console.log("setupArrowButtonsのイベントが発火しました");
    console.log("event.target.id", event.target.id);
    if (event.target.id.startsWith("items_up")) {
      event.preventDefault();
      const itemFormToUp = event.target.parentElement;
      const itemFormToDown = itemFormToUp.previousElementSibling;
      if (!itemFormToDown) {
        console.log("上に移動できません");
        return;
      }
      const parentDiv = itemFormToUp.parentElement;
      parentDiv.insertBefore(itemFormToUp, itemFormToDown);
      cleanupItemFormIDs();
      setupHiddenIdForms();
    } else if (event.target.id.startsWith("items_down")) {
      event.preventDefault();
      const itemFormToDown = event.target.parentElement;
      const itemFormToUp = itemFormToDown.nextElementSibling;
      if (!itemFormToUp) {
        console.log("下に移動できません");
        return;
      }
      const parentDiv = itemFormToDown.parentElement;
      console.log("parentDiv", parentDiv);
      parentDiv.insertBefore(itemFormToUp, itemFormToDown);
      cleanupItemFormIDs();
      setupHiddenIdForms();
    }
  })
}