const root = document.getElementById('root');

const teamA = {
    name: "Brasil",
    attack: 94,
    midfield: 93,
    defense: 82,
    goalkeeper: 78
};

const teamB = {
    name: "Alemanha",
    attack: 88,
    midfield: 91,
    defense: 87,
    goalkeeper: 99
};

render();

function render() {
    root.innerHTML = "";
    const scoreboard = document.createElement("h2");
    scoreboard.innerHTML = `
        ${teamA.name} 
        <span id="goalTeamA">0</span>
        X
        <span id="goalTeamB">0</span>
        ${teamB.name}
    `;
    const matchLog = document.createElement('div')
    matchLog.id = "game_description";
    matchLog.style.whiteSpace = "pre-line";

    const startButton = document.createElement("button");
    startButton.innerText = "Iniciar Partida";
    startButton.addEventListener("click", async () => {
        startButton.disabled = true;
        const result = simulateMatch(teamA, teamB);
        await replayMatch(result);
        startButton.disabled = false;
    })
    root.append(scoreboard);
    root.append(startButton);
    root.append(matchLog);
}

function simulateMatch(home, away) {
    const result = {
        home,
        away,
        homeGoals: 0,
        awayGoals: 0,
        events: []
    };
    const totalLances = 11;
    for (let i = 1; i <= totalLances; i++) {
        const minute = Math.floor(((i - 1) * 90 / totalLances) + Math.floor(Math.random() * 5));
        const attackingTeam = chooseAttackingTeam(home, away);
        const defendingTeam = attackingTeam === home ? away : home;
        const chanceGoal = calculateGoalChance(attackingTeam, defendingTeam);
        if (i == 6) {
            result.events.push({
                minute: 45,
                type: "HALF_TIME"
            })
            continue;
        }
        if (Math.random() < chanceGoal) {
            if (attackingTeam == home) {
                result.homeGoals++;
            } else {
                result.awayGoals++;
            }
            result.events.push({
                minute,
                type: "GOAL",
                team: attackingTeam.name,
                score: `${result.homeGoals} x ${result.awayGoals}`
            });
        } else {
            result.events.push({
                minute,
                type: "ATTACK",
                team: attackingTeam.name
            })
        }
        result.events.sort((a, b) => a.minute - b.minute);
    }
    return result;
}

function chooseAttackingTeam(home, away) {
    const homeStrength = home.attack + home.midfield;
    const awayStrength = away.attack + away.midfield;
    const total = homeStrength + awayStrength;
    return Math.random() < homeStrength / total ? home : away;
}

function calculateGoalChance(attackingTeam, defendingTeam) {
    const attackPower = attackingTeam.attack;
    const defensePower = (defendingTeam.defense + defendingTeam.goalkeeper) / 2;
    let chance = attackPower / (attackPower + defensePower);
    chance *= 0.30;
    return Math.max(0.05, Math.min(0.25, chance));
}

async function replayMatch(result) {
    const goalA = document.getElementById("goalTeamA");
    const goalB = document.getElementById("goalTeamB");
    const log = document.getElementById("game_description");
    goalA.innerText = "0";
    goalB.innerText = "0";
    log.innerText = `⚽ Bola rolando para mais um ${result.home.name} x ${result.away.name}\n\n`;
    let currentHome = 0;
    let currentAway = 0;
    for (const event of result.events) {
        await wait(1200);
        if (event.type === "GOAL") {
            if (event.team === result.home.name) {
                currentHome++;
                goalA.innerText = currentHome;
            } else {
                currentAway++;
                goalB.innerText = currentAway;
            }
            log.innerText += `[${event.minute}'] 🚀 GOOOOOL DO ${event.team}\n`;
            log.innerText += `Placar: ${event.score}\n\n`;
        } else if (event.type == "HALF_TIME") {
            log.innerText +=
                "\n🥤 INTERVALO DE JOGO 🥤\n";
            log.innerText += "Fiquem agora com o show do intervalo!\n\n"
                await wait(1000);
            log.innerText += "De volta com o jogo...\n"

            continue;
        } else {
            log.innerText += `[${event.minute}'] Ataque do ${event.team}\n`;
        }
    }
    log.innerText += `\n🏁 Fim de Jogo\n`;
    let winner;
    if(result.homeGoals == result.awayGoals){
        winner = null;
        log.innerText += "Jogo complicado... empate!"
    } else if(result.homeGoals> result.awayGoals) {
        winner = result.home.name
    } else {
        winner = result.away.name
    }
    if(winner) log.innerText += `Vitória do ${winner}`
}

function wait(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}