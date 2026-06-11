import fs from "fs/promises";

const teams = JSON.parse(await fs.readFile("./index.json"));
const countries = new Set();
for (const team of teams) {
    countries.add(team.sel)
}

console.log([...countries].sort().join(', '))
