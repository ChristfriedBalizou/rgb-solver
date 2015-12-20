function Car(color, quota, x, y){

    if(!(this instanceof arguments.callee)){
        return new Car(color, quota, x, y);
    }

    var _this = this;
    this.color = color;
    this.quota = quota;
    this.store = [];
    this.position = {
        x : x || 0,
        y : y || 0
    };
    this.path = {};

    return {
        quota : function(){
            return _this.quota;
        },
        position : function(){
            return _this.position;
        },
        moveTo : function(x, y){

            var element = _this
                .table.children[y]
                .children[x];

            if( !_this.path[x+','+y] ){
                _this.path[x+','+y] = element.innerHTML;
            }

            if(element.textContent === 'w'){
                var _x = _this.position.x
                    ,_y = _this.position.y;
                _this
                    .table.children[_y]
                    .children[_x].innerHTML = _this.path[_x+','+_y];
            }else{
                element.innerHTML = 'w'.fontcolor(_this.color);
            }

            _this.position.x = x;
            _this.position.y = y;

            return true;
        },
        move : function(){
            var direction = this.direction();
            if(direction){
               return this.moveTo(direction.x, direction.y);
            }
            return false;
        },
        direction: function(){
            var where = []
                ,x  = _this.position.x
                ,y  = _this.position.y
                ,tr = undefined;

            if(_this.mapData.N > (y + 1)) {
                tr = _this.table.children[y + 1];
                // move right
                if (/[wrgby\*]/.test(tr.children[x].textContent)) {
                    where.push({x: x, y: (y + 1)});
                }
            }

            if((y - 1) > 0) {
                tr = _this.table.children[y - 1];
                // move left
                if (/[wrgby\*]/.test(tr.children[x].textContent)) {
                    where.push({x: x, y: (y - 1)});
                }
            }

            if((x - 1) > 0) {
                tr = _this.table.children[y];
                // move up
                if (/[wrgby\*]/.test(tr.children[x - 1].textContent)) {
                    where.push({x: (x - 1), y: y});
                }
            }

            if(_this.mapData.N > (x + 1)) {
                // move down
                if (/[wrgby\*]/.test(tr.children[x + 1].textContent)) {
                    where.push({x: (x + 1), y: y});
                }
            }

            function random(min, max){
                return Math.floor(Math.random() * (max - min)) + min;
            }

            return where[random(0, where.length)] || undefined;
        },
        canMove : function(){
            if(_this.position.y < (_this.mapData.N - 1)){
                if(_this.position.x < (_this.mapData.M - 1)){
                    return true;
                }
            }
            return false;
        },
        drop : function(){
            return _this.store.pop();
        },
        pick : function(box){
            if (_this.store.length < _this.quota) {
                return _this.store.push(box);
            }
        },
        store : function(){
            return _this.store;
        },
        color : function(){
            return _this.color;
        },
        setAttribut : function(key, value){
            _this[key] = value;
        }
    };
}