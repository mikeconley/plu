define(["components/transform"], function(TransformComponent){
  
  return function(){

    var _this = this;

    var _components = {
          transform: new TransformComponent(_this)
        },
        _componentArray = [
          _components["transform"]
        ];

    this._components = _components;

    this.addComponent = function(component){
      _components[component._name] = component;
      _componentArray.push(component);
    };

    this.removeComponent = function(component){
      delete _components[component._name];
      _componentArray.splice(_componentArray.indexOf(component), 1);
    };

  };

});