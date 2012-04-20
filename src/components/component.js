define(["../events"], function(Events){
  
  return function(name, ctor){
    return function(){
      var obj = {};

      obj._name = name;

      obj._events = new Events(obj);

      obj.setEntity = function(entity){
        obj._entity = entity;
        if(obj._onEntityChanged){
          obj._onEntityChanged(entity);
        }
      };

      obj._entity = null;

      ctor.apply(obj, arguments);
      
      return obj;

    };
  };

});