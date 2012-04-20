define(["../entity", "../components/dom"], function(Entity, DOMComponent){
  
  return function(position){

    var entity = new Entity(position),
        domComponent = new DOMComponent(position);

    domComponent.addClass("sample-entity");

    entity.addComponent(domComponent);

    return entity;

  };

});