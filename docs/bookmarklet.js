(() => {

  'use strict';

  function PandemicSpan(elm) {
    _constructor.call(this, elm);

    function _constructor() {
      this.elm = elm;
      this.queue = [
        _zoomIn.bind(this),
        _zoomOut.bind(this),
        _zoomIn.bind(this),
        _zoomOut.bind(this),
        _explode.bind(this),
        _vanish.bind(this)
      ];
      this.achooFlag = false;
      this.index = 0;
      this.elm.style.cssText += PandemicSpan.CONST.DEFAULT_STYLE;

      this.elm.addEventListener('webkitTransitionEnd', _handleTransitionEnd.bind(this), false);
      this.elm.addEventListener('mozTransitionEnd', _handleTransitionEnd.bind(this), false);
      this.elm.addEventListener('msTransitionEnd', _handleTransitionEnd.bind(this), false);
      this.elm.addEventListener('oTransitionEnd', _handleTransitionEnd.bind(this), false);
      this.elm.addEventListener('transitionend', _handleTransitionEnd.bind(this), false);
    }

    function _zoomIn() {
      this._zoomIn();
    }

    function _zoomOut() {
      this._zoomOut();
    }

    function _explode() {
      this._explode();
    }

    function _vanish() {
      this._vanish();
    }

    function _handleTransitionEnd(evt) {
      this._handleTransitionEnd(evt);
    }
  }

  PandemicSpan.CONST = {
    DEFAULT_STYLE : [
      ';',
      'display: inline-block;',
      '-webkit-transition: all 1s ease;',
      '-moz-transition: all 1s ease;',
      '-ms-transition: all 1s ease;',
      '-o-transition: all 1s ease;',
      'transition: all 1s ease;',
      '-webkit-transform: rotateZ(0deg);',
      '-moz-transform: rotateZ(0deg);',
      '-ms-transform: rotateZ(0deg);',
      '-o-transform: rotateZ(0deg);',
      'transform: rotateZ(0deg);',
      'font-size: 100%;',
      'opacity: 1;'
    ].join(''),
    KLASS : 'k-virus'
  };

  PandemicSpan.prototype._handleTransitionEnd = function(evt) {
    if (!!this.achooFlag) {
      ++this.index;

      if (this.index < this.queue.length) {
        this.queue[this.index]();
      }
    }
  };

  PandemicSpan.prototype._zoomIn = function() {
    this.elm.style['font-size'] = '200%';
  };

  PandemicSpan.prototype._zoomOut = function() {
    this.elm.style['font-size'] = '50%';
  };

  PandemicSpan.prototype._explode = function() {
    this.elm.style['-webkit-transform'] = 'rotateZ(360deg)';
    this.elm.style['-moz-transform'] = 'rotateZ(360deg)';
    this.elm.style['-ms-transform'] = 'rotateZ(360deg)';
    this.elm.style['-o-transform'] = 'rotateZ(360deg)';
    this.elm.style['transform'] = 'rotateZ(360deg)';
    this.elm.style['font-size'] = '5000%';
    this.elm.style['opacity'] = '0';
  };

  PandemicSpan.prototype._vanish = function() {
    this.elm.style.display = 'none';
    this.achooFlag = false;
    this.index = 0;
  };

  PandemicSpan.prototype.achoo = function() {
    this.achooFlag = true;
    this.queue[this.index]();
  };

  let index = 0;
  let sickSpanList = [];

  [].slice.call(document.querySelectorAll(`.${ PandemicSpan.CONST.KLASS }`)).forEach((dom) => {
    dom.style.cssText = '';
    dom.classList.remove(PandemicSpan.CONST.KLASS);
  });

  examination(document.body);

  sickSpanList = [].slice.call(document.querySelectorAll(`.${ PandemicSpan.CONST.KLASS }`)).map((sickSpan) => {
    return new PandemicSpan(sickSpan);
  });

  setTimeout(function catchCold() {
    if (index < sickSpanList.length) {
      sickSpanList[index++].achoo();
      setTimeout(catchCold, index);
    }
  }, 500);

  function examination(dom) {
    [].slice.call(dom.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        child.textContent = child.textContent.replace(/(か|ぜ|カ|ゼ|風|邪)/g, '<<span<<$1>>span>>');
      } else {
        examination(child);
      }
    });

    if (dom.innerHTML) {
      dom.innerHTML = dom.innerHTML.replace(/&lt;&lt;span&lt;&lt;/g, `<span class="${ PandemicSpan.CONST.KLASS }">`);
      dom.innerHTML = dom.innerHTML.replace(/&gt;&gt;span&gt;&gt;/g, '</span>');
    }
  }
})();