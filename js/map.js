function Map(str){

    if (!(this instanceof arguments.callee)){
        return new Map(str);
    }

    this.str = str;
    this.helper = {
        col : function(value){
            var td = document.createElement('td');
            td.innerHTML = this.color(value);
            td.style.width = "21px";
            td.style.height = "21px";
            td.setAttribute('align', 'center');
            return td;
        },
        row : function(){
            return document.createElement('tr');
        },
        table : function(){
            var table = document.createElement('table');
            table.setAttribute('border', '1');
            return table;
        },
        color: function(v){
            if (/[r]/i.test(v)){
                return v.fontcolor("red");
            } else if( /[g]/i.test(v)) {
                return v.fontcolor("green");
            } else if(/[b]/i.test(v)){
                return v.fontcolor("blue");
            }else if(/y/i.test(v)){
                return v.fontcolor('orange');
            } else if(/\*/i.test(v)) {
                return v.fontcolor("black");
            }else {
                return v.fontcolor("gray");
            }
        }
    };

    this.cars = [];
    this.row = this.str.split('\n');
    this.row.filter(function(e){
        return e;
    });
    this.N = this.row.length;
    this.M = 0;
    this.table = this.helper.table();

    var _this = this;

    this.row.map(function(v){
        if(v.length > _this.M)
            _this.M = v.length;
    });

    function init(){
        _this.table.innerHTML = "";

        for (var i = 0; i < _this.N; i++){
            var tr = _this.helper.row();
            for (var j = 0; j < _this.M; j++){
                var value = _this.row[i][j] || '';
                if( value == '')
                    value = ' ';
                tr.appendChild(_this.helper.col(value))
            }
            _this.table.appendChild(tr);
        }

        for (var x = 0; x < _this.cars.length; x++){
            var car = _this.cars[x];
            var p = car.position();
            var tr = _this.table.children[p.y];
            var td = tr.children[p.x];
            td.innerHTML = 'w'.fontcolor(car.color());
        }

    }
    init();

    return {
        map : function (){
            return _this.table;
        },
        getData : function( ) {
            return { N: _this.N, M: _this.M, rows: _this.row};
        },
        addCar : function(car){
            car.setAttribute("table", _this.table);
            car.setAttribute("mapData", this.getData());
            _this.cars.push(car);
            init();
        }
    };
}
