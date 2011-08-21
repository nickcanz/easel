(function() {
  var Easel, root;
  root = this;
  Easel = (function() {
    Easel.prototype._layers = [];
    function Easel(id) {
      this.id = id;
      this.container = jQuery("#" + this.id);
    }
    Easel.prototype.addLayers = function(layers) {
      var layer, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = layers.length; _i < _len; _i++) {
        layer = layers[_i];
        _results.push(this._layers.push(layer));
      }
      return _results;
    };
    Easel.prototype.setup = function() {
      var canvas, canvas_attrs, layer, _i, _len, _ref, _results;
      _ref = this._layers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        canvas_attrs = {
          id: layer.id,
          'z-index': layer.index
        };
        canvas = jQuery('<canvas/>').attr(canvas_attrs);
        _results.push(this.container.append(canvas));
      }
      return _results;
    };
    return Easel;
  })();
  root.Easel = Easel;
}).call(this);
