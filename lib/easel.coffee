root = this
class Easel
  #layer = { id: "id for layer", index: "z-index" }
  _layers: []
  constructor: (@id) ->
    @container = jQuery("##{@id}")

  addLayers: (layers) ->
    @_layers.push layer for layer in layers

  setup: ->
    for layer in @_layers
      canvas_attrs =
        id: layer.id
        'z-index': layer.index
      canvas = jQuery('<canvas/>')
        .attr(canvas_attrs)
      @container.append(canvas)

root.Easel = Easel
