class Model{
    input_units = 28*28;
    l1_units = 300;
    l2_units = 100;
    output_units = 10;
    l1_output;
    l2_output;
    final_output;
    W1;
    b1;
    W2;
    b2;
    W3;
    b3;
    x_train;
    y_train;

    constructor(use_pretrained=false){
        this.W1 = this.initialize_parameter([this.l1_units, this.input_units]);
        this.b1 = this.initialize_parameter([this.l1_units, 1]);
        this.W2 = this.initialize_parameter([this.l2_units, this.l1_units]);
        this.b2 = this.initialize_parameter([this.l2_units, 1]);
        this.W3 = this.initialize_parameter([this.output_units, this.l2_units]);
        this.b3 = this.initialize_parameter([this.output_units, 1]);
    }

    load_pretrain_parameter(param){

    }

    load_training_data(x, y){
        this.x_train = x;
        this.y_train = y;
    }

    initialize_parameter(dim){
        let row = [];
        for(let i = 0 ; i<dim[0] ; i++){
            let col = [];
            for(let j = 0 ; j<dim[1] ; j++){
                const rand = (Math.random()*0.2) - 0.1;
                col.push(rand);
            }
            row.push(col);
        }

        return row;
    }

    train(){}

    predict(x){
        let y = this.forward(x);
        let maxvalue = y[0];
        let maxindex = 0;
        for(let i = 0 ; i<y.length ; i++){
            if(y[i] > maxvalue){
                maxvalue = y[i];
                maxindex = i;
            }
        }

        return maxindex;
    }

    forward(x){
        let flatten = [];
        for(let i of x){
            for(let j of i){
                flatten.push([j/255.0]);
            }
        }

        this.l1_output = M.matmul(this.W1, flatten);
        this.l1_output = M.vecadd(this.l1_output, this.b1);
        this.relu(this.l1_output);

        this.l2_output = M.matmul(this.W2, this.l1_output);
        this.l2_output = M.vecadd(this.l2_output, this.b2);
        this.relu(this.l2_output);

        this.final_output = M.matmul(this.W3, this.l2_output);
        this.final_output = M.vecadd(this.final_output, this.b3);
        this.softmax(this.final_output);

        return this.final_output;
    }

    calc_cost(){}
    backpropagate(){}
    calc_crossentropy_loss(){}
    apply_gradient(){}

    relu(vec){
        for(let i = 0 ; i < vec.length ; i++){
            vec[i][0] = Math.max(0, vec[i][0]);
        }
    }

    softmax(vec){
        let total  = 0.0;
        for(let i = 0 ; i<vec.legth ; i++){
            total += Math.exp(vec[i][0]);
        }
        for(let i = 0 ; i<vec.length ; i++){
            vec[i][0] = Math.exp(vec[i][0])/total;
        }
    }
}