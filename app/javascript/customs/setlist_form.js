document.addEventListener("turbo:load", setupAddItemButton, console.log("turbo:load"));
document.addEventListener("turbo:render", setupAddItemButton, console.log("turbo:render"));

function setupAddItemButton() {
  let count = 0;
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
  addItemButton.addEventListener("click", addItemform);

  function counter() {
    count++;
    return count;
  }

  function addItemform() {
    const itemFormClone = itemForm.children[0].cloneNode(true);
    itemFormClone.children[1].setAttribute("name", `setlist[setlist_items_attributes][${count}][song_title]`);
    itemFormClone.children[1].setAttribute("id", `setlist_setlist_items_attributes_${count}_song_title`);
    console.log(itemFormClone);
    setlistItemContainer.appendChild(itemFormClone);
  }
};
