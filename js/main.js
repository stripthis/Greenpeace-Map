$(function() {
  var map = $('#map').avenzaMap({
    url: 'data/sumatra',
    view: {
      initialPanX: 70,
      initialPanY: 100
    },
    onSuccess: function() {
      var layers = map.getLayers();
      $(layers).each(function() {
        console.log(this.name);
      });
    },
    onError: function(err) {
      throw err;
    }
  });

});
