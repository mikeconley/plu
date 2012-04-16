define(["area", "entities/sample"], function(Area, SampleEntity){
  
  var area = new Area();

  var sampleEntity = SampleEntity();

  area.addEntity(sampleEntity);

});