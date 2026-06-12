import { calculateTeamStrength } from "./calculateTeamStrength.js";
import { getCountryName } from "./countries.js";

const index = await fetch("./data/index.json").then(r => r.json());

export async function loadTeam(sel, cup) {
    const teamFile = index.find(t => t.sel === sel && t.copa == cup);
    if (!teamFile) throw new Error("Seleção não encontrada!");
    const data = await fetch(`./data/raw/${teamFile.slug}.json`).then(r => r.json());
    const ratings = calculateTeamStrength(data.squad);
    return {
        ...ratings,
        players: data.squad,
        sel,
        cup,
        name: getCountryName(sel)
    }
}