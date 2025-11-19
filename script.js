function calculate() {
    const age = parseFloat(document.getElementById("age").value) || 0;
    const weight = parseFloat(document.getElementById("weight").value) || 0;
    const temp = parseFloat(document.getElementById("temp").value) || 0;

    let recommendation = "";

    if (age < 1) {
        recommendation = "Infant: Monitor breathing closely. Keep hydrated.";
    } else if (age >= 1 && age <= 5) {
        recommendation = "Child: Possible early respiratory infection. Keep temperature in check.";
    } else {
        recommendation = "Adult: Rest, monitor symptoms, and stay hydrated. Seek help if fever persists.";
    }

    document.getElementById("result").textContent = recommendation;
}
