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
  this.$element = null;
  this.url = null;
  this.view = {};
  this.map = null;
  this.xml = {};
  this.mapLoaded = false;
  this.onSuccess = function() {};
  this.onError = function() {};
};

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
  this._loadMapXml();
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

AvenzaMap.prototype._loadMapXml = function() {
  var self = this;
  var url = this.url + '/map.xml';

  $.get(url, function(xml, status) {
    if (status !== 'success') {
      self._error(new Error(status + ': could not load: ' + url));
      return;
    }

    self.xml = xml;
    self._checkIfLoaded();
  });
};

AvenzaMap.prototype._checkIfLoaded = function() {
  if (!this.mapLoaded || !this.xml) {
    return;
  }

  this.onSuccess();
};

AvenzaMap.prototype._error = function(err) {
  this.onError(err);
};

AvenzaMap.prototype.getSize = function() {
  return {
    width: this.$element.width(),
    height: this.$element.height()
  };
};



})(jQuery);
