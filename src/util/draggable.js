define([], function(){
  
  return function( element, options ){

    options = options || {};

    var _downCallback = options.down || function(){},
        _upCallback = options.up || function(){},
        _moveCallback = options.move || function(){},
        _mouseOrigin,
        _element = element,
        _this = this;

    function mouseDownHandler(e){
      if(e.which !== 1){
        return;
      }
      var elementRect = _element.getBoundingClientRect();
      _mouseDownOffset = [elementRect.left - e.clientX, elementRect.top - e.clientY];
      _mouseOrigin = [e.clientX, e.clientY];
      window.addEventListener("mouseup", mouseUpHandler, false);
      window.addEventListener("mousemove", mouseMoveHandler, false);
      _downCallback(_element);
    }

    function mouseUpHandler(e){
      window.removeEventListener("mousemove", mouseMoveHandler, false);
      window.removeEventListener("mouseup", mouseUpHandler, false);
      _upCallback([e.clientX - _mouseOrigin[0] + _mouseDownOffset[0], e.clientY - _mouseOrigin[1] + _mouseDownOffset[1]]);
    }

    function mouseMoveHandler(e){
      _moveCallback([e.clientX - _mouseOrigin[0] + _mouseDownOffset[0], e.clientY - _mouseOrigin[1] + _mouseDownOffset[1]]);
    }

    _element.addEventListener("mousedown", mouseDownHandler, false);

    _element.classList.add("draggable");

    _this.destroy = function(){
      window.removeEventListener("mousemove", mouseMoveHandler, false);
      window.removeEventListener("mouseup", mouseUpHandler, false);
      _element.removeEventListener("mousedown", mouseDownHandler, false);
      _element.classList.remove("draggable");
    };

    _this._element = _element;

  };

});