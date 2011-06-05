$(function() {
  var mapConfig = {
    'sumatra' : {
      initialPanX: 0,
      initialPanY: 0,
      zoomMin:100,
      zoomMax:2000
    } ,
    'toy' : {
      initialPanX: 0,
      initialPanY: 0,
      zoomMin:100,
      zoomMax:100,
      zoomWidget: false,
    }
  };
  var map = $('#map').avenzaMap({
    url: 'data/'+$('#map').attr('class'),
    view: mapConfig[$('#map').attr('class')]
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
      var item = map.getItem(itemId);

      item.panAndZoomTo();

      return false;
    });

  // Only here temporary, to make it easier to test the callouts
  map.on('ready', function() {
    var study = map.getItem('04e57760-8d42-11e0-91e4-0');
    study.panAndZoomTo();
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
