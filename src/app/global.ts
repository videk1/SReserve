import {Account} from '../pages/login-page/login-page';

export var global = {
    acc: Account,
    setAcc : function(acc) {
        this.acc = acc;
    },
    getAcc : function(){
        return this.acc;
    }
};