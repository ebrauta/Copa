import simulateMatch from "../match/simulateMatch.js";
import renderMatch from "../view/renderMatch.js";

export default async function playRound(matches, playerTeam) {
    const results = [];
    const winners = [];
    for (const match of matches) {
        const result = simulateMatch(match[0], match[1]);
        results.push(result);
        winners.push(result.winner);
        let isHome = match[0].sel === playerTeam.sel && match[0].copa === playerTeam.copa
        let isAway = match[1].sel === playerTeam.sel && match[1].copa === playerTeam.copa;
        const isPlayerMatch = isHome || isAway;
        if (isPlayerMatch) {
            await renderMatch(result);
        }
    }
    return {
        results,
        winners
    };

}