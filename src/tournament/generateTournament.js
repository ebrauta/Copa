import { loadTeam } from "../data/loadTeam.js";
import selectTournamentTeams from "./selectTournamentTeams.js";

export default function generateTournament(teams) {
    const matches = [
        [teams[0], teams[7]],
        [teams[1], teams[6]],
        [teams[2], teams[5]],
        [teams[3], teams[4]]
    ]
    return matches
}