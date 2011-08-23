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
        @container.append layer.getCanvas @container.get(0)
        layer.draw()

  class @Layer
    constructor: (obj) ->
      @id = obj?.id
      @index = obj?.index
      @drawFunc = obj?.drawFunc

    getCanvas: (easelObj) ->
      canvas_attrs =
        id: @id
        'z-index': @index
        width: easelObj.scrollWidth
        height: easelObj.scrollHeight
      style_attrs =
        position: 'absolute'
      canvas = jQuery('<canvas/>')
        .attr(canvas_attrs)
        .css(style_attrs)

    draw: ->
      ctx = document.getElementById(@id).getContext('2d')
      ctx.beginPath()
      @drawFunc(ctx)
      ctx.closePath()
      ctx.fill()
