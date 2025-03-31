let count = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("セットリスト登録フォーム用js");
  const addItemButton = document.getElementById("add_setlist_item");
  const setlistItemContainer = document.getElementById("setlist_items_container");
  const itemForm = document.getElementById("template_setlist_item");

  // 「曲を追加」ボタンにイベントを設定
  addItemButton.addEventListener("click", (event) => {
    console.log("楽曲追加ボタンが押された");
    counter();
    const itemFormClone = itemForm.children[0].cloneNode(true);
    itemFormClone.children[1].setAttribute("name", `setlist[setlist_items_attributes][${count}][song_title]`);
    itemFormClone.children[1].setAttribute("id", `setlist_setlist_items_attributes_${count}_song_title`);
    console.log(itemFormClone);
    setlistItemContainer.appendChild(itemFormClone);
  });

  function counter() {
    count++;
    return count;
  }
});
