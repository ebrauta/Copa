export default async function renderTeamSelection(teams, onSelect) {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const title = document.createElement("h2");
    title.innerText = "🏆 Escolha sua Seleção";
    root.appendChild(title);
    teams.forEach(team => {
        const btn = document.createElement("button");
        btn.innerText = team.name;
        btn.style.display = "block";
        btn.style.marginBottom = "8px";
        btn.addEventListener("click", () => onSelect(team));
        root.appendChild(btn);
    });

}