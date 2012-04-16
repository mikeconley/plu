define(["./component"], function(Component){

  return Component("transform", function(entity){

    var _position = [0, 0],
        _rotation = [0, 0],
        _scale = [0, 0];

    var _this = this,
        _events = _this._events;

    this.setPosition = function(position){
      _this._position = _position = position;
      _events.dispatch("position-changed");
    };

    this.setRotation = function(rotation){
      _this._position = _rotation = rotation;
      _events.dispatch("rotation-changed");
    };

    this.setScale = function(scale){
      _this._scale = _scale = scale;
      _events.dispatch("scale-changed");
    };

    this._position = _position;
    this._rotation = _rotation;
    this._scale = _scale;

  });
  
});