// <canvas> (IE 9)
// localStorage (IE 8)
// Object.defineProperty (IE 8)
// window.getComputedStyle (IE 9)
(function () {
	//https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function (searchString, position) {
			position = position || 0;
			return this.substr(position, searchString.length) === searchString;
		};
	}
	//https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function (searchString, position) {
			position = position || this.length;
			position = position - searchString.length;
			return position >= 0 && this.lastIndexOf(searchString) === position;
		};
	}
	// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/find
	if (!Array.prototype.find) {
		Array.prototype.find = function (predicate) {
			if (this == null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		};
	}
	// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
	if (!Array.prototype.findIndex) {
		Array.prototype.findIndex = function (predicate) {
			if (this == null) {
				throw new TypeError('Array.prototype.findIndex called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return i;
				}
			}
			return -1;
		};
	}
	// requestAnimationFrame (IE 10, Android N/A)
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame);
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function (callback) {
				window.setTimeout(function () { callback(new Date().getTime()); }, 1000 / 30);
				return 1;
			}
		}
	}
	// performance.now (IE 10)
	if (!window.performance) {
		window.performance = {
			now: function () { return new Date().getTime(); }
		}
	}
	// CustomEvent for IE 11 - https://developer.mozilla.org/docs/Web/API/CustomEvent/CustomEvent
	if (typeof window.CustomEvent !== "function") {
		function CustomEvent(event, params) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	}
})();
