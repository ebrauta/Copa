import average from "../utils/average.js";

const DEF_POSITIONS = ["ZAG", "LD", "LE"];
const MID_POSITIONS = ["VOL", "MC", "MD", "ME", "MEI"];
const ATK_POSITIONS = ["PD", "PE", "CA"];

const teamSchema = [4, 3, 3]

function hasPosition(player, positions) {
    return player.positions?.some(pos => positions.includes(pos));
}

function buildStartingEleven(players) {
    const goalkeepers = players.filter(p => p.positions?.includes("GOL")).sort((a, b) => b.force - a.force);
    const defenders = players.filter(p => hasPosition(p, DEF_POSITIONS)).sort((a, b) => b.force - a.force);
    const midfielders = players.filter(p => hasPosition(p, MID_POSITIONS)).sort((a, b) => b.force - a.force);
    const attackers = players.filter(p => hasPosition(p, ATK_POSITIONS)).sort((a, b) => b.force - a.force);
    return {
        goalkeeper: goalkeepers.slice(0, 1),
        defenders: defenders.slice(0, teamSchema[0]),
        midfielders: midfielders.slice(0, teamSchema[1]),
        attackers: attackers.slice(0, teamSchema[2])
    }
}

function normalizeAverage(value) {
    return Number(value.toFixed(2));
}

export function calculateTeamStrength(data) {
    const starters = buildStartingEleven(data);
    const goalkeeper = normalizeAverage(average(starters.goalkeeper.map(p => p.force)));
    const defense = normalizeAverage(average(starters.defenders.map(p => p.force)));
    const midfield = normalizeAverage(average(starters.midfielders.map(p => p.force)));
    const attack = normalizeAverage(average(starters.attackers.map(p => p.force)));
    const overall = normalizeAverage(attack * 0.4 + midfield * 0.3 + defense * 0.2 + goalkeeper * 0.1);

    return {
        goalkeeper,
        defense,
        midfield,
        attack,
        overall
    }
}