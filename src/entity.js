define(["components/transform", "events"], function(TransformComponent, Events){
  
  return function(position){

    var _this = this,
        _events = new Events(_this);

    var _components = {
          transform: new TransformComponent(_this)
        },
        _componentArray = [
          _components["transform"]
        ];

    if(position){
      _components.transform.setPosition(position);
    }

    this._components = _components;

    this.addComponent = function(component){
      _components[component._name] = component;
      _componentArray.push(component);
      component.setEntity(_this);
      _events.dispatch("component-added", component);
    };

    this.removeComponent = function(component){
      delete _components[component._name];
      _componentArray.splice(_componentArray.indexOf(component), 1);
      component.setEntity(null);
      _events.dispatch("component-removed", component);
    };

  };

});