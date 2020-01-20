class BasicModel{
    static w1;
    static b1;
    static w2;
    static b2;
    static w3;
    static b3;

    static predict(){

    }

    static set_weight_bias(){}


    static relu(val){
        return Math.max(0, val);
    }
}