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
  this.$callout = null;

  this.url = null;
  this.view = {};
  this.map = null;
  this._layers = null;

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

  var self = this;
  $(window).mousemove(function(e) {
    self._handleMouseMove(e);
  });
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

AvenzaMap.prototype._handleMouseMove = function(e) {
  var callout = this.map.retrieve(AVENZA.FEATURE);

  if (this.$callout) {
    this.$callout.remove();
  }

  if (!callout || !callout.attributes) {
    return;
  }

  callout = this._getTranslation(callout);

  this.$callout = $('#callout_template')
    .tmpl(callout)
    .appendTo('body')
    .css({
      left: (e.pageX + 20) + 'px',
      top: (e.pageY + 20) + 'px'
    });
};

AvenzaMap.prototype._getTranslation = function(callout) {
  var translatedCallout = this.json.callouts[callout.title];
  if (translatedCallout) {
    return translatedCallout;
  }

  return callout;
};

AvenzaMap.prototype._checkIfLoaded = function() {
  if (!this.mapLoaded || !this.xml || !this.json) {
    return;
  }

  this.emit('ready');
};

AvenzaMap.prototype._error = function(err) {
  this.emit('error', err);
};

AvenzaMap.prototype.getSize = function() {
  return {
    width: this.$element.width(),
    height: this.$element.height()
  };
};

AvenzaMap.prototype.getLayers = function() {
  if (this._layers) {
    return this._layers;
  }

  var self = this;

  var layers = [];
  $('layer', this.xml).each(function() {
    var layer = AvenzaLayer.create({
      map: self,
      xmlElement: this
    });
    layers.push(layer);
  });

  return this._layers = layers;
};

AvenzaMap.prototype.getLayer = function(name) {
  var layers = this.getLayers();
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    if (layer.name === name) {
      return layer;
    }
  }
};
