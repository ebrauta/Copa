import console from 'console';
import fs from 'fs/promises';
import path from 'path';

const RAW_DIR = './raw';

const DEF_POSITIONS = ["ZAG", "LD", "LE"];
const MID_POSITIONS = ["VOL", "MC", "MD", "ME", "MEI"];
const ATK_POSITIONS = ["PD", "PE", "CA"];

const teamSchema = [4, 3, 3]

function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

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

function calculateRatings(starters) {
    const goalkeeper = average(starters.goalkeeper.map(p => p.force));
    const defense = average(starters.defenders.map(p => p.force));
    const midfield = average(starters.midfielders.map(p => p.force));
    const attack = average(starters.attackers.map(p => p.force));
    const overall = attack * 0.4 + midfield * 0.3 + defense * 0.2 + goalkeeper * 0.1;

    return {
        goalkeeper,
        defense,
        midfield,
        attack,
        overall
    }
}

const files = await fs.readdir(RAW_DIR);
const teams = [];
for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const content = await fs.readFile(path.join(RAW_DIR, file), "utf-8");
    const data = JSON.parse(content);
    const starters = buildStartingEleven(data.squad || []);
    const ratings = calculateRatings(starters);
    teams.push({
        sel: data.sel,
        copa: data.copa,
        ...ratings
    })
}
teams.sort((a, b) => b.overall - a.overall);
console.log("TOP 20 SELEÇÕES")
teams.slice(0, 20).forEach((team, index) => {
    let result = `${String(index + 1).padStart(2)}. `;
    result += `${team.sel} ${team.copa} ` 
    result += `| OVR ${team.overall.toFixed(2)}`;
    result += `| ATA ${team.attack.toFixed(1)}`;
    result += `| MEI ${team.midfield.toFixed(1)}`;
    result += `| DEF ${team.defense.toFixed(1)}`;
    result +=`| GOL ${team.goalkeeper.toFixed(1)}`;
    console.log(result);
})
