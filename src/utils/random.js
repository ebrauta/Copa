export function randomText(list) {
    return list[
        Math.floor(Math.random() * list.length)
    ];
}