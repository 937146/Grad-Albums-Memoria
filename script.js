// -------------------------
// GRADUATION QUOTE GENERATOR
// -------------------------

let quoteRefreshCount = 0;
const maxQuoteRefresh = 10;

const allQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Your education is a dress rehearsal for a life that is yours to lead.",
  "Take pride in how far you’ve come, and have faith in how far you can go.",
  "The best way to predict the future is to create it.",
  "And so the adventure begins.",
  "Dream big, work hard, stay humble.",
  "You are capable of amazing things.",
  "What feels like the end is often the beginning.",
  "This is the beginning of anything you want.",
  "Doubt kills more dreams than failure ever will.",
  "Your journey is just beginning.",
  "Success is not final; failure is not fatal.",
  "Believe you can and you’re halfway there.",
  "Your only limit is your mind.",
  "Small steps every day lead to big results.",
  "Every accomplishment starts with the decision to try.",
  "Don’t wait for opportunity. Create it.",
  "Stay curious. Stay fearless.",
  "Nothing changes if nothing changes.",
  "Be the person you needed when you were younger.",
];

// Generate 7 random quotes
function generateQuotes() {
  const quoteListDiv = document.getElementById("quoteList");
  quoteListDiv.innerHTML = "";

  let usedIndexes = new Set();

  while (usedIndexes.size < 7) {
    let randomIndex = Math.floor(Math.random() * allQuotes.length);
    usedIndexes.add(randomIndex);
  }

  [...usedIndexes].forEach(i => {
    const quote = document.createElement("div");
    quote.className = "quote-item";
    quote.textContent = allQuotes[i];

    quote.onclick = () => {
      document.getElementById("quote").value = allQuotes[i];
    };

    quoteListDiv.appendChild(quote);
  });
}

// Open/Close Quote Generator
document.getElementById("openQuoteGenerator").onclick = () => {
  document.getElementById("quoteGeneratorPanel").style.display = "block";
  generateQuotes();
};

document.getElementById("closeQuotesBtn").onclick = () => {
  document.getElementById("quoteGeneratorPanel").style.display = "none";
};

// Refresh Button
document.getElementById("refreshQuotesBtn").onclick = () => {
  if (quoteRefreshCount >= maxQuoteRefresh) {
    alert("You have reached the maximum number of refreshes (10).");
    return;
  }

  quoteRefreshCount++;
  document.getElementById("quotesLeft").textContent = maxQuoteRefresh - quoteRefreshCount;

  generateQuotes();
};
