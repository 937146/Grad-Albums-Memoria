document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------
     IMAGE PREVIEW HANDLERS
  ---------------------------*/
  function setupImagePreview(inputId, imgId) {
    const input = document.getElementById(inputId);
    const img = document.getElementById(imgId);

    if (!input || !img) return;

    input.addEventListener("change", () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => (img.src = reader.result);
      reader.readAsDataURL(file);
    });
  }

  setupImagePreview("childPhoto", "childPreview");
  setupImagePreview("recentPhoto", "recentPreview");

  /* --------------------------
     QUOTE GENERATOR LOGIC
  ---------------------------*/
  const openBtn = document.getElementById("openQuoteGenerator");
  const panel = document.getElementById("quoteGeneratorPanel");
  const list = document.getElementById("quoteList");
  const refreshBtn = document.getElementById("refreshQuotesBtn");
  const closeBtn = document.getElementById("closeQuotesBtn");
  const quoteBox = document.getElementById("quote");

  let refreshCount = 10;

  const QUOTES = [
    "The future belongs to those who believe in the beauty of their dreams.",
    "This is not the end, but a new beginning.",
    "Dream big, work hard, stay humble.",
    "The best view comes after the hardest climb.",
    "Go confidently in the direction of your dreams.",
    "Success is not final; failure is not fatal.",
    "Your journey is just beginning.",
    "Make today so awesome that yesterday gets jealous.",
    "Every accomplishment starts with the decision to try.",
    "If you can dream it, you can do it.",
    "Your potential is endless.",
    "Be fearless in the pursuit of what sets your soul on fire.",
    "Do something today that your future self will thank you for.",
    "The world is yours—go take it.",
    "Your story is just starting."
  ];

  function generateQuotes() {
    list.innerHTML = "";

    const set = [];

    // randomly choose 7 quotes
    while (set.length < 7) {
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      if (!set.includes(q)) set.push(q);
    }

    // print the quotes
    set.forEach(q => {
      const p = document.createElement("p");
      p.className = "quote-item";
      p.textContent = q;

      p.addEventListener("click", () => {
        quoteBox.value = q;
      });

      list.appendChild(p);
    });
  }

  // OPEN generator
  openBtn.addEventListener("click", () => {
    panel.style.display = "block";
    generateQuotes();
  });

  // CLOSE generator
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
  });

  // REFRESH quotes **without reloading page**
  refreshBtn.addEventListener("click", (e) => {
    e.preventDefault(); // ← prevents page refresh

    if (refreshCount <= 0) return;
    refreshCount--;

    document.getElementById("quotesLeft").textContent = refreshCount;

    generateQuotes();
  });

  /* --------------------------
      FORM SUBMIT (Preview)
  ---------------------------*/
  document.getElementById("gradForm").addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Your card is generated and shown on the right!");
  });
});
