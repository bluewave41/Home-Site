/**
 * Converts an array into a 2D array with chunks of the given size.
 * Arrays of an incorrect size will be padded accordingly with empty strings.
 * @param {array} array Array to be split into chunks
 * @param {number} size Size of the chunks
 */
const chunk = function(array: any[], size: number) {
    let chunks = [];
    for(var x=0;x<array.length;x+=size) {
        chunks.push(array.slice(x, x + size));
    }
    while(chunks[chunks.length-1].length != size) {
        chunks[chunks.length-1].push('');
    }
    return chunks;
}

/**
 * Capitalized the first character of a given string.
 * @param string The string to be capitalized 
 */
const capitalize = function(string: string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export { chunk, capitalize }