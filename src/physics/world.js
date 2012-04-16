define([], function(){
  
  return function(){
    var gravity = new Box2D.b2Vec2(0.0, -10.0),
        world = new Box2D.b2World(gravity),
        bd_ground = new Box2D.b2BodyDef(),
        ground = world.CreateBody(bd_ground);  
  };

});