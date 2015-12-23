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
        up: function (x, y) {
            x -= 1;
            return x > 0 ? this.gravity(x, y) : undefined;
        },
        down: function (x, y) {
            x += 1;
            return car.mapData.N > x ? this.gravity(x, y) : undefined;
        },
        left: function (x, y) {
            y -= 1;
            return y > 0 ? this.gravity(x, y) : undefined;
        },
        right: function (x, y) {
            y += 1;
            return car.mapData.N > y ? this.gravity(x, y) : undefined;
        },
        random: function(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        },
        alreadyPassed: function(x, y) {
            //FIXME : check for all the cars
            return car.way().indexOf(x + "," + y) != -1;  
        },
        direction: function(){
            var where = []
                ,pos = car.position()
                ,x  = pos.x
                ,y  = pos.y;

            // LEFT
            var test = this.left(x, y);
            if(test){
                where.push(test);
            }

            // RIGHT
            test = this.right(x, y);
            if(test){
                where.push(test);
            }

            // UP
            test = this.up(x, y);
            if(test){
                where.push(test);
            }

            // DOWN
            test = this.down(x, y);
            if(test) {
                where.push(test);
            }

            return where[this.random(0, where.length)] || undefined;
        },
        moveTo: function(x, y){
            var element = this.getElement(x, y)
                ,pos = car.position();

            car.path(x +','+ y, element.innerHTML);
            car.way(pos);
            car.position(x, y);



            element.innerHTML = 'w'.fontcolor(car.color());
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
