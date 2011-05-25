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

  $('.js_layers')
    .delegate('li', 'click', function() {
      var layer = map.getLayer($(this).data('layer'));
      layer.toggle();

      if ($(this).is('.active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    })
    .delegate('li', 'hover', function() {
      var layer = map.getLayer($(this).data('layer'));
      layer.toggleHighlight();
    });
});
