define(["draggable"], function(Draggable){
  
  return function(){

    var _this = this,
        _draggables = [];

    function downHandler(){

    }

    function upHandler(){

    }

    function moveHandler(){
      
    }

    _this.add = function(element){
      _draggables.push(new Draggable(element, {
        down: downHandler,
        up: upHandler,
        move: moveHandler
      }));
    };

    _this.remove = function(element){
      for(var i=0, l=_draggables.length; i<l; ++i){
        if(_draggables[i]._element === element){
          _draggables.splice(i, 1);
          break;
        }
      }
    };

  };

});