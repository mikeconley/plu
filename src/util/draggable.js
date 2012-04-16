define([], function(){
  
  return function( element, options ){

    options = options || {};

    var _downCallback = options.down || function(){},
        _upCallback = options.up || function(){},
        _moveCallback = options.move || function(){},
        _element = element;

    function mouseDownHandler(e){
      var elementRect = _element.getBoundingClientRect();
      _mouseDownOffset = [elementRect.left - e.clientX, elementRect.top - e.clientY];
      window.addEventListener("mouseup", mouseUpHandler, false);
      window.addEventListener("mousemove", mouseMoveHandler, false);
    }

    function mouseUpHandler(e){
      window.removeEventListener("mousemove", mouseMoveHandler, false);
      window.removeEventListener("mouseup", mouseUpHandler, false);
    }

    function mouseMoveHandler(e){
      _element.style.left = e.clientX + _mouseDownOffset[0];
      _element.style.top = e.clientY + _mouseDownOffset[1];
    }

    _element.addEventListener("mousedown", mouseDownHandler, false);

    _element.classList.add("draggable");

  };

});