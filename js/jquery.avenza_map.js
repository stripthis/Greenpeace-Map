(function($) {

$.fn.avenzaMap = function(options) {
  var map = this.data('AvenzaMap');
  if (map) {
    return map;
  }

  options = options || {};
  options.$element = this;

  map = AvenzaMap.create(options);
  this.data('AvenzaMap', map);
  return map;
};

function AvenzaMap() {
  EventEmitter.call(this);

  this.$element = null;

  this.url = null;
  this.view = {};
  this.map = null;

  this.mapLoaded = false;
  this.xml = null;
  this.json = null;
};
AvenzaMap.prototype = EventEmitter.prototype;

AvenzaMap.VIEW_DEFAULTS = {
  viewerBaseURL: 'swf/avenza',
  panWidget: false,
  searchWidget: false,
  layerWidget: false,
  overviewWidget: false,
  zoomMin:150,
  zoomMax:3000,
  useCentroidForCallouts:true,
  flashSecuritySandbox: AVENZA.AUTO_SANDBOX
};

AvenzaMap.create = function(options) {
  var avenzaMap = new AvenzaMap();

  $.extend(avenzaMap, options);
  avenzaMap.view = $.extend({}, AvenzaMap.VIEW_DEFAULTS, avenzaMap.view);
  avenzaMap.view.baseURL = avenzaMap.url;

  avenzaMap._initialize();

  return avenzaMap;
};

AvenzaMap.prototype._initialize = function() {
  this._embedd();
  this._load(this.url + '/map.xml', 'xml');
  this._load(this.url + '/map.json', 'json');
};

AvenzaMap.prototype._embedd = function() {
  var self = this;
  this.view.loadedCB = function() {
    self.mapLoaded = true;
    self._checkIfLoaded();
  };

  var size = this.getSize();
  this.map = AVENZA.embedViewer(
    this.$element.attr('id'),
    size.width,
    size.height,
    this.view
  );
};


AvenzaMap.prototype._load = function(url, variable) {
  var self = this;

  var request = $.get(url, function(response) {
    self[variable] = response;
    self.emit('load.' + variable);
    self._checkIfLoaded();
  });

  request.error(function(response, status) {
    self._error(new Error(status + ': could not load: ' + url));
  });
};

AvenzaMap.prototype._checkIfLoaded = function() {
  if (!this.mapLoaded || !this.xml || !this.json) {
    return;
  }

  this.emit('ready');
};

AvenzaMap.prototype._error = function(err) {
  this.emit('error');
};

AvenzaMap.prototype.getSize = function() {
  return {
    width: this.$element.width(),
    height: this.$element.height()
  };
};

AvenzaMap.prototype.getLayers = function() {
  var self = this;

  var layers = [];
  $('layer', this.xml).each(function() {
    var layer = AvenzaLayer.create({
      map: self.map,
      xmlElement: this
    });
    layers.push(layer);
  });

  return layers;
};


function AvenzaLayer() {
  this.map = null;
  this.xmlElement = null;

  this.name = null;
  this.visible = null;
}

AvenzaLayer.create = function(options) {
  var avenzaLayer = new AvenzaLayer();

  $.extend(avenzaLayer, options);
  avenzaLayer._initialize();

  return avenzaLayer;
};

AvenzaLayer.prototype._initialize = function() {
  this.name = $(this.xmlElement).attr('name');
  this.visible = $(this.xmlElement).attr('visible');
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

AvenzaLayer.prototype._updateVisibility = function() {
  this.map.setVisible(this.name, this.visible);
};

})(jQuery);
