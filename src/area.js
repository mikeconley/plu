define(["entity", "physics/world"], function(Entity, PhysicsWorld){
  
  return function(){

    var _entities = [],
        _element = document.createElement("div"),
        _physics = new PhysicsWorld(),
        _this = this;

    _element.classList.add("area");

    this.addEntity = function(entity){
      _entities.push(entity);
      if(entity._components.dom){
        _element.appendChild(entity._components.dom._element);
      }
    };

    this.removeEntity = function(entity){
      _entities.splice(_entities.indexOf(entity), 1);
    };

    document.body.appendChild(_element);;

    _this._entities = _entities;
    _this._element = _element;

  };

});