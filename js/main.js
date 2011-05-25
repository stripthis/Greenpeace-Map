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
});
