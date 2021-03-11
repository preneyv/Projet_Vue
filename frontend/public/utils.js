/**
 * Removes accentuation from the string.
 * @returns the string without accents
 */
String.prototype.removeAccents = function() {
    return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}