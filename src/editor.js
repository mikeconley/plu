define(["entities/sample"], function(SampleEntity){
  
  return function(area){

    var _area = area,
        _this = this;

    _area._element.addEventListener("click", function(e){
      if(e.shiftKey){
        var entity = new SampleEntity();
        _area.addEntity(entity);
      }
    }, false);

  };

});