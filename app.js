const contactForm = document.querySelector(".contact-form");

const formSettings = {
  // Formspreeで作成したフォームURLに差し替えてください。
  // 例: https://formspree.io/f/abcdwxyz
  endpoint: "https://formspree.io/f/mjgzakyq",
};

function setFormStatus(message, type = "info") {
  const status = contactForm?.querySelector(".form-status");
  if (!status) return;

  status.textContent = message;
  status.dataset.type = type;
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = contactForm.querySelector(".form-button");
  const originalText = button.textContent;

  if (formSettings.endpoint.includes("FORM_ID_HERE")) {
    setFormStatus("送信先の設定がまだ完了していません。FormspreeのフォームURLを設定してください。", "error");
    return;
  }

  button.textContent = "送信しています";
  button.disabled = true;
  setFormStatus("", "info");

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(formSettings.endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    setFormStatus("送信しました。内容を確認後、3日以内を目安にご連絡します。", "success");
  } catch (error) {
    setFormStatus("送信できませんでした。時間をおいてもう一度お試しください。", "error");
  } finally {
    button.textContent = originalText;
    button.disabled = false;
  }
});
