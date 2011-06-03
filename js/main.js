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

