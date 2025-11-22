// ----------------------------
// GRAD ALBUM SCRIPT (FULL)
// ----------------------------

// ========== GRAD YEAR DROPDOWN ==========
const gradYearSelect = document.getElementById("gradYear");
[2026, 2027, 2028].forEach(y => {
  const opt = document.createElement("option");
  opt.value = y;
  opt.textContent = y;
  gradYearSelect.appendChild(opt);
});

// ========== LIVE NAME PREVIEW ==========
const first = document.getElementById("firstName");
const middle = document.getElementById("middleName");
const last = document.getElementById("lastName");

function updateNamePreview() {
  const full = `${first.value} ${middle.value ? middle.value + " " : ""}${last.value}`.trim();
  document.getElementById("namePreview").textContent = full || "Your Name";
  document.getElementById("namePreview2").textContent = full || "Your Name";
}

[first, middle, last].forEach(i => i.addEventListener("input", updateNamePreview));

// ========== STRAND PREVIEW ==========
const strandSelect = document.getElementById("strand");
strandSelect.addEventListener("change", () => {
  let v = strandSelect.value;
  document.getElementById("strandPreview").textContent = v || "";
  document.getElementById("strandPreview2").textContent = v || "";
});

// ========== CLASS YEAR PREVIEW ==========
gradYearSelect.addEventListener("change", () => {
  const y = gradYearSelect.value || "2026";
  document.getElementById("childOverlayText").textContent = "Class of " + y;
  document.getElementById("recentOverlayText").textContent = "Class of " + y;
});

// ========== PHOTO UPLOADS ==========
function loadImage(input, imgElement) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    imgElement.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById("childPhoto").addEventListener("change", () => {
  loadImage(document.getElementById("childPhoto"), document.getElementById("childPreviewImg"));
});

document.getElementById("recentPhoto").addEventListener("change", () => {
  loadImage(document.getElementById("recentPhoto"), document.getElementById("recentPreviewImg"));
});

// ========== QUOTE GENERATOR ==========
const openBtn = document.getElementById("openQuoteGenerator");
const closeBtn = document.getElementById("closeQuotesBtn");
const refreshBtn = document.getElementById("refreshQuotesBtn");
const quotePanel = document.getElementById("quoteGeneratorPanel");
const quoteList = document.getElementById("quoteList");
const quoteBox = document.getElementById("quote");

let refreshCount = 10;

openBtn.addEventListener("click", () => {
  quotePanel.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  quotePanel.style.display = "none";
});

// ========== QUOTE LIST ==========
const quotes = [
  "The future is mine to create.",
  "Small steps still move forward.",
  "Everything I am becoming matters.",
  "I didn’t come this far to only come this far.",
  "Watch me grow.",
  "Built from pressure.",
  "Better things begin here.",
  "My story just upgraded.",
  "Trust the process, even the slow parts.",
  "Dreams don’t work unless you do."
];

function loadQuotes() {
  quoteList.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    const div = document.createElement("div");
    div.className = "quote-item";
    div.textContent = q;

    div.addEventListener("click", () => {
      quoteBox.value = q;
      document.getElementById("quotePreview").textContent = `"${q}"`;
    });

    quoteList.appendChild(div);
  }
}

loadQuotes();

// Prevent refresh button from refreshing the whole page
refreshBtn.addEventListener("click", (e) => {
  e.preventDefault();   // ← THIS FIXES YOUR PROBLEM

  if (refreshCount <= 0) return;

  refreshCount--;
  document.getElementById("quotesLeft").textContent = refreshCount;

  loadQuotes();
});

// Update quote in preview live
quoteBox.addEventListener("input", () => {
  document.getElementById("quotePreview").textContent =
    quoteBox.value ? `"${quoteBox.value}"` : `"Your graduation quote"`;
});

