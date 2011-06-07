function AvenzaLayer() {
  this.map = null;
  this.xmlElement = null;

  this.alpha = 100;
  this.name = null;
  this.visible = null;

  this.hidden = true;
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
  this.visible = $(this.xmlElement).attr('visible') === 'true';
};

AvenzaLayer.prototype.hide = function() {
  this.visible = false;
  this._updateVisibility();
};

AvenzaLayer.prototype.show = function() {
  this.visible = true;
  this._updateVisibility();
  this.handleZoomChange(this.map.getZoom());
};

AvenzaLayer.prototype.toggle = function() {
  this.visible = !this.visible;
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

  var hide = (
    (!!this.hiddenAbove && zoom.zoom > this.hiddenAbove)
    || (!!this.hiddenBelow && zoom.zoom < this.hiddenBelow)
  );

  if (hide && this.visible) {
    this.hidden = true;
    this._setVisibility(false);
  } else if (!hide && this.visible) {
    this.hidden = false;
    this._setVisibility(true);
  }
};

AvenzaLayer.prototype._updateVisibility = function() {
  this._setVisibility(this.visible);
};

AvenzaLayer.prototype._setVisibility = function(visibility) {
  this.map.map.setVisible(this.name, visibility);
};
