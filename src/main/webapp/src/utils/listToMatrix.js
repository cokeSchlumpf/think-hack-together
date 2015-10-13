export default function(list, elementsPerSubArray) {
    if (!list) {
      return [];  
    }
    
    const matrix = [];
    let i, k;

    for (i = 0, k = -1; i < list.length; i = i + 1) {
        if (i % elementsPerSubArray === 0) {
            k = k + 1;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}