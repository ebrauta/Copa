export default function renderChampion(team) {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const title = document.createElement("h1");
    title.innerText = "🏆 CAMPEÃO DA COPA 🏆";
    const champion = document.createElement("h2");
    champion.innerText = team.name;
    const text = document.createElement("pre");
    text.innerText = `
    ═══════════════════════

      🏆🏆🏆

   ${team.name}

      🏆🏆🏆

    ═══════════════════════`;
    const btn = document.createElement("button");
    btn.innerText = "Jogar Novamente";
    btn.addEventListener("click", () => location.reload());
    root.appendChild(title);
    root.appendChild(champion);
    root.appendChild(text);
    root.appendChild(btn);

}