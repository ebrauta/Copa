import { getTeamsByWorldCup } from "./data/getTeamsByWorldCup.js";
import generateNextRound from "./tournament/generateNextRound.js";
import generateTournament from "./tournament/generateTournament.js";
import playRound from "./tournament/playRound.js";
import selectTournamentTeams from "./tournament/selectTournamentTeams.js";
import renderChampion from "./view/renderChampion.js";
import renderEliminated from "./view/renderEliminated.js";
import renderRound from "./view/renderRound.js";
import renderRoundResults from "./view/renderRoundResults.js";
import renderTeamSelection from "./view/renderTeamSelection.js";

async function start() {
    const teams = await getTeamsByWorldCup(1970);
    const participants = await selectTournamentTeams(teams);
    renderTeamSelection(participants, async (playerTeam) => {
        const currentMatches = generateTournament(participants);
        await playTournament(currentMatches, playerTeam, "Quartas de Final")
    })
}

async function playTournament(matches, playerTeam, roundName) {
    renderRound(matches, roundName, async () => {
        const round = await playRound(matches, playerTeam);
        const playerAlive = round.winners.some(team => team.sel === playerTeam.sel && team.copa === playerTeam.copa);
        if (!playerAlive) {
            renderEliminated(playerTeam);
            return;
        }
        if (round.winners.length === 1) {
            renderChampion(round.winners[0])
            return;
        }
        renderRoundResults(`Resultados - ${roundName}`, round.results, async () => {
            const nextMatches = generateNextRound(round.winners);
            const nextRoundName = getRoundName(nextMatches.length)
            await playTournament(nextMatches, playerTeam, nextRoundName);
        })
    })
}

function getRoundName(matchCount) {
    switch (matchCount) {
        case 4:
            return "Quartas de Final";
        case 2:
            return "Semifinais";
        case 1:
            return "Final";
        default:
            return "Mata-mata";
    }
}

start();