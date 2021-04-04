function check() {
  // 表示されている全てのメモを取得
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした時に実行する処理を定義
    post.addEventListener("click", () => {
      // どのメモをクリックしたのかをカスタムデータを利用して取得
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのタイプを指定
      XHR.responseType = "json";
      // sendでリクエストを送信
      XHR.send();
      // レスポンスを受け取った時の処理を記述
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスの HTTPステータスを解析し、該当するエラーメッセージをアラートで表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了
          return null;
        }
        // レスポンスされたデータを変数 item に代入
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);