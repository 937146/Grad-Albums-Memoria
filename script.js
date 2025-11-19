document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     1. GRAD YEAR GENERATION
  ------------------------------ */
  const gradYearSelect = document.getElementById("gradYear");
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  // Only show future years
  for (let y = currentYear; y <= currentYear + 3; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    gradYearSelect.appendChild(option);
  }

  /* ------------------------------
     2. QUOTE GENERATOR
  ------------------------------ */

  const openQuoteBtn = document.getElementById("openQuoteGenerator");
  const quotePanel = document.getElementById("quoteGeneratorPanel");
  const quoteList = document.getElementById("quoteList");
  const refreshBtn = document.getElementById("refreshQuotesBtn");
  const closeBtn = document.getElementById("closeQuotesBtn");
  const quoteInput = document.getElementById("quote");

  let refreshCount = 10;

  const QUOTES = [
    "The future belongs to those who believe in their dreams.",
    "Small steps every day lead to big results.",
    "Success isn’t final; failure isn’t fatal.",
    "I didn’t come this far to only come this far.",
    "Every ending is a new beginning.",
    "Be brave enough to start a new chapter.",
    "Dream big. Work hard. Stay humble.",
    "Your only limit is you.",
    "Collect moments, not things.",
    "Doubt kills more dreams than failure ever will.",
    "Focus on the step in front of you, not the whole staircase.",
    "One day, you’ll look back and be glad you didn’t give up.",
    "The comeback is always stronger than the setback.",
    "Be proud of how far you’ve come.",
    "Chase the vision, not the approval."
  ];

  function generateQuotes() {
    quoteList.innerHTML = "";
    let shuffled = [...QUOTES].sort(() => Math.random() - 0.5);
    let seven = shuffled.slice(0, 7);

    seven.forEach(q => {
      const div = document.createElement("div");
      div.className = "quote-item";
      div.textContent = q;
      div.addEventListener("click", () => {
        quoteInput.value = q;
      });
      quoteList.appendChild(div);
    });
  }

  openQuoteBtn.addEventListener("click", () => {
    quotePanel.style.display = "block";
    generateQuotes();
  });

  closeBtn.addEventListener("click", () => {
    quotePanel.style.display = "none";
  });

  refreshBtn.addEventListener("click", () => {
    if (refreshCount <= 0) return;

    refreshCount--;
    document.getElementById("quotesLeft").textContent = refreshCount;

    generateQuotes();
  });

  /* ------------------------------
     3. SONG OPTIONAL FIELDS
  ------------------------------ */
  const wantSong = document.getElementById("wantSong");
  const songFields = document.getElementById("songFields");

  wantSong.addEventListener("change", () => {
    songFields.style.display = wantSong.checked ? "block" : "none";
  });

  /* ------------------------------
     4. LIVE PREVIEW (Name, Strand, Quote, Song)
  ------------------------------ */
  const firstName = document.getElementById("firstName");
  const middleName = document.getElementById("middleName");
  const lastName = document.getElementById("lastName");

  const namePreview = document.getElementById("namePreview");
  const namePreview2 = document.getElementById("namePreview2");

  function updateName() {
    let full = firstName.value + " " + (middleName.value || "") + " " + lastName.value;
    namePreview.textContent = full.trim();
    namePreview2.textContent = full.trim();
  }

  firstName.addEventListener("input", updateName);
  middleName.addEventListener("input", updateName);
  lastName.addEventListener("input", updateName);

  /* STRAND PREVIEW */
  const strand = document.getElementById("strand");
  const strandPreview = document.getElementById("strandPreview");
  const strandPreview2 = document.getElementById("strandPreview2");

  strand.addEventListener("change", () => {
    strandPreview.textContent = strand.value;
    strandPreview2.textContent = strand.value;
  });

  /* QUOTE PREVIEW */
  const quotePreview = document.getElementById("quotePreview");
  quoteInput.addEventListener("input", () => {
    quotePreview.textContent = `"${quoteInput.value}"`;
  });

  /* SONG PREVIEW */
  const songPreview = document.getElementById("songPreview");
  const songTitleInput = document.getElementById("songTitleInput");
  const songArtistInput = document.getElementById("songArtistInput");
  const songLyricInput = document.getElementById("songLyricInput");

  function updateSong() {
    if (!wantSong.checked) {
      songPreview.style.display = "none";
      return;
    }
    songPreview.style.display = "block";

    let text = `${songTitleInput.value || ""} — ${songArtistInput.value || ""}`;
    if (songLyricInput.value) {
      text += ` (“${songLyricInput.value}”)`;
    }

    songPreview.textContent = text;
  }

  songTitleInput.addEventListener("input", updateSong);
  songArtistInput.addEventListener("input", updateSong);
  songLyricInput.addEventListener("input", updateSong);
  wantSong.addEventListener("change", updateSong);


  /* ------------------------------
     5. IMAGE UPLOAD & PREVIEW
  ------------------------------ */
  function setupImageUpload(idInput, idImg, maskId, zoomId, panXId, panYId) {
    const input = document.getElementById(idInput);
    const img = document.getElementById(idImg);
    const mask = document.getElementById(maskId);
    const zoom = document.getElementById(zoomId);
    const panX = document.getElementById(panXId);
    const panY = document.getElementById(panYId);

    input.addEventListener("change", () => {
      const file = input.files[0];
      if (!file) return;
      img.src = URL.createObjectURL(file);
    });

    function updateTransform() {
      img.style.transform =
        `scale(${zoom.value / 100}) translate(${panX.value}px, ${panY.value}px)`;
    }

    zoom.addEventListener("input", updateTransform);
    panX.addEventListener("input", updateTransform);
    panY.addEventListener("input", updateTransform);
  }

  setupImageUpload("childPhoto", "childPreviewImg", "childMask", "childZoom", "childPanX", "childPanY");
  setupImageUpload("recentPhoto", "recentPreviewImg", "recentMask", "recentZoom", "recentPanX", "recentPanY");


  /* ------------------------------
     6. YEAR PREVIEW UPDATE
  ------------------------------ */
  const childOverlayText = document.getElementById("childOverlayText");
  const recentOverlayText = document.getElementById("recentOverlayText");

  gradYearSelect.addEventListener("change", () => {
    childOverlayText.textContent = `Class of ${gradYearSelect.value}`;
    recentOverlayText.textContent = `Class of ${gradYearSelect.value}`;
  });

});
