export default function renderRound(matches, title, onPlay) {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.innerText = `🏆 ${title}`;
    root.appendChild(h2);
    const matchesContainer = document.createElement("div");
    for (const match of matches) {
        const p = document.createElement("p");
        p.innerText = `${match[0].name} x ${match[1].name}`;
        matchesContainer.appendChild(p);
    }
    root.appendChild(matchesContainer);
    const btnPlay = document.createElement("button");
    btnPlay.innerText = `Jogar ${title}`;
    btnPlay.addEventListener("click", async () => {
        btnPlay.disabled = true;
        if (onPlay) {
            await onPlay();
        }
    }
    );
    root.appendChild(btnPlay);
}