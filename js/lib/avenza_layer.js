function AvenzaLayer() {
  this.map = null;
  this.xmlElement = null;

  this.alpha = 100;
  this.name = null;
  this.visible = null;
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
};

AvenzaLayer.prototype.toggle = function() {
  this.visible = !this.visible;
  this._updateVisibility();
};

AvenzaLayer.prototype.setAlpha = function(alpha) {
  this.alpha = alpha;
  this.map.map.setAlpha(this.name, this.alpha);
};

AvenzaLayer.prototype._updateVisibility = function() {
  this.map.map.setVisible(this.name, this.visible);
};
