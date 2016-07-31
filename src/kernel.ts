declare const NDEBUG: boolean;
const DEBUG = (typeof NDEBUG === "undefined");
const TOUCH_ONLY = false;	// set true to emulate touch-only devices.

type Optional<T> = T | undefined;

//interface Timestamp extends Number { Timestamp; };
type Timestamp = number;
//interface Duration extends Number { Duration; };
type Duration = number;
//interface Pixel extends Number { Pixel; };
type Pixel = number;

const DEFAULT_FONT_SIZE: Pixel = 24;
const DEFAULT_FONT_FAMILY = "Arial";
const CANVAS_RESIZE_DELAY: Duration = 300;

//================================================================================

interface Dictionary {
	readonly [id: string]: string | Dictionary;
}

interface System {
	// export
	main(canvas: HTMLCanvasElement, resume: boolean): void;
	checkpoint(): void;
	localize(lang: string, dict: Dictionary): void;
	// import
	readonly canvas: HTMLCanvasElement;
	exit(): void;
	getLocalStorage(key: string): Optional<string>;
	setLocalStorage(key: string, value: string): void;
	getRoamingStorage(key: string): Optional<string>;
	setRoamingStorage(key: string, value: Optional<string>): void;
	getFullScreen(): boolean;
	setFullScreenn(value: boolean): void;
}

declare var System: System;

//================================================================================
// ES6
//================================================================================

interface String {
	startsWith(searchString: string, position?: number): boolean;
	endsWith(searchString: string, position?: number): boolean;
}

interface Array<T> {
	find<THIS>(callback: (this: THIS, value: T, index: number, list: T[]) => boolean, thisArg?: THIS): T;
	findIndex<THIS>(callback: (this: THIS, value: T, index: number, list: T[]) => boolean, thisArg?: THIS): number;
}

//================================================================================

type Slot = () => void;
type Signal = Optional<Slot | Slot[]>;

const { keys } = Object;
const { abs, min, max, floor, ceil, round, pow, sin, cos, atan2, PI, random } = Math;
const { parse, stringify } = JSON;

function now(): Timestamp {
	return performance.now() as Timestamp;	// NOTE: required performance as "this".
}

function clamp<T>(lo: T, hi: T, value: T): T {
	return value < lo ? lo : value > hi ? hi : value;
}

function coalesce<A1, A2>(a1: A1, a2: A2): A1 | A2 {
	return a1 != null ? a1 : a2;
}

// return random integer [0, upper)
function rand(upper: number): number {
	return floor(random() * upper);
}

const assert = (DEBUG
	? function (condition: any) { if (!condition) { throw new Error("Assertion failure"); } }
	: function () { }
);

interface ToJSON<JSON> {
	toJSON(): JSON;
}

function toJSON<JSON>(arr?: ToJSON<JSON>[]): JSON[] {
	if (!arr) { return []; }
	return arr.map(item => (item != null ? item.toJSON() : undefined));
}

interface FromJSON<JSON, TYPE> {
	fromJSON(json: JSON): TYPE;
}

function fromJSON<JSON, TYPE>(type: FromJSON<JSON, TYPE>, arr?: JSON[]): TYPE[] {
	if (!arr) { return []; }
	return arr.map(json => (json != null ? type.fromJSON(json) : undefined));
}

function str(value: any): string {
	if (value === undefined) {
		return "(undefined)";
	} else if (value === null) {
		return "(null)";
	} else {
		return value.toString();
	}
}

function format(s: string, ...args: any[]): string {
	return s.replace(/\$\{(\d+)\}/g, (match: string, id: string) => {
		let n = parseInt(id, 10);
		return str(args[n]);
	});
}

function defineProperty<T>(self: T, name: string, value: any): T {
	return Object.defineProperty(self, name, {
		enumerable: true,
		configurable: true,
		writable: true,
		value: value
	});
}

function defineGetSet<T, V>(self: T, name: string, get: () => V, set?: (value: V) => void): T {
	return Object.defineProperty(self, name, {
		enumerable: true,
		configurable: true,
		get: get,
		set: set
	});
}

// execute javascript
function require(src: string, onerror: Slot): void {
	let script = document.createElement("script");
	script.src = src;
	script.onerror = onerror;
	document.head.appendChild(script);
}

// generic comparison for sorting.
function compare(lhs: any, rhs: any): number {
	// check undefined and null. NOTE: typeof null === "object"
	if (lhs === rhs) {
		return 0;
	} else if (lhs === undefined && rhs !== undefined) {
		return -1;
	} else if (lhs !== undefined && rhs === undefined) {
		return +1;
	} else if (lhs === null && rhs !== null) {
		return -1;
	} else if (lhs !== null && rhs === null) {
		return +1;
	}
	// check by type
	let typeL = typeof lhs;
	let typeR = typeof rhs;
	if (typeL !== typeR) {
		return typeL < typeR ? -1 : +1;	// XXX: Or, TYPEORDER[typeL] < TYPEORDER[typeR]
	}
	// same type; check by value
	if (typeL === "object") {
		if (lhs instanceof Date && rhs instanceof Date) {
			return compare(lhs.getTime(), rhs.getTime());
		} else if (lhs instanceof Array && rhs instanceof Array) {
			return compareArrays(lhs, rhs);
		} else if (lhs.constructor === Object && rhs.constructor === Object) {
			return compareObjects(lhs, rhs);
		}
		throw new TypeError(`Cannot compare: (${lhs}) and (${rhs})`);
	}
	// default comparison
	if (lhs < rhs) { return -1; }
	if (lhs > rhs) { return +1; }
	return 0;
}

function compareArrays(lhs: any[], rhs: any[]): number {
	let lenL = lhs.length;
	let lenR = rhs.length;
	for (let i = 0, len = min(lenL, lenR); i < len; ++i) {
		let cmp = compare(lhs[i], rhs[i]);
		if (cmp !== 0) { return cmp; }
	}
	if (lenL < lenR) { return -1; }
	if (lenL > lenR) { return +1; }
	return 0;
}

function compareObjects(lhs: any, rhs: any): number {
	let keysL = keys(lhs).sort();
	let keysR = keys(rhs).sort();
	let lenL = keysL.length;
	let lenR = keysR.length;
	let len = min(lenL, lenR);
	for (let i = 0; i < len; ++i) {
		let keyL = keysL[i];
		let keyR = keysR[i];
		if (keyL < keyR) { return -1; }
		if (keyL > keyR) { return -1; }
		let cmp = compare(lhs[keyL], rhs[keyR]);
		if (cmp !== 0) { return cmp; }
	}
	if (lenL < lenR) { return -1; }
	if (lenL > lenR) { return +1; }
	return 0;
}

function font(fontSize?: Pixel, fontFamily?: string): string {
	return `${fontSize || DEFAULT_FONT_SIZE}px ${fontFamily || DEFAULT_FONT_FAMILY}`;
}

function getFontSize(g: CanvasRenderingContext2D, style?: TextStyle): Pixel {
	// TODO: extract size in g.font.
	return (style && style.fontSize || DEFAULT_FONT_SIZE);
}

//================================================================================
// Job and Signal
//================================================================================

// Job - like Promise, but only supports then().
interface Job {
	then(slot: Slot): this;
}

const committed = new class implements Job {
	private sig?: Signal;

	then(slot: Slot): this {
		this.sig = connect(this.sig, slot);
		return this;
	}

	finish(): void {
		let { sig } = this;
		if (sig) {
			this.sig = undefined;
			if (typeof sig === "function") {
				sig();
			} else {
				for (let slot of sig) {
					slot();
				}
			}
		}
	}
};

function connect(sig: Signal, slot: Slot): Signal {
	assert(slot);
	if (!sig) {
		return slot;
	} else if (typeof sig === "function") {
		return [sig, slot];
	} else {
		sig.push(slot);
		return sig;
	}
}

function commit(sig: Signal): void {
	if (!sig) {
		// no waiters
	} else if (typeof sig === "function") {
		committed.then(sig);
	} else {
		for (let slot of sig) {
			committed.then(slot);
		}
	}
}

// similar to Promise.all()
function join(jobs: Job[]): Job {
	let sig: Signal;
	let remains = jobs.length;
	let all = {
		then: function (this: Job, slot: Slot): Job {
			if (remains > 0) {
				sig = connect(sig, slot);
			} else {
				committed.then(slot);
			}
			return this;
		}
	};
	for (let job of jobs) {
		assert(job !== committed);
		job.then(() => {
			assert(remains > 0);
			if (--remains <= 0) {
				commit(sig);
				sig = undefined;
			}
		});
	}
	return all;
}

function delay(fn: () => Job): Job & Slot {
	let sig: Signal;
	let job = function () {
		fn().then(() => {
			commit(sig);
			sig = undefined;
			job.then = thenAfter;
		});
	} as any;
	job.then = thenBefore;

	function thenBefore(this: Job, slot: Slot): Job {
		sig = connect(sig, slot);
		return this;
	};

	function thenAfter(this: Job, slot: Slot): Job {
		committed.then(slot);
		return this;
	}

	return job;
}

//================================================================================
// Word
//================================================================================

class Word {
	static language: string = window.navigator.language.substr(0, 2);
	static fallback: string = "en";

	// languages[locale]
	// - undefined: not supported
	// - string: supported, but not loaded yet
	// - true: now loading
	// - false: load error
	// - {}: successfully loaded
	static readonly languages: { [locale: string]: string | boolean | Dictionary } = {};

	private _localized?: string;
	private _language?: string;

	constructor(public src: string[]) {
	}

	get localized(): string {
		if (this._language !== Word.language) {
			let localized = localize(this.src);
			if (localized) {
				this._language = Word.language;
				this._localized = localized;
			}
		}
		return this._localized || alt(this.src);

		// returns localized string, or id as-is if not found, or null if localizer is not ready.
		function localize(src: string[]): Optional<string> {
			let { languages, language } = Word;
			let dict = languages[language];
			if (!dict) {
				// unsupported language, so fallback
				assert(languages[Word.fallback] !== undefined);
				language = Word.language = Word.fallback;
				dict = languages[language];
			}
			if (typeof dict === "string") {
				languages[language] = true;
				require(dict, () => { languages[language] = false; });
				return undefined;	// now loading
			} else if (dict === true) {
				return undefined;	// now loading
			} else if (dict === false) {
				return alt(src);	// load error
			} else {
				let value = dict as Dictionary;
				for (let i = 0, len = src.length; i < len; ++i) {
					let child = value[src[i]];
					if (!child) {
						return alt(src);
					}
					value = child as Dictionary;
				}
				return value.toString();
			}
		}

		function alt(src: string[]): string {
			return src.join(".");
		}
	}

	toString(): string { return this.localized; }
}

function _(...src: string[]): Word {
	return new Word(src);
}

System.localize = function (lang: string, dict: Dictionary): void {
	Word.languages[lang] = dict;
};

//================================================================================
// Components
//================================================================================

enum KEY {
	TAB = 9,
	ENTER = 13,
	ESCAPE = 27,
	SPACE = 32,
	PAGE_UP = 33,
	PAGE_DOWN = 34,
	_END = 35,
	_HOME = 36,
	LEFT = 37,
	UP = 38,
	RIGHT = 39,
	DOWN = 40,
	_INSERT = 45,
	DELETE = 46,
	$0 = 48, $1, $2, $3, $4, $5, $6, $7, $8, $9,
	A = 65, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
}

class Component {
	parent?: Composite;

	onHover(x: Pixel, y: Pixel): void { }
	onDrag(x: Pixel, y: Pixel): void { }
	onDown(x: Pixel, y: Pixel): void { }
	onUp(x: Pixel, y: Pixel): void { }
	onPress(key: KEY): void { }
	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void { }

	attach(parent: Composite): boolean {
		assert(parent);
		return parent.onAttach(this);
	}

	detach(): Optional<Composite> {
		let { parent } = this;
		if (parent) {
			parent.onDetach(this);
			assert(!this.parent);
			return parent;
		} else {
			return undefined;
		}
	}

	get visible(): boolean { return true; }
	set visible(value: boolean) { defineProperty(this, "visible", value); }
}

//================================================================================
// Composite
//================================================================================

class Composite extends Component {
	public children: Component[];

	constructor(children?: Component[]) {
		super();
		this.children = [];
		if (children) {
			for (let child of children) {
				child.attach(this);
			}
		}
	}

	onAttach(child: Component): boolean {
		if (child.parent === this) { return false; }
		assert(!child.parent);

		this.children.push(child);
		child.parent = this;
		return true;
	}

	onDetach(child: Component): boolean {
		if (!child.parent) { return false; }
		assert(child.parent === this);

		child.parent = undefined;
		let { children } = this;
		for (let i = 0; i < children.length; ++i) {
			if (children[i] === child) {
				// clone children to ensure current event handler not to skip existing children.
				this.children = Array_clone_except(this.children, i);
				return true;
			}
		}
		// inconsistent parent and children...
		return true;

		function Array_clone_except<T>(arr: T[], index: number): T[] {
			let { length } = arr;
			assert(0 <= index);
			assert(index < length);
			let clone: T[] = new Array(length - 1);
			for (let i = 0; i < index; ++i) {
				clone[i] = arr[i];
			}
			for (let i = index + 1; i < length; ++i) {
				clone[i - 1] = arr[i];
			}
			return clone;
		}
	}

	onHover(x: Pixel, y: Pixel): void {
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onHover(x, y);
			}
		}
	}

	onDrag(x: Pixel, y: Pixel): void {
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onDrag(x, y);
			}
		}
	}

	onDown(x: Pixel, y: Pixel): void {
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onDown(x, y);
			}
		}
	}

	onUp(x: Pixel, y: Pixel): void {
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onUp(x, y);
			}
		}
	}

	onPress(key: KEY): void {
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onPress(key);
			}
		}
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onDraw(g, when);
			}
		}
	}
}

interface CanvasRenderingContext2D {
	// https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/filter
	filter?: string;	// only works on Chrome and Firefox (49+)
	//
	debugSaveAndRestoreCount?: number;
}

if (DEBUG) {
	let { save, restore } = CanvasRenderingContext2D.prototype;

	CanvasRenderingContext2D.prototype.save = function (this: CanvasRenderingContext2D) {
		this.debugSaveAndRestoreCount = (this.debugSaveAndRestoreCount || 0) + 1;
		save.call(this);
	};

	CanvasRenderingContext2D.prototype.restore = function (this: CanvasRenderingContext2D) {
		this.debugSaveAndRestoreCount = this.debugSaveAndRestoreCount - 1;
		restore.call(this);
	};

	Composite.prototype.onDraw = function (this: Composite, g: CanvasRenderingContext2D, when: Timestamp): void {
		let before = (g.debugSaveAndRestoreCount || 0);
		let { children } = this;	// keep it in local
		for (let o of children) {
			if (o.visible) {
				o.onDraw(g, when);
				let after = (g.debugSaveAndRestoreCount || 0);
				if (after !== before) {
					throw new Error(`save and restore are not balanced: ${after} but expected ${before}`);
				}
			}
		}
	};
}

//================================================================================
// main loop
//================================================================================

interface CanvasConfig {
	magnifyCanvas: boolean;
	refineCanvas: boolean;
}

function run(canvas: HTMLCanvasElement, root: Component, config: CanvasConfig): void {
	let logicalWidth = canvas.width;
	assert(logicalWidth > 0);
	let logicalHeight = canvas.height;
	assert(logicalHeight > 0);

	function canvasX(e: MouseEvent): Pixel {
		let x: number;
		if (e.pageX === undefined) {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
		} else {
			x = e.pageX - canvas.offsetLeft;
		}
		return x * logicalWidth / canvas.offsetWidth;
	}

	function canvasY(e: MouseEvent): Pixel {
		let y: number;
		if (e.pageY === undefined) {
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
		} else {
			y = e.pageY - canvas.offsetTop;
		}
		return y * logicalHeight / canvas.offsetHeight;
	}

	function onMove(e: MouseEvent) {
		if (e.buttons & 1) { // L
			root.onDrag(canvasX(e), canvasY(e));
		} else if (!TOUCH_ONLY) {
			root.onHover(canvasX(e), canvasY(e));
		}
		e.preventDefault();
	}
	canvas.addEventListener("mousemove", onMove);
	canvas.addEventListener("touchmove", onMove);

	function onDown(e: MouseEvent) {
		switch (e.button) {
			case 0:	// L
				root.onDown(canvasX(e), canvasY(e));
				break;
		}
		e.preventDefault();
	}
	canvas.addEventListener("mousedown", onDown);
	canvas.addEventListener("touchstart", onDown);

	function onUp(e: MouseEvent) {
		switch (e.button) {
			case 0:	// L
				root.onUp(canvasX(e), canvasY(e));
				break;
			case 2:	// R
				if (!TOUCH_ONLY) { root.onPress(KEY.TAB); }
				break;
		}
		e.preventDefault();
	}
	canvas.addEventListener("mouseup", onUp);
	canvas.addEventListener("touchend", onUp);

	canvas.addEventListener("contextmenu", (e: MouseEvent) => {
		e.preventDefault();
	});
	canvas.addEventListener("mousewheel", (e: MouseWheelEvent) => {
		root.onPress((e.wheelDelta > 0 ? KEY.PAGE_UP : KEY.PAGE_DOWN));
		e.preventDefault();
	});
	window.addEventListener("keydown", (e: KeyboardEvent) => {
		if (!e.ctrlKey && !e.altKey) {
			let key = coalesce(e.keyCode, e.charCode);
			if (key && KEY[key]) {
				root.onPress(key);
				e.preventDefault();
			}
		}
	});

	function resizeCanvas(w: Pixel, h: Pixel) {
		if (w > 0 && h > 0) {
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			if (!config.refineCanvas && (w > logicalWidth || h > logicalHeight)) {
				w = logicalWidth;
				h = logicalHeight;
			}
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
			}
		}
	};

	let timerResizeCanvas: Optional<number>;
	function requestResizeCanvas() {
		if (timerResizeCanvas) {
			clearTimeout(timerResizeCanvas);
		}
		timerResizeCanvas = setTimeout(() => {
			timerResizeCanvas = undefined;
			let { clientWidth, clientHeight } = canvas.parentElement;
			clientHeight -= canvas.offsetTop;
			if (clientHeight > 0) {
				if (!config.magnifyCanvas) {
					clientWidth = min(clientWidth, logicalWidth);
					clientHeight = min(clientHeight, logicalHeight);
				}
				if (clientWidth * logicalHeight > logicalWidth * clientHeight) {
					clientWidth = round(clientHeight * logicalWidth / logicalHeight);
				} else {
					clientHeight = round(clientWidth * logicalHeight / logicalWidth);
				}
				resizeCanvas(clientWidth, clientHeight);
			}
		}, CANVAS_RESIZE_DELAY);
	};
	window.addEventListener("resize", requestResizeCanvas);
	if (document.readyState === "complete") {
		requestResizeCanvas();
	} else {
		window.addEventListener("load", requestResizeCanvas);
	}

	function draw(when: Timestamp) {
		// finish committed jobs
		committed.finish();
		// draw
		let { width, height } = canvas;
		let g = canvas.getContext("2d");
		if (g) {
			g.clearRect(0, 0, width, height);
			g.save();
			g.font = font();
			if (width !== logicalWidth || height !== logicalHeight) {
				g.scale(width / logicalWidth, height / logicalHeight);
			}
			root.onDraw(g, when);
			g.restore();
		}
		// register next callback
		window.requestAnimationFrame(draw);
	}
	window.requestAnimationFrame(draw);
}
