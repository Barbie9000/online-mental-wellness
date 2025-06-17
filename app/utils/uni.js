// Convert field names to proper case
export const toProperCase = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase())
        .replace(/\s+/g, ' ')
        .trim()
}