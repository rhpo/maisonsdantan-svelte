export const splitChunks = (arr, len) => {
    let chunks = [];
    let i = 0;
    let n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
};

export const minLenArr = (matrix) => {
    let minLength = matrix[0].length;

    for (let i = 1; i < matrix.length; i++)
        matrix[i].length < minLength && (minLength = matrix[i].length);

    return minLength;
};