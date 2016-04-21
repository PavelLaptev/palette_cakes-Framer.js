
/* SNIPPET LIST
	clear console - ClearConsole
	----
	create iphone6 view SpaceGray || newIphone
	create iphone6 view White || newIphoneWhite
	create iphone6 view Gold || newIphoneGold
	----
	init text layers || initText
	create text layer || newText ## -> init textLayer by trigger initText before use snippet
	---
	new layer || newLayer
	new Circle || newCircle
	tabbar || newTabbar
	navigationbar with statusbar || newNavbar
	---
	drag || drag
	add states || state
 */

(function() {
  var F, TextLayer, animationA, animationB, colorTxt, flag, frame, hexVal, i, mainText, rgbVal, screen, spring, _i;

  console.clear();

  F = Framer;

  flag = 0;

  spring = "spring(300, 0, 20)";

  TextLayer = require('TextLayer').TextLayer;

  frame = new Layer({
    image: 'images/iphone6-white.jpg',
    height: 2060,
    width: 1290
  });

  frame.center();

  screen = new Layer({
    backgroundColor: '#3D315B',
    width: 750,
    height: 1334,
    borderRadius: 4,
    clip: true
  });

  screen.center();

  Framer.Defaults.Layer.parent = screen;

  if (Utils.isDesktop()) {
    screen.scale = (Screen.height / screen.height) / 2;
    frame.scale = (Screen.height / screen.height) / 2;
    window.onresize = function() {
      screen.scale = (Screen.height / screen.height) / 2;
      frame.scale = (Screen.height / screen.height) / 2;
      screen.center();
      return frame.center();
    };
  }

  if (Utils.isMobile()) {
    frame.destroy();
    Framer.Defaults.Layer.parent = null;
    screen.scale = Screen.height / screen.outerHeight;
    window.onresize = function() {
      return screen.scale = Screen.height / screen.outerHeight;
    };
  }

  mainText = new TextLayer({
    text: "random PALLETE cakes",
    color: "white",
    textAlign: "center",
    fontSize: 80,
    width: 400,
    y: 180,
    fontFamily: 'Nunito'
  });

  mainText.centerX();

  animationA = new Animation({
    layer: mainText,
    properties: {
      scale: 1.2
    },
    curve: "bezier-curve(0.25, 0.1, 0.25, 1)",
    time: 0.1
  });

  animationB = animationA.reverse();

  animationA.on(Events.AnimationEnd, animationB.start);

  mainText.on(Events.Click, function() {
    var i, _i, _results;
    animationA.start();
    _results = [];
    for (i = _i = 4; _i >= 0; i = --_i) {
      F["card" + (i + 1)].states.add({
        random: {
          backgroundColor: Utils.randomColor()
        }
      });
      _results.push(F["card" + (i + 1)].states["switch"]('random', {
        time: .2,
        curve: 'ease'
      }));
    }
    return _results;
  });

  rgbVal = new TextLayer({
    text: "",
    color: "white",
    textAlign: "center",
    fontSize: 32,
    width: 400,
    y: 280,
    fontFamily: 'Nunito'
  });

  rgbVal.centerX();

  rgbVal.style = {
    "text-transform": "uppercase",
    "text-shadow": "0 2px 4px rgba(0,0,0,0.6)"
  };

  hexVal = new TextLayer({
    text: "",
    color: "white",
    textAlign: "center",
    fontSize: 80,
    width: 400,
    y: 340,
    fontFamily: 'Nunito'
  });

  hexVal.centerX();

  hexVal.style = {
    "text-transform": "uppercase",
    "text-shadow": "0 2px 10px rgba(0,0,0,0.6)"
  };

  colorTxt = new Layer({
    backgroundColor: "transparent",
    opacity: 1,
    index: 3
  });

  colorTxt.addChild(rgbVal);

  for (i = _i = 4; _i >= 0; i = --_i) {
    F["card" + (i + 1)] = new Layer({
      backgroundColor: Utils.randomColor(),
      width: screen.width / 1.1 - (70 * i),
      height: 500,
      index: 2,
      y: 500 / Math.exp(i / 2) + 600,
      borderRadius: 20
    });
    F["card" + (i + 1)].centerX();
    F["card" + (i + 1)].draggable.enabled = true;
    F["card" + (i + 1)].draggable.horizontal = false;
    F["card" + (i + 1)].states.add({
      up: {
        y: 120,
        x: screen.width / 2 - 250,
        borderRadius: 1000,
        width: 500,
        height: 500
      },
      zero: {
        y: F["card" + (i + 1)].y,
        x: F["card" + (i + 1)].x,
        borderRadius: 20,
        width: F["card" + (i + 1)].width,
        height: F["card" + (i + 1)].height
      }
    });
    F["card" + (i + 1)].on(Events.Click, function() {
      var _j;
      if (this.y < 130) {
        mainText.visible = true;
        rgbVal.text = '';
        hexVal.text = '';
        this.states["switch"]('zero', {
          time: .2,
          curve: spring
        });
        return console.log("YEAH, MAN!");
      } else {
        for (i = _j = 4; _j >= 0; i = --_j) {
          F["card" + (i + 1)].states["switch"]('zero', {
            time: .2,
            curve: spring
          });
        }
        mainText.visible = false;
        hexVal.text = this.backgroundColor.toHexString();
        rgbVal.text = this.backgroundColor;
        return this.states["switch"]('up', {
          time: .2,
          curve: spring
        });
      }
    });
    F["card" + (i + 1)].on(Events.DragEnd, function() {
      var _j;
      if (flag === 0) {
        flag = 1;
        hexVal.text = this.backgroundColor.toHexString();
        rgbVal.text = this.backgroundColor;
        for (i = _j = 4; _j >= 0; i = --_j) {
          F["card" + (i + 1)].states["switch"]('zero', {
            time: .2,
            curve: spring
          });
        }
        mainText.visible = false;
        return this.states["switch"]('up', {
          time: .2,
          curve: spring
        });
      } else {
        flag = 0;
        mainText.visible = true;
        rgbVal.text = '';
        hexVal.text = '';
        return this.states["switch"]('zero', {
          time: .2,
          curve: spring
        });
      }
    });
  }

}).call(this);
