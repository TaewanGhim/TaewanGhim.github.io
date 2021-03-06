var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {for (
      var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done);
      _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;
    }} catch (err) {_d = true;_e = err;
    } finally {try {if (!_n && _i["return"]) _i["return"]();
  } finally {if (_d) throw _e;}}return _arr;
}return function (arr, i) {if (Array.isArray(arr)) {return arr;
} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);
} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");
}};
}();
var SPAWN_RATE = [10, 30];
var MAX_GROWTH_TIME = 30;
var PAN_RANGE = [-0.8, 0.8];

var compressor = new Tone.Compressor().toMaster();
var src = new Tone.Noise("white").start();

var SCALE = [
"B3",
"Db4",
"Eb4",
"F4",
"G4",
"A4",
"B4",
"Db5",
"Eb5",
"F5",
"G5",
"A5",
"B5",
"Db6"];

var INTERVALS = [10, 10, 10, 10];

var MODES = [
{
  color: { hue: 160, saturation: 70 },
  filterQ: 2000,
  gainRange: [0.1, 10],
  lengthRange: [10, 50],
  angleRange: [20, 25],
  maxLineLength: 10000,
  growthFactor: 10,
  lSystem: {
    axiom: [
    {
      symbol: "X",
      terminalAge: 0 }],


    productions: {
      X: {
        terminalAge: [MAX_GROWTH_TIME / 5, MAX_GROWTH_TIME / 2],
        successors: [
        {
          p: 0.33,
          items: [
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "-", params: function params() {return { a: randAngle(0) };} },
          { symbol: "[" },
          { symbol: "[" },
          { symbol: "X" },
          { symbol: "]" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          { symbol: "X" },
          { symbol: "]" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "[" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "X" },
          { symbol: "]" },
          { symbol: "-", params: function params() {return { a: randAngle(0) };} },
          { symbol: "X" }] },


        {
          p: 0.33,
          items: [
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          { symbol: "[" },
          { symbol: "[" },
          { symbol: "X" },
          { symbol: "]" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          { symbol: "X" },
          { symbol: "]" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "[" },
          { symbol: "-", params: function params() {return { a: randAngle(0) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "X" },
          { symbol: "]" }] },


        {
          p: 0.34,
          items: [
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "-", params: function params() {return { a: randAngle(0) };} },
          { symbol: "[" },
          { symbol: "[" },
          { symbol: "X" },
          { symbol: "]" },
          { symbol: "-", params: function params() {return { a: randAngle(0) };} },
          { symbol: "X" },
          { symbol: "]" },
          { symbol: "-", params: function params() {return { a: randAngle(0) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "[" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "X" },
          { symbol: "]" },
          { symbol: "+", params: function params() {return { a: randAngle(0) };} },
          { symbol: "[" },
          {
            symbol: "F",
            params: function params() {return { l: randLength(0), lInit: 0 };} },

          { symbol: "X" },
          { symbol: "]" }] }] },




      F: {
        terminalAge: [MAX_GROWTH_TIME / 3, MAX_GROWTH_TIME / 2],
        successors: [
        {
          p: 0.5,
          items: [
          {
            symbol: "F",
            params: function params(_ref, prevAge) {var l = _ref.l,ageAcc = _ref.ageAcc;return {
                l: l,
                lInit: 1,
                ageAcc: prevAge + (ageAcc || 0) };} },


          {
            symbol: "F",
            params: function params(_ref2, prevAge) {var ageAcc = _ref2.ageAcc;return {
                l: randLength(0),
                lInit: 0,
                ageAcc: prevAge + (ageAcc || 0) };} }] },




        {
          p: 0.5,
          items: [
          {
            symbol: "F",
            params: function params(_ref3, prevAge) {var l = _ref3.l,ageAcc = _ref3.ageAcc;return {
                l: l,
                lInit: 1,
                ageAcc: prevAge + (ageAcc || 0) };} }] }] } } },








  audioChain: compressor },

{
  color: { hue: 330, saturation: 100, lightness: 70 },
  filterQ: 500,
  gainRange: [0.1, 8],
  lengthRange: [35, 45],
  angleRange: [66, 33],
  maxLineLength: 10000,
  growthFactor: 8,
  lSystem: {
    axiom: [
    {
      symbol: "F",
      terminalAge: 0,
      params: { l: 0 } }],


    productions: {
      F: {
        terminalAge: [MAX_GROWTH_TIME / 2, MAX_GROWTH_TIME / 4],
        successors: [
        {
          p: 1,
          items: [
          {
            symbol: "F",
            params: function params(_ref4, prevAge) {var l = _ref4.l,ageAcc = _ref4.ageAcc;return {
                l: l,
                lInit: 1,
                ageAcc: prevAge + (ageAcc || 0) };} },


          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "[" },
          { symbol: "-", params: function params() {return { a: randAngle(2) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "+", params: function params() {return { a: randAngle(2) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "+", params: function params() {return { a: randAngle(2) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "]" },
          { symbol: "[" },
          { symbol: "+", params: function params() {return { a: randAngle(2) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "-", params: function params() {return { a: randAngle(2) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "-", params: function params() {return { a: randAngle(2) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(2), lInit: 0 };} },

          { symbol: "]" }] }] } } },






  audioChain: new Tone.Tremolo({ frequency: 10, depth: 0.8, type: "sine" }).
  connect(compressor).
  start() },

{
  color: { hue: 205, saturation: 70},
  filterQ: 1000,
  gainRange: [0.1, 3],
  lengthRange: [10, 15],
  angleRange: [10,35],
  maxLineLength: 5000,
  growthFactor: 6,
  lSystem: {
    axiom: [
    {
      symbol: "F",
      terminalAge: 0,
      params: { l: 0 } }],


    productions: {
      F: {
        terminalAge: [MAX_GROWTH_TIME / 2, MAX_GROWTH_TIME / 10],
        successors: [
        {
          p: 0.5,
          items: [
          {
            symbol: "F",
            params: function params(_ref5, prevAge) {var l = _ref5.l,ageAcc = _ref5.ageAcc;return {
                l: l,
                lInit: 1,
                ageAcc: prevAge + (ageAcc || 0) };} },


          { symbol: "[" },
          { symbol: "+", params: function params() {return { a: randAngle(1) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "]" },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "[" },
          { symbol: "-", params: function params() {return { a: randAngle(1) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "]" },
          { symbol: "[" },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "]" }] },


        {
          p: 0.5,
          items: [
          {
            symbol: "F",
            params: function params(_ref6, prevAge) {var l = _ref6.l,ageAcc = _ref6.ageAcc;return {
                l: l,
                lInit: 1,
                ageAcc: prevAge + (ageAcc || 0) };} },


          { symbol: "[" },
          { symbol: "-", params: function params() {return { a: randAngle(1) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "]" },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "[" },
          { symbol: "+", params: function params() {return { a: randAngle(1) };} },
          {
            symbol: "F",
            params: function params() {return { l: randLength(1), lInit: 0 };} },

          { symbol: "]" }] }] } } },






  audioChain: new Tone.Distortion({ distortion: 0.5, wet: 0.75 }).connect(
  compressor) }];




function rand(_ref7) {var _ref8 = _slicedToArray(_ref7, 2),min = _ref8[0],max = _ref8[1];
  return min + Math.random() * (max - min);
}

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function scale(value, _ref9) {var _ref10 = _slicedToArray(_ref9, 2),rangeMin = _ref10[0],rangeMax = _ref10[1];
  return rangeMin + (rangeMax - rangeMin) * value;
}

function randLength(mode) {
  return rand(MODES[mode].lengthRange);
}

function randAngle(mode) {
  return rand(MODES[mode].angleRange);
}

function findProduction(productions, symbol) {
  if (productions.hasOwnProperty(symbol)) {
    var prod = productions[symbol];
    var rnd = Math.random();
    var totalP = 0;var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
      for (
        var _iterator = prod.successors[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true){
        var _ref12 = _step.value;
        var p = _ref12.p,items = _ref12.items;
        totalP += p;
        if (rnd <= totalP) {
          return { terminalAge: prod.terminalAge, items: items };
        }
      }} catch (err) {_didIteratorError = true;
        _iteratorError = err;
      } finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();
      }} finally {if (_didIteratorError) {throw _iteratorError;
      }}}
  }
  return null;
}

function lExpand(lSystem, str, timeElapsed) {
  for (var i = str.length - 1; i >= 0; i--) {
    var chr = str[i];
    chr.age = timeElapsed - chr.birthTime;
    if (chr.age >= chr.terminalAge) {
      var prod = findProduction(lSystem.productions, chr.symbol);
      if (prod) {
        var childBirthTime = chr.birthTime + chr.terminalAge;
        var newItems = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;
        try {
          for (
            var _iterator2 = prod.items[Symbol.iterator](), _step2;
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            _iteratorNormalCompletion2 = true) {var item = _step2.value;
            newItems.push({
              symbol: item.symbol,
              birthTime: childBirthTime,
              age: timeElapsed - childBirthTime,
              terminalAge: rand(prod.terminalAge),
              params: item.params && item.params(chr.params, chr.age) });

          }} catch (err) {_didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();
          }} finally {if (_didIteratorError2) {throw _iteratorError2;
          }}}
        str.splice.apply(str, [i, 1].concat(newItems));
      }
    }
  }
}

function turtleInterpret(str, translateTo, rotateBy, onF) {
  var state = {
    loc: new paper.Point(translateTo.x, translateTo.y),
    angle: rotateBy };

  var stateStack = [];var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
    for (var _iterator3 = str[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var chr = _step3.value;
      switch (chr.symbol) {
        case "F":var _chr$params =
          chr.params,l = _chr$params.l,lInit = _chr$params.lInit;
          var ageCoef = Math.min(lInit + chr.age / chr.terminalAge, 1);
          var lineLength = l * ageCoef;
          var newLoc = state.loc.add(
          new paper.Point(
          lineLength * Math.cos(state.angle / 180 * Math.PI),
          lineLength * Math.sin(state.angle / 180 * Math.PI)));


          onF(chr, state.loc, newLoc);
          state.loc = newLoc;
          break;
        case "-":
          state.angle = state.angle - chr.params.a;
          break;
        case "+":
          state.angle = state.angle + chr.params.a;
          break;
        case "[":
          stateStack.push(Object.assign({}, state));
          break;
        case "]":
          state = stateStack.pop();
          break;}

    }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
}

function getColorStr(_ref13, noteIndex) {
  var hue = _ref13.hue,saturation = _ref13.saturation;
  var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var relNoteIndex = noteIndex / SCALE.length;
  var lightness = scale(relNoteIndex, [30, 70]);
  return "hsla(" + hue + ", " + saturation + "%, " + lightness + "%, " + alpha + ")";
}

function easeOutQuad(t) {
  return t * (2 - t);
}
function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}
function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}

function nextNoteIndex(current) {
  var interval = randItem(INTERVALS) * randItem([-1, 1]);
  if (current + interval < SCALE.length && current + interval >= 0) {
    return current + interval;
  } else {
    return current - interval;
  }
}

// Init

var hint = document.querySelector("#hint");
var canvas = document.querySelector("#cnvs");
var ctx = canvas.getContext("2d");
paper.setup(cnvs);
var drawTool = new paper.Tool();

// State

var currentMode = MODES[0];
var paths = [];
var currentNoteIndex = Math.floor(scale(Math.random(), [0, SCALE.length]));
var nextSpawn = void 0,distanceFromLastSpawn = void 0,path = void 0;

// Mode selection

var buttons = MODES.map(function (mode, idx) {
  var button = document.createElement("button");
  button.textContent = idx + 1;
  button.style.backgroundColor =
  idx === 0 ?
  getColorStr(mode.color, SCALE.length / 2, 1) :
  getColorStr(mode.color, SCALE.length / 2, 0.1);
  button.addEventListener("click", function () {
    currentMode = mode;
    buttons.forEach(function (b, i) {
      b.style.backgroundColor =
      b === button ?
      getColorStr(MODES[i].color, SCALE.length / 2, 1) :
      getColorStr(MODES[i].color, SCALE.length / 2, 0.1);
    });
  });
  document.querySelector(".modes").appendChild(button);
  return button;
});

// Interaction: Create paths and offshoots

drawTool.onMouseDown = function (evt) {
  hint.classList.add("gone");
  nextSpawn = rand(SPAWN_RATE);
  distanceFromLastSpawn = 0;
  path = {
    mode: currentMode,
    path: [{ lastPoint: evt.point, point: evt.point, addedAt: Date.now() }],
    offshoots: [],
    noteIndex: currentNoteIndex,
    lastActivityAt: Date.now() };

  paths.push(path);
  currentNoteIndex = nextNoteIndex(currentNoteIndex);
};
drawTool.onMouseDrag = function (evt) {
  path.path.push({
    lastPoint: evt.lastPoint,
    point: evt.point,
    addedAt: Date.now() });

  distanceFromLastSpawn += evt.delta.length;
  if (distanceFromLastSpawn >= nextSpawn) {
    var growthCoefficient = Math.min(
    1,
    Math.max(0.2, path.mode.growthFactor / evt.delta.length));

    path.offshoots.push({
      str: path.mode.lSystem.axiom.map(function (a) {return Object.assign({ birthTime: 0 }, a);}),
      age: 0,
      point: evt.lastPoint,
      angle: evt.delta.angle,
      growthTime: MAX_GROWTH_TIME * growthCoefficient });

    path.lastActivityAt = Date.now();
    nextSpawn = rand(SPAWN_RATE);
    distanceFromLastSpawn = 0;
  }
};

// Render loop: Develop offshoots, prune dead growths, draw.

paper.view.onFrame = function (evt) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  for (var i = paths.length - 1; i >= 0; i--) {var _paths$i =
    paths[i],_path = _paths$i.path,mode = _paths$i.mode,noteIndex = _paths$i.noteIndex,lastActivityAt = _paths$i.lastActivityAt,offshoots = _paths$i.offshoots,player = _paths$i.player;

    if (lastActivityAt < Date.now() - MAX_GROWTH_TIME * 1000) {
      paths.splice(i, 1);
      player.filters.forEach(function (f) {return f.disconnect();});
      player.panner.disconnect();
      player.gain.disconnect();
      continue;
    }

    if (_path.length > 0) {
      ctx.lineWidth = 10;
      for (var _i = _path.length - 1; _i >= 0; _i--) {var _path$_i =
        _path[_i],lastPoint = _path$_i.lastPoint,point = _path$_i.point,addedAt = _path$_i.addedAt;
        var alpha = 1 - (Date.now() - addedAt) / 1000;
        if (alpha > 0) {
          ctx.strokeStyle = getColorStr(mode.color, noteIndex, alpha);
          ctx.strokeWeight = 5;
          ctx.beginPath();
          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        } else {
          _path.splice(_i, 1);
        }
      }
    }var _loop = function _loop(

    _i2) {
      var offshoot = offshoots[_i2];
      offshoot.age += evt.delta;

      if (offshoot.age >= MAX_GROWTH_TIME) {
        offshoots.splice(_i2, 1);
        return "continue";
      }

      if (offshoots[_i2].age < offshoots[_i2].growthTime) {
        var relAge = offshoot.age / offshoot.growthTime;
        var easedRelAge = easeOutQuart(relAge);
        var easedAge = easedRelAge * offshoot.growthTime;
        lExpand(mode.lSystem, offshoot.str, easedAge);
        offshoot.currentLines = {};
        turtleInterpret(
        offshoot.str,
        offshoot.point,
        offshoot.angle,
        function (chr, from, to) {
          var width = Math.ceil(
          (chr.age + (chr.params.ageAcc || 0)) / MAX_GROWTH_TIME * 100);

          if (!offshoot.currentLines.hasOwnProperty(width)) {
            offshoot.currentLines[width] = [];
          }
          offshoot.currentLines[width].push({ from: from, to: to });
        });

      }

      var hasBeenFadingFor = offshoot.age - MAX_GROWTH_TIME /2;
      offshoot.alpha = Math.min(1, 1 - hasBeenFadingFor / 5);

      ctx.strokeStyle = getColorStr(mode.color, noteIndex, offshoot.alpha);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;
      try {
        for (
          var _iterator4 = Object.keys(offshoot.currentLines)[Symbol.iterator](), _step4;
          !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
          _iteratorNormalCompletion4 = true) {
          var width = _step4.value;
          ctx.beginPath();
          ctx.lineWidth = width / 10;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;
          try {
            for (
              var _iterator5 = offshoot.currentLines[width][Symbol.iterator](), _step5;
              !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
              _iteratorNormalCompletion5 = true) {
              var _ref15 = _step5.value;
              var from = _ref15.from,to = _ref15.to;
              ctx.moveTo(from.x, from.y);
              ctx.lineTo(to.x, to.y);
            }} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5.return) {_iterator5.return();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}
          ctx.stroke();
        }} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}};for (var _i2 = offshoots.length - 1; _i2 >= 0; _i2--) {var _ret = _loop(_i2);if (_ret === "continue") continue;
    }
  }
};

// Audio control loop. Create/update audio nodes and parameters to match current growth

setInterval(function () {
  var totalX = 0,
  pointCount = 0;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;
  try {
    var _loop2 = function _loop2() {
      var path = _step6.value;
      if (!path.player) {
        var gain = new Tone.Gain(path.mode.gainRange[0]);
        var panner = new Tone.Panner();

        var freq = new Tone.Frequency(SCALE[path.noteIndex]);
        var filters = [
        freq,
        freq.clone().transpose(-12),
        freq.clone().transpose(-24)].
        map(function (freq) {
          var filter = new Tone.Filter({
            type: "bandpass",
            frequency: freq.toFrequency(),
            Q: path.mode.filterQ });

          src.connect(filter);
          filter.connect(gain);
          return filter;
        });

        gain.connect(panner);
        panner.connect(path.mode.audioChain);

        path.player = { filters: filters, gain: gain, panner: panner };
      }

      var totalLength = 0,
      totalX = 0,
      ptCount = 0;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;
      try {
        for (
          var _iterator7 = path.offshoots[Symbol.iterator](), _step7;
          !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
          _iteratorNormalCompletion7 = true){
          var _offshoot = _step7.value;
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;
          try {
            for (
              var _iterator8 = Object.keys(_offshoot.currentLines || {})[Symbol.iterator](), _step8;
              !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
              _iteratorNormalCompletion8 = true){
              var key = _step8.value;
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;
            try {
                for (
                  var _iterator9 = _offshoot.currentLines[key][Symbol.iterator](), _step9;
                  !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
                  _iteratorNormalCompletion9 = true){
                  var _ref17 = _step9.value;
                var from = _ref17.from,to = _ref17.to;
                  totalLength += to.getDistance(from) * _offshoot.alpha;

                  totalX += to.x;
                  ptCount++;
                }} catch (err) {_didIteratorError9 = true;_iteratorError9 = err;} finally {try {if (!_iteratorNormalCompletion9 && _iterator9.return) {_iterator9.return();}} finally {if (_didIteratorError9) {throw _iteratorError9;}}}
            }} catch (err) {_didIteratorError8 = true;_iteratorError8 = err;} finally {try {if (!_iteratorNormalCompletion8 && _iterator8.return) {_iterator8.return();}} finally {if (_didIteratorError8) {throw _iteratorError8;}}}
        }} catch (err) {_didIteratorError7 = true;_iteratorError7 = err;} finally {try {if (!_iteratorNormalCompletion7 && _iterator7.return) {_iterator7.return();}} finally {if (_didIteratorError7) {throw _iteratorError7;}}}

      var lengthStrength =
      Math.min(totalLength, path.mode.maxLineLength) / path.mode.maxLineLength;
      var gainFromLength = scale(lengthStrength, path.mode.gainRange);
      var nextGain = Math.max(gainFromLength, 0.0001);
      path.player.gain.gain.setTargetAtTime(nextGain, Tone.now(), 0.03);

      if (ptCount > 0) {
        var nextPan = totalX / ptCount / paper.view.size.width * 2 - 1;
        path.player.panner.pan.setTargetAtTime(nextPan, Tone.now(), 0.03);
      }};for (var _iterator6 = paths[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {_loop2();
    }} catch (err) {_didIteratorError6 = true;_iteratorError6 = err;} finally {try {if (!_iteratorNormalCompletion6 && _iterator6.return) {_iterator6.return();}} finally {if (_didIteratorError6) {throw _iteratorError6;}}}
}, 200);

StartAudioContext(Tone.context, canvas);