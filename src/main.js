define(["area", "editor", "schedule"], function(Area, Editor, Schedule){
  
  Schedule.addStage("input");
  Schedule.addStage("update");
  Schedule.addStage("render");

  var area = new Area();

  var editor = new Editor(area);

  Schedule.start();

});