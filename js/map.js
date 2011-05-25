/**
 * Greenpeace Map Application
 * @author rbertot@greenpeace.org
 * @copyright 2011 Greenpeace International
 *
 * See "MAP Web Author JavaScript API" at
 * http://www.avenza.com/mapublisher/mapwebauthor/api
 */
theMap = AVENZA.embedViewer(
  'map','960','450',
  {
    baseURL:'data',
    viewerBaseURL: 'swf/avenza',
    initialZoom:100,
    initialPanX:000,
    initialPanY:100,
    useCentroidForCallouts:true,
    panWidget: false,
    zoomWidget: true,
    searchWidget: false,
    layerWidget: false,
    overviewWidget: false,
    zoomMin:150,
    zoomMax:3000,
    flashSecuritySandbox: AVENZA.AUTO_SANDBOX,
    loadedCB: function () {
      init();
    }
  }
);

$.get('data/map.xml', function(map) {
  $('layer', map).each(function() {
    var $layer = $(this);
    if ($(this).attr('visible') !== 'true') {
      return;
    }

    console.log($layer.attr('name'));
  });
});

function init() {
  var m = theMap.element();
  var show = true;
  if(m) {
    // Locations;
    $('.main.nav .home').click(function() {
      m.panHome();
    });
    $('.main.nav #sumatra').click(function() {
      m.panToPointAndZoom(0, 250, 200)
    });
    if (window.addEventListener) {
      m.addEventListener("mousemove", onMouseMove, false);
    }
    else if (window.attachEvent) { // IE
      m.attachEvent("onmousemove", onMouseMove);
    }
    // Layers
    $('#orangutan').click(function() {
      //m.panHome();
      show = !show;
      theMap.setVisible('Orangutan', show);
    });

  }
}

function onMouseMove (event) {
  var f = theMap.retrieve(AVENZA.FEATURE);
  //var f = theMap.retrieve(AVENZA.ATTRIBUTES);
  //alert(f.attributes.name);

  if (f.attributes) {
    $("#popup").css("top", event.pageY+20);
    $("#popup").css("left", event.pageX+20);
    $("#popup").css("visibility", "visible");
    $("#popup .name").html(f.attributes.name);
    $("#popup .stopid").html(f.attributes.stopid);
    $("#popup .latitude").html(f.attributes.latitude);
    $("#popup .longitude").html(f.attributes.longitude);
    // $("#popup .accesible").html(f.attributes.accessible);
    // $("#popup .sundayonly").html(f.attributes.sundayonly);
    // $("#popup .trapezeid").html(f.attributes.trapezeid);
  } else {
    $("#popup").css("visibility", "hidden");
  }
}
