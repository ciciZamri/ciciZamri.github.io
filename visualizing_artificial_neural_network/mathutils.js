class MathUtil {
    static matmul(matrix1, matrix2) {
        let result = [];
        for(let i = 0 ; i<matrix1.length ; i++){
            let row = [];
            for(let j = 0 ; j<matrix2[0].length ; j++){
                let currentvalue = 0;
                for(let k = 0 ; k<matrix1[i].length ; k++){
                    currentvalue += matrix1[i][k] * matrix2[k][j];
                }
                row.push(currentvalue);
                //console.log(j);
            }
            //console.log(i);
            result.push(row);
        }

        return result;
    }

    static transpose(matrix){
        let transposed = [[]];
        for(let i = 0 ; i<matrix.length ; i++){
            for(let j = 0 ; j<matrix[0].length ; j++){
                transposed[j][i] = matrix[i][j];
            }
        }

        return transposed;
    }
}