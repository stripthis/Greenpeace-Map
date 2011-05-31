function AvenzaPlace() {
  this._map = null;

  this.x = null;
  this.y = null;
  this.zoom = null;
}

AvenzaPlace.create = function(options) {
  var avenzaPlace = new this();

  avenzaPlace._map = options.map;
  $.extend(avenzaPlace, options.json);

  return avenzaPlace;
};

AvenzaPlace.prototype.panTo = function() {
  var map = this._map.map;
  map.panToPointAndZoom(this.x, this.y, this.zoom)
};
