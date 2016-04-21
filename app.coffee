## cleaning console || trigger - ClearConsole ##
console.clear()

F = Framer
flag = 0
spring = "spring(300, 0, 20)"

## init text layers || trigger - initText ##
{TextLayer} = require 'TextLayer'


## new layer Iphone6 gray || trigger - newIphone ##
# create background
frame = new Layer
    image: 'images/iphone6-white.jpg'
    height:2060
    width:1290
frame.center()
#
screen = new Layer
	backgroundColor: '#3D315B'
	width:750
	height:1334
	borderRadius:4
	clip: true
screen.center()
Framer.Defaults.Layer.parent = screen
# screen sizes for devices
if Utils.isDesktop()
	screen.scale = (Screen.height / screen.height) / 2
	frame.scale = (Screen.height / screen.height) / 2
	window.onresize = ->
	 	screen.scale = (Screen.height / screen.height) / 2
	 	frame.scale = (Screen.height / screen.height) / 2
	 	screen.center()
	 	frame.center()
if Utils.isMobile()
	frame.destroy()
	Framer.Defaults.Layer.parent = null
	screen.scale = Screen.height / screen.outerHeight
	window.onresize = ->
	 	screen.scale = Screen.height / screen.outerHeight


## new text layer || trigger - newText ##
mainText = new TextLayer
    text: "random PALLETE cakes"
    color: "white"
    textAlign: "center"
    fontSize: 80
    width: 400
    y: 180
    fontFamily: 'Nunito'
mainText.centerX()


animationA = new Animation
    layer: mainText
    properties:
        scale: 1.2
    curve: "bezier-curve(0.25, 0.1, 0.25, 1)"
    time:0.1
animationB = animationA.reverse()
animationA.on(Events.AnimationEnd, animationB.start)

mainText.on Events.Click, ->
	animationA.start()
	for i in [4..0]
		F["card#{i+1}"].states.add
			random: backgroundColor: Utils.randomColor()
		F["card#{i+1}"].states.switch('random', time: .2, curve: 'ease')

rgbVal = new TextLayer
	text: ""
	color: "white"
	textAlign: "center"
	fontSize: 32
	width: 400
	y: 280
	fontFamily: 'Nunito'
rgbVal.centerX()
rgbVal.style =
    "text-transform": "uppercase"
    "text-shadow": "0 2px 4px rgba(0,0,0,0.6)"

hexVal = new TextLayer
	text: ""
	color: "white"
	textAlign: "center"
	fontSize: 80
	width: 400
	y: 340
	fontFamily: 'Nunito'
hexVal.centerX()
hexVal.style =
    "text-transform": "uppercase"
    "text-shadow": "0 2px 10px rgba(0,0,0,0.6)"


colorTxt = new Layer
	backgroundColor: "transparent"
	opacity:1
	index: 3
colorTxt.addChild(rgbVal)
#rgbVal.text = F.card2.backgroundColor

# Create many cards || trigger - newCards ##
for i in [4..0]
	F["card#{i+1}"] = new Layer
		backgroundColor: Utils.randomColor()
		width: screen.width/1.1 - (70*i)
		height: 500
		index: 2
		y: 500/Math.exp(i/2) + 600
		borderRadius: 20
	F["card#{i+1}"].centerX()
	F["card#{i+1}"].draggable.enabled = true
	F["card#{i+1}"].draggable.horizontal = false

	F["card#{i+1}"].states.add
		up: y:120, x: screen.width/2 - 250, borderRadius:1000, width:500, height:500
		zero: y:F["card#{i+1}"].y, x:F["card#{i+1}"].x, borderRadius:20, width:F["card#{i+1}"].width, height:F["card#{i+1}"].height

	F["card#{i+1}"].on Events.Click, ->
		if @.y < 130
			mainText.visible = true
			rgbVal.text = ''
			hexVal.text = ''
			@.states.switch('zero', time: .2, curve: spring)
			console.log( "YEAH, MAN!" )
		else
			for i in [4..0]
				F["card#{i+1}"].states.switch('zero', time: .2, curve: spring)
			mainText.visible = false
			hexVal.text = @.backgroundColor.toHexString()
			rgbVal.text = @.backgroundColor
			@.states.switch('up', time: .2, curve: spring)

	F["card#{i+1}"].on Events.DragEnd, ->
		if flag is 0
			flag = 1
			hexVal.text = @.backgroundColor.toHexString()
			rgbVal.text = @.backgroundColor
			for i in [4..0]
				F["card#{i+1}"].states.switch('zero', time: .2, curve: spring)
			mainText.visible = false
			@.states.switch('up', time: .2, curve: spring)
		else
			flag = 0
			mainText.visible = true
			rgbVal.text = ''
			hexVal.text = ''
			@.states.switch('zero', time: .2, curve: spring)
