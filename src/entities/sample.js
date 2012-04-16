define(["../entity", "../components/dom"], function(Entity, DOMComponent){
  
  return function(){

    var entity = new Entity(),
        domComponent = new DOMComponent();

    domComponent.addClass("sample-entity");

    domComponent.makeDraggable();

    entity.addComponent(domComponent);

    return entity;

  };

});