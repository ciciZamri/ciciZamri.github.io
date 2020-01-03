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

    static computel1(){}
    static computel2(){}
    static computel3(){}

    static relu(val){
        return Math.max(0, val);
    }
}