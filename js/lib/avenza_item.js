function AvenzaItem() {
  this._map = null;

  this.id = null;
  this.comment = null;
  this.x = null;
  this.y = null;
  this.zoom = null;
}

AvenzaItem.create = function(options) {
  var instance = new this();

  instance._map = options.map;
  $.extend(instance, options.properties);

  return instance;
};

AvenzaItem.prototype.handleClick = function() {
  if (!this.hasCoordinates()) {
    return;
  }

  this.panAndZoomTo();
};

AvenzaItem.prototype.hasCoordinates = function() {
  return this.x !== null || this.y !== null || this.zoom !== null;
};

AvenzaItem.prototype.panAndZoomTo = function() {
  this._map.map.panToPointAndZoom(this.x, this.y, this.zoom);
};
