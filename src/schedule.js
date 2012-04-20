define([], function(){

  var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
  })();

  var __stages = {},
      __orderedStages = [],
      __stopFlag = true;

  function orderStages(){
    var list = [];
    for(var stage in __stages){
      list.push(__stages[stage]);
    }
    __orderedStages = list.sort(function(a, b){
      a.order > b.order;
    });
  }

  function mainLoop(){
    if(!__stopFlag){
      for(var s=0, sl=__orderedStages.length; s<sl; ++s){
        var list = __orderedStages[s].callbacks.slice();
        for(var i=0, l=list.length; i<l; ++i){
          list[i]();
        }      
      }
      requestAnimFrame(mainLoop);  
    }
  }

  return {

    addStage: function(name, order){
      __stages[name] = {
        order: order,
        callbacks: []
      };
      orderStages();
    },

    schedule: function(stage, callback){
      __stages[stage].callbacks.push(callback);
    },

    start: function(){
      __stopFlag = false;
      requestAnimFrame(mainLoop);
    },

    stop: function(){
      __stopFlag = true;
    }

  };

});