(function(){

  var ctx = require.config({
    baseUrl: "src",
    context: "object-editor",
    paths: {
      "editor": "object-editor"
    }
  });

  ctx([ "area",
        "schedule",
        "entities/sample",
        "util/draggable",
        "entity-collection"
      ],
      function(
        Area,
        Schedule,
        SampleEntity,
        Draggable,
        EntityCollection
      ){

    Schedule.addStage("input");
    Schedule.addStage("update");
    Schedule.addStage("render");

    var _area = new Area(),
        _selectedEntities = new EntityCollection();

    function joinEntities(){
      
    }

    function dragEntities(position){
      console.log(position);
    }

    function entityKeyDownHandler(e){
      console.log(e.which);
      _selectedEntities.eachComponent("transform", function(entity, component){
        var rotation;
        if(e.which === 13){
          joinEntities();
        }
        else if(e.shiftKey){
          rotation = component._rotation;
          if(e.which === 37){
            rotation[1] -= 20;
            component.setRotation(rotation);
          }
          else if(e.which === 39){
            rotation[1] += 20;
            component.setRotation(rotation);
          }
        }
        else if(e.altKey){
          rotation = component._rotation;
          if(e.which === 37){
            rotation[2] -= 20;
            component.setRotation(rotation);
          }
          else if(e.which === 39){
            rotation[2] += 20;
            component.setRotation(rotation);
          }
        }
      });
    }

    function deselectEntities(){
      _selectedEntities.eachComponent("dom", function(entity, component){
        component.unfocus();
      });
      _selectedEntities.clear();
    }

    function selectEntity(entity, collectionFlag){
      var domComponent,
          entities = _area._entities;
      if(collectionFlag){
        domComponent = entity._components.dom;
        if(_selectedEntities.contains(entity)){
          _selectedEntities.remove(entity);
          domComponent.unfocus();
        }
        else{
          _selectedEntities.add(entity);
          domComponent.focus();
        }
      }
      else{      
        _selectedEntities.eachComponent("dom", function(otherEntity, component){
          if(otherEntity !== entity){
            component.unfocus();
          }
        });
        _selectedEntities.clear();
        _selectedEntities.add(entity);
        entity._components.dom.focus();
      }
      window.addEventListener("keydown", entityKeyDownHandler,false);
    }

    function createEntity(position){
      var entity = new SampleEntity(position),
          domComponent = entity._components.dom,
          element = domComponent._element;

      function elementClickedHandler(e){
        selectEntity(entity, e.shiftKey);
      }
      element.addEventListener("mousedown", elementClickedHandler, false);

      _area.addEntity(entity);
      selectEntity(entity);

      Draggable(element, {
        move: function(position){
          dragEntities(position);
        },
        up: function(position){
          dragEntities(position);
        }
      });

    }

    _area._element.addEventListener("click", function(e){
      if(e.altKey){
        createEntity([e.clientX - 10, e.clientY - 10]);
      }
      else if(e.target === _area._element){
        deselectEntities();  
      }
    }, false);

    Schedule.start();
  });

}());
