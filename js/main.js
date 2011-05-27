$(function() {
  var map = $('#map').avenzaMap({
    url: 'data/sumatra',
    view: {
      initialPanX: 70,
      initialPanY: 100
    }
  });

  map.on('load.xml', function() {
    $('#layer_template')
      .tmpl(map.getLayers())
      .appendTo('.js_layers');
  });

  map.on('load.json', function() {
    var places = map.getPlaces();
    $('#place_template')
      .tmpl(places)
      .appendTo('.js_places');
  });

  $('.js_layers')
    .delegate('li', 'click', function() {
      var layer = map.getLayer($(this).data('name'));
      layer.toggle();

      if ($(this).is('.active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    })
    .delegate('li', 'hover', function() {
      var layer = map.getLayer($(this).data('name'));
      layer.toggleHighlight();
    });

  $('.js_places')
    .delegate('li', 'click', function() {
      var place = map.getPlace($(this).data('name'));
      place.panTo();
    });
});
