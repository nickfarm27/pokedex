export function capitalizeName(name: string) {
    return name
        .split("-")
        .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
        .join(" ");
}