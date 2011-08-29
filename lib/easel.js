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
      function Easel(id) {
        this.id = id;
        this.container = jQuery("#" + this.id);
        this.layers = [];
        this;
      }
      Easel.prototype.addLayers = function(layers) {
        var layer, _i, _len;
        for (_i = 0, _len = layers.length; _i < _len; _i++) {
          layer = layers[_i];
          this.layers.push(layer);
        }
        return this;
      };
      Easel.prototype.setup = function() {
        var layer, _i, _len, _ref, _results;
        _ref = this.layers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          this.container.append(layer.getCanvas(this.container.get(0)));
          _results.push(layer.draw());
        }
        return _results;
      };
      return Easel;
    })();
    return this.Layer = (function() {
      function Layer(obj) {
        this.id = obj.id;
        this.index = obj.index;
        this.drawFunc = obj.drawFunc;
        this;
      }
      Layer.prototype.getCanvas = function(easelObj) {
        var canvas, canvas_attrs, style_attrs;
        this.domId = "" + easelObj.id + "-" + this.id;
        canvas_attrs = {
          id: this.domId,
          'z-index': this.index,
          width: easelObj.scrollWidth,
          height: easelObj.scrollHeight
        };
        style_attrs = {
          position: 'absolute'
        };
        return canvas = jQuery('<canvas/>').attr(canvas_attrs).css(style_attrs);
      };
      Layer.prototype.draw = function() {
        var ctx;
        ctx = document.getElementById(this.domId).getContext('2d');
        ctx.beginPath();
        this.drawFunc(ctx);
        ctx.closePath();
        if (this.isFill) {
          ctx.fill();
        }
        if (this.isStroke) {
          return ctx.stroke();
        }
      };
      Layer.prototype.fill = function(isFill) {
        this.isFill = isFill != null ? isFill : isFill = true;
        return this;
      };
      Layer.prototype.stroke = function(isStroke) {
        this.isStroke = isStroke != null ? isStroke : isStroke = true;
        return this;
      };
      return Layer;
    })();
  });
}).call(this);
