import index from "../../data/index.json" with { type: "json" };

export function getTeamsByWorldCup(year) {
    return index
        .filter(team => team.copa === year)
        .sort((a, b) =>
            a.sel.localeCompare(b.sel)
        );
}