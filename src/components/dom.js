define(["./component", "util/draggable"], function(Component, Draggable){
  
  return Component( "dom", function(entity){

    var _element = document.createElement("div"),
        _this = this;

    _element.classList.add("dom-component");

    _this.addClass = function(className){
      _element.classList.add(className);
    };

    _this.removeClass = function(className){
      _element.classList.remove(className);
    };

    _this.setId = function(id){
      _element.id = id;
    };

    _this.makeDraggable = function(){
      Draggable(_element);
    };

    _this._element = _element;

  });

});