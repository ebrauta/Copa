export default function renderEliminated(team) {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const title = document.createElement("h1");
    title.innerText = "💀 Eliminado";
    const text = document.createElement("p");
    text.innerText = `${team.name} está fora da Copa.`;
    const btn = document.createElement("button");
    btn.innerText = "Jogar Novamente";
    btn.addEventListener("click", () => location.reload());
    root.appendChild(btn);
    root.appendChild(title);
    root.appendChild(text);
}