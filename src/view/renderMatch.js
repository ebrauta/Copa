import { wait } from "../utils/wait.js";
import { COMMENTARY } from "../match/commentary.js";
import { randomText } from "../utils/random.js";

export default async function renderMatch(result) {
    const root = document.getElementById("root");
    root.innerHTML = ""
    const title = document.createElement("h2");
    title.innerText = "⚽ Ao Vivo";
    const score = document.createElement("h3")
    const goalA = document.createElement("span")
    goalA.innerText = "0";
    const goalB = document.createElement("span")
    goalB.innerText = "0";
    score.append(
        document.createTextNode(`${result.home.name} `),
        goalA,
        document.createTextNode(" x "),
        goalB,
        document.createTextNode(` ${result.away.name}`)
    );
    const log = document.createElement("div");
    log.style.whiteSpace = "pre-line";
    log.style.marginTop = "20px";
    root.appendChild(title)
    root.appendChild(score)
    root.appendChild(log);
    log.innerText = `\n\n⚽ Bola rolando para mais um ${result.home.name} x ${result.away.name}\n\n`;
    let currentHome = 0;
    let currentAway = 0;
    for (const event of result.events) {
        await wait(1200);
        switch (event.type) {
            case "GOAL":
                if (event.team === result.home.name) {
                    currentHome++;
                    goalA.innerText = currentHome;
                } else {
                    currentAway++;
                    goalB.innerText = currentAway;
                }
                log.innerText += `[${event.minute}'] ${randomText(COMMENTARY.goal)}\n`;
                log.innerText += `${event.team} abre espaço e balança as redes!\n`;
                log.innerText += `Placar: ${event.score}\n\n`;
                break;
            case "ATTACK":
                log.innerText += `[${event.minute}'] ${event.team} ${randomText(COMMENTARY.attack)}\n`;
                log.innerText += `${randomText(COMMENTARY.miss)}\n\n`;
                break;
            case "HALF_TIME":
                log.innerText += `\n🥤 INTERVALO 🥤\n`;
                log.innerText += `${randomText(COMMENTARY.halftime)}\n\n`;
                log.innerText += `Fiquem agora com o show do intervalo!\n\n`;
                await wait(1000);
                log.innerText += `Voltamos para o segundo tempo de ${result.home.name} x ${result.away.name}\n\n`;
                break;
            case "EXTRA_TIME":
                log.innerText += `\n⏱️ FIM DO TEMPO NORMAL!\n`;
                log.innerText += `O empate persiste...\n`;
                log.innerText += `${result.home.name} ${currentHome} x ${currentAway} ${result.away.name}\n`;
                await wait(1000);
                log.innerText += `🔥 COMEÇA A PRORROGAÇÃO!\n\n`;
                break;
            case "EXTRA_HALF":
                log.innerText += `\n🥤 PAUSA DA PRORROGAÇÃO 🥤\n`;
                log.innerText += `Os jogadores tentam recuperar o fôlego...\n\n`;
                await wait(1000);
                log.innerText += `Bola rolando para os minutos finais!\n\n`;
                break;
            case "PENALTIES":
                log.innerText += `\n⚽ DISPUTA DE PÊNALTIS ⚽\n\n`;
                await wait(1500);
                log.innerText += `${result.home.name} ${event.score} ${result.away.name}\n\n`;
                break;
        }
        log.scrollTop = log.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
    }
    log.innerText += `\n🏁 Priiiiiiiiii!!! Apita o árbitro!\n`;
    if (result.penaltyScore) {
        log.innerText += `🏆 ${result.winner.name} vence nos pênaltis!\n`;
    } else {
        log.innerText += `🏆 Vitória de ${result.winner.name}!\n`;
    }
    return new Promise(resolve => {
        const btn = document.createElement("button");
        btn.innerText = "Continuar";
        btn.addEventListener('click', () => {
            btn.remove();
            resolve();
        });
        root.appendChild(btn);
    })
}
