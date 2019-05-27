(function (win, doc) {

  "use strict";

  function PandemicSpan(elm) {
    var that = this;

    _constructor();

    function _constructor() {
      that.elm       = elm;
      that.queue     = [_zoomIn, _zoomOut, _zoomIn, _zoomOut, _explode, _vanish];
      that.achooFlag = false;
      that.index     = 0;
      that.elm.style.cssText += PandemicSpan.CONST.DEFAULT_STYLE;

      that.elm.addEventListener("webkitTransitionEnd", _handleTransitionEnd, false);
      that.elm.addEventListener("mozTransitionEnd", _handleTransitionEnd, false);
      that.elm.addEventListener("msTransitionEnd", _handleTransitionEnd, false);
      that.elm.addEventListener("oTransitionEnd", _handleTransitionEnd, false);
      that.elm.addEventListener("transitionend", _handleTransitionEnd, false);
    }

    function _zoomIn() {
      that._zoomIn();
    }

    function _zoomOut() {
      that._zoomOut();
    }

    function _explode() {
      that._explode();
    }

    function _vanish() {
      that._vanish();
    }

    function _handleTransitionEnd(evt) {
      that._handleTransitionEnd(evt);
    }
  }

  PandemicSpan.CONST = {
    DEFAULT_STYLE : [
      ";",
      "display: inline-block;",
      "-webkit-transition: all 1s ease;",
      "-moz-transition: all 1s ease;",
      "-ms-transition: all 1s ease;",
      "-o-transition: all 1s ease;",
      "transition: all 1s ease;",
      "-webkit-transform: rotateZ(0deg);",
      "-moz-transform: rotateZ(0deg);",
      "-ms-transform: rotateZ(0deg);",
      "-o-transform: rotateZ(0deg);",
      "transform: rotateZ(0deg);",
      "font-size: 100%;",
      "opacity: 1;"
    ].join(""),
    KLASS : "k-virus"
  };

  PandemicSpan.prototype._handleTransitionEnd = function(evt) {
    var that = this;

    if (!!that.achooFlag) {
      ++that.index;
      if (that.index < that.queue.length) {
        that.queue[that.index]();
      }
    }
  };

  PandemicSpan.prototype._zoomIn = function() {
    var that = this;

    that.elm.style["font-size"] = "200%";
  };

  PandemicSpan.prototype._zoomOut = function() {
    var that = this;

    that.elm.style["font-size"] = "50%";
  };

  PandemicSpan.prototype._explode = function() {
    var that = this;

    that.elm.style["-webkit-transform"] = "rotateZ(360deg)";
    that.elm.style["-moz-transform"] = "rotateZ(360deg)";
    that.elm.style["-ms-transform"] = "rotateZ(360deg)";
    that.elm.style["-o-transform"] = "rotateZ(360deg)";
    that.elm.style["transform"] = "rotateZ(360deg)";
    that.elm.style["font-size"] = "5000%";
    that.elm.style["opacity"] = "0";
  };

  PandemicSpan.prototype._vanish = function() {
    var that = this;

    that.elm.style.display = "none";

    that.achooFlag = false;
    that.index = 0;
  };

  PandemicSpan.prototype.achoo = function() {
    var that = this;

    that.achooFlag = true;
    that.queue[that.index]();
  };

  var index = 0,
      sickSpanList = [];
  
  [].slice.call(doc.querySelectorAll("." + PandemicSpan.CONST.KLASS)).forEach(function(dom) {
    dom.style.cssText = "";
    dom.classList.remove(PandemicSpan.CONST.KLASS);
  });

  examination(doc.body);

  sickSpanList = [].slice.call(doc.querySelectorAll("." + PandemicSpan.CONST.KLASS)).map(function(sickSpan) {
    return new PandemicSpan(sickSpan);
  });

  setTimeout(function catchCold() {
    if (index < sickSpanList.length) {
      sickSpanList[index++].achoo();
      setTimeout(catchCold, index);
    }
  }, 500);
    
  function examination(dom) {
      [].slice.call(dom.childNodes).forEach(function(child) {
          if (child.nodeType === 3) {
              child.textContent = child.textContent.replace(/(か|ぜ|カ|ゼ|風|邪)/g, "<<span<<$1>>span>>");
          } else {
              examination(child);
          }
      });
      
      if (dom.innerHTML) {
          dom.innerHTML = dom.innerHTML.replace(/&lt;&lt;span&lt;&lt;/g, "<span class='" + PandemicSpan.CONST.KLASS + "'>");
          dom.innerHTML = dom.innerHTML.replace(/&gt;&gt;span&gt;&gt;/g, "</span>");
      }
  }

})(this, document);