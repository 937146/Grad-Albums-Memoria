document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const quoteDisplay = document.getElementById("quoteDisplay");
    const nameInput = document.getElementById("name");
    const nicknameInput = document.getElementById("nickname");
    const strandInput = document.getElementById("strand");
    const gradYearInput = document.getElementById("gradYear");
    const pfpInput = document.getElementById("pfpInput");
    const outputPfp = document.getElementById("outputPfp");
    const quotesLeft = document.getElementById("quotesLeft");

    let refreshCount = 3;

    const quotes = [
        "Success is not final, failure is not fatal.",
        "The best view comes after the hardest climb.",
        "Stay curious, stay determined.",
        "One day or day one – you choose.",
        "Dream big. Work hard. Stay humble.",
        "Your future is created by what you do today."
    ];

    function generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    generateBtn.addEventListener("click", (event) => {
        event.preventDefault(); // ⛔ stops page reload

        const name = nameInput.value.trim();
        const nickname = nicknameInput.value.trim();
        const strand = strandInput.value.trim();
        const gradYear = gradYearInput.value.trim();

        if (!name || !strand || !gradYear) {
            quoteDisplay.textContent = "Please fill in all required fields.";
            return;
        }

        const quote = generateRandomQuote();

        quoteDisplay.innerHTML = `
            <strong>${name}</strong> (${nickname || "No nickname"})<br>
            Strand: ${strand}<br>
            Graduation: ${gradYear}<br><br>
            <em>"${quote}"</em>
        `;
    });

    refreshBtn.addEventListener("click", (event) => {
        event.preventDefault(); // ⛔ stops page from refreshing

        if (refreshCount <= 0) return;

        refreshCount--;
        quotesLeft.textContent = refreshCount;

        const newQuote = generateRandomQuote();
        quoteDisplay.innerHTML = `<em>"${newQuote}"</em>`;
    });

    pfpInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            outputPfp.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
});
