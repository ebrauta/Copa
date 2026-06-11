export default function renderRoundResults(title, results, onContinue) {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.innerText = title;
    root.appendChild(h2);
    for (const result of results) {
        const p = document.createElement("p");
        let text = `${result.home.name} ${result.homeGoals} x ${result.awayGoals} ${result.away.name}`;
        if (result.penaltyScore) {
            text += ` (${result.penaltyScore.home}x${result.penaltyScore.away} pen)`;
        }
        p.innerText = text;
        root.appendChild(p);
    }
    if (onContinue) {
        const btn = document.createElement("button");
        btn.innerText = "Próxima fase";
        btn.addEventListener("click", onContinue)
        root.appendChild(btn);
    }
}