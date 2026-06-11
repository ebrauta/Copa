import fs from 'fs/promises'
import path from 'path'

const RAW_DIR = "./raw";

const stats = {
    teams: 0,
    players: 0,
    legends: 0,

    positions: new Set(),
    minForce: Infinity,
    maxForce: -Infinity,
    totalForce: 0,

    squadsSizes: []
}

const files = await fs.readdir(RAW_DIR);
for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const content = await fs.readFile(path.join(RAW_DIR, file), "utf-8");
    const squad = JSON.parse(content);
    stats.teams++;
    const players = squad.squad || [];
    stats.squadsSizes.push(players.length);
    for (const player of players) {
        stats.players++;
        if (player.legend) {
            stats.legends++;
        }
        if (player.force != null) {
            stats.minForce = Math.min(stats.minForce, player.force)
            stats.maxForce = Math.max(stats.maxForce, player.force)
            stats.totalForce += player.force;
        }
        for (const pos of player.positions || []) {
            stats.positions.add(pos);
        }
    }


}
const avgForce = stats.players > 0 ? stats.totalForce / stats.players : 0;
const avgSquad = stats.squadsSizes.reduce((a, b) => a + b, 0) / stats.squadsSizes.length;

console.log("DATASET REPORT")
console.log("Teams: ", stats.teams)
console.log("Players: ", stats.players)
console.log("Legends: ", stats.legends)
console.log("\nPositions:")
console.log([...stats.positions].sort().join(", "));
console.log("\nForce:");
console.log("Min: ", stats.minForce)
console.log("Max: ", stats.maxForce)
console.log("Avg: ", avgForce.toFixed(2));
console.log("\nSquads:");
console.log("Average squad size: ", avgSquad.toFixed(2));