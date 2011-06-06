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
AvenzaItem.prototype.handleMouseover = function(e) {
  this.showCallout(e.pageX, e.pageY);
};
AvenzaItem.prototype.handleClick = function(e) {
  if (this.hasCoordinates()) {
    this.panAndZoomTo();
    return;
  }

  //this.showCallout(e.pageX, e.pageY);
};

AvenzaItem.prototype.hasCoordinates = function() {
  return this.x !== null || this.y !== null || this.zoom !== null;
};

AvenzaItem.prototype.panAndZoomTo = function() {
  this._map.panAndZoomTo(this);
};

AvenzaItem.prototype.showCallout = function(x, y) {
  this._map.showCallout(this, x, y);
};
