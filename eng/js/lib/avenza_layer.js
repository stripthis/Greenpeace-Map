function AvenzaLayer() {
  this.map = null;
  this.xmlElement = null;

  this.alpha = 100;
  this.name = null;
  this.activated = null;

  this.hidden = false;
  this.hiddenAbove = null;
  this.hiddenBelow = null;

  this.highlighted = false;
}

AvenzaLayer.create = function(options) {
  var avenzaLayer = new AvenzaLayer();

  $.extend(avenzaLayer, options);
  avenzaLayer._initialize();

  return avenzaLayer;
};

AvenzaLayer.prototype._initialize = function() {
  this.name = $(this.xmlElement).attr('name');
  this.activated = $(this.xmlElement).attr('visible') === 'true';
};

AvenzaLayer.prototype.activate = function() {
  this.activated = true;
  this._updateVisibility();
};

AvenzaLayer.prototype.deactivate = function() {
  this.activated = false;
  this._updateVisibility();
};

AvenzaLayer.prototype.toggle = function() {
  this.activated = !this.activated;
  this._updateVisibility();
};

AvenzaLayer.prototype.setAlpha = function(alpha) {
  this.alpha = alpha;
  this.map.map.setAlpha(this.name, this.alpha);
};

AvenzaLayer.prototype.handleZoomChange = function(zoom) {
  if (!this.hiddenAbove && !this.hiddenBelow) {
    return;
  }

  this.hidden = (
    (!!this.hiddenAbove && zoom.zoom > this.hiddenAbove)
    || (!!this.hiddenBelow && zoom.zoom < this.hiddenBelow)
  );

  this._updateVisibility();
};

AvenzaLayer.prototype._updateVisibility = function() {
  this._setVisibility(this.activated && !this.hidden);
};

AvenzaLayer.prototype._setVisibility = function(visibility) {
  this.map.map.setVisible(this.name, visibility);
};
