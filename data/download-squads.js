import fs from "fs/promises";

const teams = JSON.parse(await fs.readFile("./index.json"));

for (const team of teams){
    const filename = team.slug + ".json";

    const url = `https://7a0.com.br/squads/${filename}`;
    console.log(`Downloadin ${filename}`);
    const response = await fetch(url);
    if(!response.ok){
        console.error(`Failed: ${filename}`);
        continue;
    }
    const json = await response.json();
    await fs.writeFile(`./raw/${filename}`, JSON.stringify(json, null, 2));
}