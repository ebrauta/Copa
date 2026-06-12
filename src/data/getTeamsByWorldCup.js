export async function getTeamsByWorldCup(year) {
    const index = await fetch("./data/index.json").then(r => r.json());
    return index
        .filter(team => team.copa === year)
        .sort((a, b) =>
            a.sel.localeCompare(b.sel)
        );
}