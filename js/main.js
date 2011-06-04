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

  /* pages and tabs navigation */
  function activatePage(pageId) {
    $('.page-nav a').removeClass('active');
    $('.page-nav a#'+pageId).addClass('active');
    $('.pages .page').hide();
    $('.pages .page.'+pageId).show();
    activateTab(pageId,null);
  }
  function activateTab(pageId,slideId) {
    if(pageId!=null) {
      pageId='.'+pageId;
    } else pageId='';
    if(slideId==null) {
      slideId = $('.slides'+pageId+' .slide-nav a.first').attr('id');
    }
    $('.slides .slide').hide();
    $('.slides' + pageId + ' .slide.' + slideId).show();
    $('.slide-nav a').removeClass('active');
    $('.slide-nav a#'+slideId).addClass('active');
  }

  /* Pages */
  $('.page-nav a').click(function() {
    activatePage($(this).attr('id'));
  });

  /* Tabs */
  $('.slides .slide-nav a').click(function() {
    activateTab(null,$(this).attr('id'));
    return false;
  });

  activatePage($('.page-nav a.first').attr('id'));
  $('#map-layers').show();
});
