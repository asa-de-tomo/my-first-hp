const AUTH_PASSWORD = "🍓strawberry2026";
const AUTH_KEY = "shinyama-preview-authenticated";

if (sessionStorage.getItem(AUTH_KEY) === "true") {
  unlockPage();
} else {
  window.addEventListener("DOMContentLoaded", showAuthGate);
}

function showAuthGate() {
  const gate = document.createElement("div");
  gate.className = "auth-gate";
  gate.innerHTML = `
    <section class="auth-panel" role="dialog" aria-modal="true" aria-labelledby="authTitle">
      <p class="auth-eyebrow">Limited Preview</p>
      <h1 id="authTitle">新山いちご園<br />試作ページ</h1>
      <p class="auth-lead">このページは関係者確認用です。パスワードを入力してください。</p>
      <form class="auth-form">
        <label for="authPassword">パスワード</label>
        <input id="authPassword" name="password" type="password" autocomplete="current-password" inputmode="text" required />
        <button type="submit">ページを見る</button>
        <p class="auth-error" role="alert" aria-live="polite"></p>
      </form>
    </section>
  `;

  document.body.append(gate);

  const form = gate.querySelector(".auth-form");
  const input = gate.querySelector("#authPassword");
  const error = gate.querySelector(".auth-error");

  input.focus();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (input.value === AUTH_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      gate.remove();
      unlockPage();
      return;
    }

    input.value = "";
    input.focus();
    error.textContent = "パスワードが違います。もう一度入力してください。";
  });
}

function unlockPage() {
  document.documentElement.classList.remove("auth-pending");
}
