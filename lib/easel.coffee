window.module = (name, fn)->
  if not @[name]?
    this[name] = {}
  if not @[name].module?
    @[name].module = window.module
  fn.apply(this[name], [])

@module "Easel", ->
  class @Easel
    constructor: (@id) ->
      @container = jQuery("##{@id}")
      @layers = []
      this

    addLayers: (layers) ->
      @layers.push layer for layer in layers
      this

    setup: ->
      for layer in @layers
        @container.append layer.getCanvas(@container.get(0))
        layer.draw()

  class @Layer
    constructor: (obj) ->
      @id = obj.id
      @index = obj.index
      @drawFunc = obj.drawFunc
      this

    getCanvas: (easelObj) ->
      @domId = "#{easelObj.id}-#{@id}"
      canvas_attrs =
        id: @domId
        'z-index': @index
        width: easelObj.scrollWidth
        height: easelObj.scrollHeight
      style_attrs =
        position: 'absolute'
      canvas = jQuery('<canvas/>')
        .attr(canvas_attrs)
        .css(style_attrs)

    draw: ->
      ctx = document.getElementById(@domId).getContext('2d') 
      ctx.beginPath()
      @drawFunc(ctx)
      ctx.closePath()
      ctx.fill() if @isFill
      ctx.stroke() if @isStroke

    fill: (isFill) ->
      @isFill = isFill ?= true
      this

    stroke: (isStroke) ->
      @isStroke = isStroke ?= true
      this
