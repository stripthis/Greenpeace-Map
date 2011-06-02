$(function() {
  var map = $('#map').avenzaMap({
    url: 'data/sumatra',
    view: {
      initialPanX: 10,
      initialPanY: 80,
      zoomMin:138,
      zoomMax:2000
    }
  });

  map.on('load.xml', function() {
    $('#layer_template')
      //.tmpl(map.getLayers())
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
      var layer = map.getLayer($(this).data('layer'));
      layer.toggle();

      if ($(this).is('.active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    });

  $('.js_places')
    .delegate('li', 'click', function() {
      var place = map.getPlace($(this).data('layer'));
      place.panTo();
    });
});

/* Slideshow */
$(function() {
  $('.slides .slide-nav a').click(function() {
    $('.slides .slide-nav a').removeClass("active");
    $(this).addClass("active")
    $('.slides .slide').hide();
    $('.slides .slide.'+ $(this).attr("id")).show();
    return false;
  });
  $('.slides .slide').hide();
  $('.slides .slide.slide1').show();
  $('.slides .slide-nav a#slide1').addClass("active");
});

