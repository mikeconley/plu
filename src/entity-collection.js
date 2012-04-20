define([], function(){
  
  return function(){

    var _entities = [],
        _this = this;

    _this.add = function(entity){
      _entities.push(entity);
    };

    _this.remove = function(entity){
      _entities.splice(_entities.indexOf(entity), 1);
    };

    _this.each = function(callback){
      for(var i=0, l=_entities.length; i<l; ++i){
        callback(_entities[i]);
      }
    };

    _this.eachComponent = function(componentName, callback){
      var entity, component;
      for(var i=0, l=_entities.length; i<l; ++i){
        entity = _entities[i];
        component = entity._components[componentName];
        if(component){
          callback(entity, component);
        }
      }
    };

    _this.contains = function(entity){
      return _entities.indexOf(entity) > -1;
    };

    _this.clear = function(){
      _entities = [];
    };

  }

});