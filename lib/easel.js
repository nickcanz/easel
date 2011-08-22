(function() {
  window.module = function(name, fn) {
    if (!(this[name] != null)) {
      this[name] = {};
    }
    if (!(this[name].module != null)) {
      this[name].module = window.module;
    }
    return fn.apply(this[name], []);
  };
  this.module("Easel", function() {
    this.Easel = (function() {
      Easel.prototype.layers = [];
      function Easel(id) {
        this.id = id;
        this.container = jQuery("#" + this.id);
      }
      Easel.prototype.addLayers = function(layers) {
        var layer, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = layers.length; _i < _len; _i++) {
          layer = layers[_i];
          _results.push(this.layers.push(layer));
        }
        return _results;
      };
      Easel.prototype.setup = function() {
        var layer, _i, _len, _ref, _results;
        _ref = this.layers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          this.container.append(layer.getCanvas());
          _results.push(layer.draw());
        }
        return _results;
      };
      return Easel;
    })();
    return this.Layer = (function() {
      function Layer(obj) {
        this.id = obj != null ? obj.id : void 0;
        this.index = obj != null ? obj.index : void 0;
        this.f_draw = obj != null ? obj.f_draw : void 0;
      }
      Layer.prototype.getCanvas = function() {
        var canvas, canvas_attrs, style_attrs;
        canvas_attrs = {
          id: this.id,
          'z-index': this.index
        };
        style_attrs = {
          position: 'absolute',
          border: '1px solid #000'
        };
        return canvas = jQuery('<canvas/>').attr(canvas_attrs).css(style_attrs);
      };
      return Layer;
    })();
  });
}).call(this);
