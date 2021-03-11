/**
 * Removes accentuation from the string.
 * @returns the string without accents
 */
export function removeAccents(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}