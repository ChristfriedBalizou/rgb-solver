function CarHelper(car) {

    if (!(this instanceof arguments.callee)) {
        return new CarHelper(car);
    }

    var backtrack = [];
    
    car.helper = {
        getElement: function (x, y) {
            return car.table.children[y].children[x];
        },
        canMove: function (x, y) {
            return /[wrgby\*]/.test(this.getElement(x, y).textContent);
        },
        gravity: function(x, y){
            return this.canMove(x, y) ? {x: x, y: y} : undefined;
        },
        left: function (x, y) {
            x -= 1;
            return x >= 0 ? this.gravity(x, y) : undefined;
        },
        right: function (x, y) {
            x += 1;
            return car.mapData.N > x ? this.gravity(x, y) : undefined;
        },
        up: function (x, y) {
            y -= 1;
            return y >= 0 ? this.gravity(x, y) : undefined;
        },
        down: function (x, y) {
            y += 1;
            return car.mapData.N > y ? this.gravity(x, y) : undefined;
        },
        random: function(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        },
        alreadyPassed: function(x, y) {
            //FIXME : check for all the cars
            return car.way().lastIndexOf(x + "," + y) !== -1;
        },
        direction: function(){
            var where = []
                ,pos = car.position()
                ,x  = pos.x
                ,y  = pos.y;
            
            if (backtrack.length === car.way().length){
	    	where = backtrack.pop();
	    } else {		
	        // LEFT
                var test = this.left(x, y);
                if(test && !this.alreadyPassed(test.x, test.y)){
                    where.push(test);
                }

                // RIGHT
                test = this.right(x, y);
                if(test && !this.alreadyPassed(test.x, test.y)){
                    where.push(test);
                }

                // UP
                test = this.up(x, y);
                if(test && !this.alreadyPassed(test.x, test.y)){
                    where.push(test);
                }

                // DOWN
                test = this.down(x, y);
                if(test && !this.alreadyPassed(test.x, test.y)) {
                    where.push(test);
                }
	    }

	    if (where.length){
		var direction = where.splice(this.random(0, where.length), 1);
	    	backtrack.push(where);
		return direction.pop();
	    }
	    return undefined;
        },
        moveTo: function(x, y){
            var element = this.getElement(x, y)
                ,pos = car.position();

            car.path(x +','+ y, element.innerHTML);
            element.innerHTML = 'w'.fontcolor(car.color());
            car.way(x + ',' + y);
            this.update();
            
	    return true;
        },
	backTo: function(x, y){ 
            var element = this.getElement(x, y)
                ,paths = car.path();
                
            element.innerHTML = paths[x +','+ y];
            this.update();
            
	    return true;
	},
	toCoord: function(str){
	    var coord = str.split(',')
	       ,y = Number(coord.pop())
	       ,x = Number(coord.pop());
	       
	    return {x: x, y: y};
	},
	update: function(){
	    var coord = this.toCoord(car.way().slice(-1).pop());
	    car.position(coord.x, coord.y); 
	},
        move: function(){
            var coord = this.direction();
            
            if(coord){
                return this.moveTo(coord.x, coord.y);
            } 
    	    
    	    var ways = car.way();
            if (ways.length){
                var coord = this.toCoord(ways.pop());
                return this.backTo(coord.x, coord.y); 
            }
            return false;
        }
    };
    
    return car;
}
