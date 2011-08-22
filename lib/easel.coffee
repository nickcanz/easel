window.module = (name, fn)->
  if not @[name]?
    this[name] = {}
  if not @[name].module?
    @[name].module = window.module
  fn.apply(this[name], [])

@module "Easel", ->
  class @Easel
    #layer = { id: "id for layer", index: "z-index" }
    layers: []
    constructor: (@id) ->
      @container = jQuery("##{@id}")

    addLayers: (layers) ->
      @layers.push layer for layer in layers

    setup: ->
      for layer in @layers
        @container.append layer.getCanvas()
        layer.draw()

  class @Layer
    constructor: (obj) ->
      @id = obj?.id
      @index = obj?.index
      @f_draw = obj?.f_draw

    getCanvas: ->
      canvas_attrs =
        id: @id
        'z-index': @index
      style_attrs =
        position: 'absolute'
        border: '1px solid #000'
      canvas = jQuery('<canvas/>')
        .attr(canvas_attrs)
        .css(style_attrs)
