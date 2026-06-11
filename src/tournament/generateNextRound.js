export default function generateNextRound(winners) {
    const matches = [];
    for (let i = 0; i < winners.length; i += 2) {
        matches.push([
            winners[i],
            winners[i + 1]
        ]);
    }
    return matches;
}