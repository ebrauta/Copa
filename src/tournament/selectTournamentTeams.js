import { loadTeam } from "../data/loadTeam.js";

export default async function selectTournamentTeams(indexes) {
    const tournamentTeams = [];
    for(const index of indexes){
        const team = await loadTeam(index.sel, index.copa);
        tournamentTeams.push(team)
    }
    const shuffled = [...tournamentTeams].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
}