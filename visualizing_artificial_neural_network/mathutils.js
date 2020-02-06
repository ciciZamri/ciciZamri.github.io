class M {
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

    static vecadd(vector1, vector2){
        let result = [];
        for(let i = 0 ; i<vector1.length ; i++){
            result.push([vector1[i][0] + vector2[i][0]]);
        }

        return result;
    }

    static sigmoid(vec){
        let result = [];
        for(let i = 0 ; i<vec.length ; i++){
            result.push(1/(1+Math.exp(-vec[i][0])))
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

    static normalize(vec){
        let result = [];
        let total = 0.0;
        for(let i = 0 ; i<vec.length ; i++){
            total += vec[i][0];
        }
        for(let i = 0 ; i<vec.length ; i++){
            result.push(vec[i][0]/total);
        }
    
        return result;
    }
}