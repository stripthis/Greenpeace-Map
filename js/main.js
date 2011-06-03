$(function() {
  var map = $('#map').avenzaMap({
    url: 'data/sumatra',
    view: {
      initialPanX: 20,
      initialPanY: 5,
      zoomMin:102,
      zoomMax:2000
    }
  });

  map.on('zoomChange', function(current) {
    ['APP mills BOB', 'map_L6.swf'].forEach(function(name) {
      var layer = map.getLayer(name);

      (current.zoom > 950)
        ? layer.hide()
        : layer.show();
    });
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
    .delegate('.js_place', 'click', function() {
      var $this = $(this);

      $('.js_places .js_place').removeClass('active');
      $this.addClass('active');

      var itemId = $(this).data('itemid');
      map.panAndZoomTo(itemId);

      return false;
    });

  /* at startup show navigation */
  $('#map-layers').show();
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

