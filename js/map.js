/**
 * Map Test 1
 * @author rbertot@greenpeace.org
 * @copyright 2011 Greenpeace International
 *
 * See "MAP Web Author JavaScript API" at
 * http://www.avenza.com/mapublisher/mapwebauthor/api
 */
jQuery(function($) {
  var theMap = AVENZA.embedViewer(
    "map", // div#id
    "950", // Width
    "600", // Height
    {
      baseURL:"/map/swf/",
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
      flashSecuritySandbox: AVENZA.AUTO_SANDBOX
    } 
  );
  $('#map-nav #home').click(function() {
    theMap.panHome();
  });

  $('#map-nav #indonesia').click(function() {
    theMap.panToPointAndZoom(500, 450, 900)
  });
});
