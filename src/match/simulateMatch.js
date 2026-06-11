function chooseAttackingTeam(home, away) {
    const homeStrength = home.attack + home.midfield;
    const awayStrength = away.attack + away.midfield;
    const total = homeStrength + awayStrength;
    return Math.random() < homeStrength / total ? home : away;
}

function calculateGoalChance(attackingTeam, defendingTeam) {
    const attackPower = attackingTeam.attack;
    const defensePower = (defendingTeam.defense + defendingTeam.goalkeeper) / 2;
    let chance = attackPower / (attackPower + defensePower);
    chance *= 0.30;
    return Math.max(0.05, Math.min(0.25, chance));
}

function simulatePlay(result, home, away, minute) {
    const attackingTeam = chooseAttackingTeam(home, away);
    const defendingTeam = attackingTeam === home ? away : home;
    const chanceGoal = calculateGoalChance(attackingTeam, defendingTeam);
    if (Math.random() < chanceGoal) {
        if (attackingTeam === home) {
            result.homeGoals++;
        } else {
            result.awayGoals++;
        }
        result.events.push({
            minute,
            type: "GOAL",
            team: attackingTeam.name,
            score:
                `${result.homeGoals} x ${result.awayGoals}`
        });
    } else {
        result.events.push({
            minute,
            type: "ATTACK",
            team: attackingTeam.name
        });
    }
}

export default function simulateMatch(home, away) {
    const result = {
        home,
        away,
        homeGoals: 0,
        awayGoals: 0,
        winner: null,
        penaltyScore: null,
        events: []
    };
    const totalLances = 11;
    // TEMPO NORMAL
    for (let i = 1; i <= totalLances; i++) {
        if (i === 6) {
            result.events.push({
                minute: 45,
                type: "HALF_TIME"
            });
            continue;
        }
        const minute =
            Math.floor(
                ((i - 1) * 90 / totalLances)
                + Math.floor(Math.random() * 5)
            );
        simulatePlay(
            result,
            home,
            away,
            minute
        );
    }
    // PRORROGAÇÃO
    if (result.homeGoals === result.awayGoals) {
        const extraMinutes = [95, 100, 110, 115];
        result.events.push({
            minute: 90,
            type: "EXTRA_TIME"
        });
        result.events.push({
            minute: 105,
            type: "EXTRA_HALF"
        })
        for (const minute of extraMinutes) {
            simulatePlay(
                result,
                home,
                away,
                minute
            );
        }
    }
    // PENALTIS
    if (result.homeGoals === result.awayGoals) {
        let homePens = 0;
        let awayPens = 0;
        for (let i = 0; i < 5; i++) {
            if (Math.random() < 0.70)
                homePens++;
            if (Math.random() < 0.70)
                awayPens++;
        }
        // morte súbita simples
        while (homePens === awayPens) {
            if (Math.random() < 0.70)
                homePens++;
            if (Math.random() < 0.70)
                awayPens++;
        }
        result.penaltyScore = {
            home: homePens,
            away: awayPens
        };
        result.events.push({
            minute: 120,
            type: "PENALTIES",
            score: `${homePens} x ${awayPens}`
        });
        result.winner = homePens > awayPens ? home : away;

    }
    // VENCEDOR SEM PENALTIS
    if (!result.winner) {
        result.winner = result.homeGoals > result.awayGoals ? home : away;
    }
    result.events.sort((a, b) => a.minute - b.minute);
    return result;
}