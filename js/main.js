$(function() {
  var map = $('#map').avenzaMap({
    url: 'data/sumatra',
    view: {
      initialPanX: 70,
      initialPanY: 100
    },
    onSuccess: function() {
      console.log('success');
    },
    onError: function() {

    }
  });

});
