$(function() {
  var map = $('#map').avenzaMap({
    url: 'data/sumatra',
    view: {
      initialPanX: 70,
      initialPanY: 100
    }
  });

  map.on('load.xml', function() {
    var layers = map.getLayers();
    $(layers).each(function() {
      console.log(this.name);
    });
  });
});
