define([], function(){
  
  return function(){

    var _this = this,
        _keys = {};

    function keyDownHandler(e){
      keys[e.which] = true;
    }

    function keyUpHandler(e){
      keys[e.which] = false;
    }

    _this.enable = function(){
      window.addEventListener("keydown", keyDownHandler, false);
    };

    _this.disable = function(){
      window.removeEventListener("keydown", keyDownHandler, false);
    };

    _this.test = function(key){
      return !!keys[key];
    }

  };

});