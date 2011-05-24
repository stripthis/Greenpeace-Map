/**
 * Greenpeace Map Application API
 * @author rbertot@greenpeace.org
 * @copyright 2011 Greenpeace International
 *
 * See "MAP Web Author JavaScript API" at
 * http://www.avenza.com/mapublisher/mapwebauthor/api
 */
jQuery(function($) {
  $.fn.jMap = function(o) {
    o = $.extend({
      'width':'950',
      'height':'600',
      'baseURL':'/'
    }, o || {});

    return theMap = AVENZA.embedViewer(
      this.attr('id'),
      o.width, o.height,
      {
        baseURL:o.baseURL,
        initialZoom:200,
        initialPanX:200,
        initialPanY:600,
        useCentroidForCallouts:true,
        panWidget: false,
        zoomWidget: true,
        searchWidget: false,
        layerWidget: true,
        overviewWidget: false,
        zoomMin:200,
        zoomMax:5000,
        flashSecuritySandbox: AVENZA.AUTO_SANDBOX,
        loadedCB: function () {
          init();
        }
      }
    );
  };
    
    function init() {
      alert('init');
    }

});
/**
 * Main, map initiatialisation
 */
jQuery(document).ready(function($){
  var theMap = $('#map').jMap({
    'baseURL':'/map/swf'
  });
  var m = theMap.element();
  if(m) {
    alert('m');
    $('#map-nav #home').click(function() {
      m.panHome();
    });
    $('#map-nav #indonesia').click(function() {
      m.panToPointAndZoom(500, 450, 900)
    });
    // safely add an event listener for all browsers
    if (window.addEventListener) {
      m.addEventListener("mousemove", onMouseMove, false);
    } 
    else if (window.attachEvent) { // IE
      m.attachEvent("onmousemove", onMouseMove);
    }
  }

  function onMouseMove (event) {
    var f = m.retrieve(AVENZA.FEATURE);
    if (f.attributes) {
      alert(f.attributes.name);
      $("#popup").css("top", event.pageY+20);
      $("#popup").css("left", event.pageX+20);
      $("#popup").css("visibility", "visible");
      $("#name").html(f.attributes.name);   
      $("#stopid").html(f.attributes.stopid);
      $("#accesible").html(f.attributes.accessible);
      $("#Latitude").html(f.attributes.latitude);
      $("#Longitude").html(f.attributes.longitude);
      $("#sundayonly").html(f.attributes.sundayonly);
      $("#trapezeid").html(f.attributes.trapezeid); 
    } else {
      $("#popup").css("visibility", "hidden");
    }
  }


});
