function CarHelper(car) {

    if (!(this instanceof arguments.callee)) {
        return new CarHelper(car);
    }

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
            return x > 0 ? this.gravity(x, y) : undefined;
        },
        right: function (x, y) {
            x += 1;
            return car.mapData.N > x ? this.gravity(x, y) : undefined;
        },
        up: function (x, y) {
            y -= 1;
            return y > 0 ? this.gravity(x, y) : undefined;
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
            return where[this.random(0, where.length)] || undefined;
        },
        moveTo: function(x, y){
            var element = this.getElement(x, y)
                ,pos = car.position();

            var paths = car.path(x +','+ y, element.innerHTML);

            if(this.getElement(pos.x, pos.y).textContent === element.textContent){
                element.innerHTML = paths[x +','+ y];
            }else{
                element.innerHTML = 'w'.fontcolor(car.color());
            }

            car.way(x + ',' + y);
            car.position(x, y);
            return true;
        },
        move : function(){
            var coord = this.direction();
            if(coord){
                return this.moveTo(coord.x, coord.y);
            }
            return false;
        }
    };

    return car;
}
