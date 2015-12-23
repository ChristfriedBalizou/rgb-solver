(function(window, document, undefined){
    'use strict';

    var  RED   = "red"
        ,GREEN = "green"
        ,BLUE  = "blue"
        ,RGB   = "rgb";

    var $map = document.getElementById('result')
        ,$str = document.getElementById('mapstr')
        ,$move = document.getElementById('move');

    // Main
    var init = function(){
        var map = undefined;
        $str.onkeyup = function(){
            $map.innerHTML = "";
            map = Map(this.value || '');
            $map.appendChild(map.map());
        };

        $move.onclick = function(){
            var car = Car(BLUE, 1, 1, 10);
            map.addCar(car);
            var n  = 0;
            var id = setInterval(function(){
                if(!car.helper.move()){
                    console.log('cant move');
                    clearInterval(id);
                }
                if(n > 150){
                    console.log(n);
                    clearInterval(id);
                }
                n++;
            }, 300);
        };
    };
    init();

    /*var car = Car(BLUE, 1, 1, 10);
    map.addCar(car);
    car.move(map, 2, 10);
    car.move(map, 3, 10);
    car.move(map, 4, 10);
    car.move(map, 5, 10);*/

/*
   *r*
   *O*
  *******
 G*BOyOO*G
********b**
*O*OO*OO*O*
***********
*OgOO*OY*O*
*****g*****
 O*OO*OO*R
 *********
 */

})(window, document);
