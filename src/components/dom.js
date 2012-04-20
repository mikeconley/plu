define(["./component", "util/draggable", "schedule"], function(Component, Draggable, Schedule){
  
  return Component( "dom", function(position){

    var _element = document.createElement("div"),
        _transformComponent = null,
        _entity = null,
        _renderFlag = true,
        _focused = false,
        _this = this;

    function transformChangedHandler(e){
      _renderFlag = true;
    }

    function useTransformComponent(transformComponent){
      if(_transformComponent){
        _transformComponent.unlisten("position-changed", transformChangedHandler);
        _transformComponent.unlisten("rotation-changed", transformChangedHandler);
        _transformComponent.unlisten("scale-changed", transformChangedHandler);
      }
      _transformComponent = transformComponent;
      if(_transformComponent){
        _transformComponent.listen("position-changed", transformChangedHandler);
        _transformComponent.listen("rotation-changed", transformChangedHandler);
        _transformComponent.listen("scale-changed", transformChangedHandler);
      }
    }

    function componentAddedHandler(e){
      if(!_transformComponent && e.data._name === "transform"){
        _transformComponent = e.data;
      }
    }

    function componentRemovedHandler(e){
      if(e.data === _transformComponent){
        _transformComponent = null;
      }
    }

    _element.classList.add("dom-component");

    _this._onEntityChanged = function(entity){
      if(_entity){
        _entity.unlisten("component-added", componentAddedHandler);
        _entity.unlisten("component-removed", componentRemovedHandler);
      }
      _entity = entity;
      _entity.listen("component-added", componentAddedHandler);
      _entity.listen("component-removed", componentRemovedHandler);
      useTransformComponent(_entity._components.transform);
    };

    _this.addClass = function(className){
      _element.classList.add(className);
    };

    _this.removeClass = function(className){
      _element.classList.remove(className);
    };

    _this.setId = function(id){
      _element.id = id;
    };

    _this.toggleFocus = function(){
      if(_focused){
        _this.unfocus();
      }
      else{
        _this.focus();
      }
    };

    _this.isFocused = function(){
      return _focused;
    };

    _this.focus = function(){
      _focused = true;
      _element.setAttribute( "data-plu-focused", true );
    };

    _this.unfocus = function(){
      _focused = false;
      _element.removeAttribute( "data-plu-focused" );
    };

    Schedule.schedule("render", function(){
      if(_renderFlag && _transformComponent){
        var position = _transformComponent._position,
            rotation = _transformComponent._rotation,
            rotationString = "rotateX(" + rotation[0] + "deg) rotateY(" + rotation[1] + "deg) rotateZ(" + rotation[2] + "deg)";
        _element.style.left = position[0] + "px";
        _element.style.top = position[1] + "px";
        _element.style.transform = rotationString;
        _element.style.MozTransform = rotationString;
        _element.style.webkitTransform = rotationString;
        _renderFlag = false;
      }
    });

    if(position){
      _element.style.left = position[0] + "px";
      _element.style.top = position[1] + "px";
    }

    _this._element = _element;

  });

});