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
  this._places = null;

  this.mapLoaded = false;
  this.xml = null;
  this.json = null;
};
AvenzaMap.prototype = EventEmitter.prototype;

AvenzaMap.VIEW_DEFAULTS = {
  viewerBaseURL: 'swf/avenza',
  styleSheet:'css/map-viewer.css',
  panWidget: false,
  searchWidget: false,
  layerWidget: false,
  overviewWidget: false,
  zoomWidget: true,
  disableAnimations: true,
  useCentroidForCallouts:true,
	hoverCalloutBubble:false,
	clickCalloutBubble:false,
	useClickCalloutForHover:true,
  flashSecuritySandbox: AVENZA.AUTO_SANDBOX
};

AvenzaMap.create = function(options) {
  var avenzaMap = new this();

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
  this._monitorZoom();

  $(window).click(this._handleClick.bind(this));
  $('.map-holder').mousemove(this._handleMouseover.bind(this));

};

AvenzaMap.prototype._monitorZoom = function() {
  var previousZoom = 0;

  setInterval(function() {
    var current = this.map.retrieve(AVENZA.PAN_AND_ZOOM);
    if (!current) {
      return;
    }

    if (current.zoom === previousZoom) {
      return;
    }

    previousZoom = current.zoom;
    this._handleZoomChange(current);
  }.bind(this), 100);
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

AvenzaMap.prototype._load = function(url, type) {
  var self = this;

  var request = $.get(url, function(response) {
    self[type] = response;
    self.emit('load.' + type);
    self._checkIfLoaded();
  }, type);

  request.error(function(response, status) {
    self._error(new Error(status + ': could not load: ' + url));
  });
};

AvenzaMap.prototype._handleMouseover = function(e) {
  var item = this._getActiveItem();
  if (!item) {
    this.removeCallout();
    return;
  }
  this.emit('item.mouseover', item, e);
  item.handleMouseover(e);
}

AvenzaMap.prototype._handleClick = function(e) {
  var item = this._getActiveItem();
  var isClickOnCallout = $(e.target).closest('.js_callout').length > 0;
  if (!item) {
    if (!isClickOnCallout) {
      this.removeCallout();
    }
    return;
  }
  this.emit('item.click', item, e);
  item.handleClick(e);
};

AvenzaMap.prototype._handleZoomChange = function(current) {
  this.emit('zoomChange', current);
};

AvenzaMap.prototype.getItem = function(id) {
  var properties = this.json.items[id] || {};

  properties.id = id;

  return AvenzaItem.create({
    map: this,
    properties: properties
  });
};

AvenzaMap.prototype._getActiveItem = function() {
  var feature = this.map.retrieve(AVENZA.FEATURE);
  if (!feature || !feature.attributes) {
    return;
  }

  var id = feature.attributes.UUID;
  return this.getItem(id);
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

AvenzaMap.prototype.getPlaces = function() {
  if (this._places) {
    return this._places;
  }

  var self = this;
  var places = [];
  $(this.json.places).each(function() {
    var place = AvenzaPlace.create({
      map: self,
      json: this
    });
    places.push(place);
  });

  return this._places = places;
};

AvenzaMap.prototype.getPlace = function(name) {
  var places = this.getPlaces();

  for (var i = 0; places.length; i++) {
    var place = places[i];
    if (place.name === name) {
      return place;
    }
  }
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

AvenzaMap.prototype.panAndZoomTo = function(item) {
  this.map.panToPointAndZoom(item.x, item.y, item.zoom);
};

AvenzaMap.prototype.showCallout = function(item, x, y) {
  this.removeCallout();

  var $callout = $('#callout_template')
    .tmpl(item)
    .css({
      top: (y + 20) + 'px',
      left: (x + 20) + 'px'
    })
    .appendTo('.js_appcontainer');

  this.$callout = $callout;
};

AvenzaMap.prototype.removeCallout = function() {
  if (!this.$callout) {
    return;
  }

  this.$callout.remove();
  this.$callout = null;
};
