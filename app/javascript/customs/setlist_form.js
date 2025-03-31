document.addEventListener("DOMContentLoaded", (event) => {
  console.log("セットリスト登録フォーム用js");
  const addItemButton = document.getElementById("add_setlist_item");

  // 「曲を追加」ボタンにイベントを設定
  addItemButton.addEventListener("click", (event) => {
    console.log("楽曲追加ボタンが押された");
    const newItemForm = document.getElementById("template_setlist_item");
    console.log(newItemForm);
  });
});
