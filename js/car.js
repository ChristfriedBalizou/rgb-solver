function Car(c, q, x, y){

    if(!(this instanceof arguments.callee)){
        return new Car(c, q, x, y);
    }

    var _this = new CarHelper(this)
        ,color = c
        ,quota = q
        ,store = []
        ,position = {x: x || 0 , y: y || 0}
        ,path = {}
        ,way = [x + ',' + y];


    this.setAttribute = function(key, value){
            if(!this.hasOwnProperty(key)){
                this[key] = value;
            }
    };

    this.position = function (x, y) {
        if(!isNaN(x + y))
            position = {x: x, y: y};
      return position;
    };

    this.quota = function(){
        return quota;
    };

    this.store = function(){
        return store;
    };

    this.color = function(){
        return color;
    };

    this.path = function(key, value){
        if(key && value)
            if(!path[key])
                path[key] = value;
      return path;
    };

    this.way = function(value){
        if(value)
            way.push(value);
        return way;
    };
}
