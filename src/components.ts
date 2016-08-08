// Widgets
const SCENE_TRANSIT: Duration = 400;	// duration for fade in/out of scenes.
const SWAPPABLE_MS: Duration = 200;		// duration for swapping of swappable buttons.

// Screen
const SCREEN_W: Pixel = 1280;	// default/logical screen width
const SCREEN_H: Pixel = 720;	// default/logical screen height
const MARGIN: Pixel = 10;		// generic margin for many widgets

// Logger
interface Logger {
	log(message: any): void;
	error(message: any): void;
}

const LOG_STYLE: TextStyle = {
	fontSize: 32,
	fillStyle: "white",
	strokeStyle: "black",
	textAlign: "left",
	textBaseline: "top",
	lineWidth: 2
};
const LOG_X: Pixel = MARGIN;
const LOG_Y: Pixel = MARGIN;
const LOG_W: Pixel = SCREEN_W - MARGIN * 2;
const LOG_H: Pixel = SCREEN_H - MARGIN * 2;
const LOG_DURATION: Duration = 2000;

// Dialog.confirm
const DLG_BKGND_STYLE: ShapeStyle = {
	fillStyle: rgba(0, 0, 0, 0.8)
};
const CONFIRM_BUTTON_H = SCREEN_H / 8;
const CONFIRM_BUTTON_Y = SCREEN_H - CONFIRM_BUTTON_H * 2.5;
const CONFIRM_TEXT_STYLE: TextStyle = {
	fillStyle: "white",
	strokeStyle: "black",
	fontSize: 44,
	textAlign: "center",
	textBaseline: "middle"
};

//================================================================================
// Animation
//================================================================================

class Animation extends Component implements Job {
	private start?: Timestamp;
	private sig: Signal;

	constructor(
		public duration: Duration,	// duration in msec.
		onAnimation?: (progress: number, g: CanvasRenderingContext2D, when: Timestamp) => void
	) {
		super();
		if (onAnimation) {
			this.onAnimation = onAnimation;
		}
	}

	attach(parent: Composite): boolean {
		if (super.attach(parent)) {
			this.start = now();
			return true;
		} else {
			return false;
		}
	}

	detach(): Optional<Composite> {
		this.start = undefined;
		return super.detach();
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		let { start } = this;
		if (start) {
			let end = start + this.duration;
			if (when >= end) {
				this.onAnimation(1, g, when);
				this.detach();
				commit(this.sig);
				this.sig = undefined;
			} else {
				let progress = max(0, when - start) / this.duration;
				this.onAnimation(progress, g, when);
			}
		}
	}

	// called with (Animation, [0, 1]) and with 'progress' = 1 at the end.
	onAnimation(_progress: number, _g: CanvasRenderingContext2D, _when: Timestamp) {
	}

	// Job routine
	then(slot: Slot): this {
		this.sig = connect(this.sig, slot);
		return this;
	}

	// helper function for duration
	static clamp(when: Timestamp, start?: Timestamp, duration?: Duration): number {
		if (!start || when < start) {
			return 0;
		} else if (!duration || start + duration < when) {
			return 1;
		} else {
			return (when - start) / duration;
		}
	}

	// helper function for cycle animation
	static cycle(when: Timestamp, start?: Timestamp, duration?: Duration): number {
		if (!start || !duration || when < start) {
			return 0;
		} else {
			return ((when - start) % duration) / duration;
		}
	}
}

class FadeIn extends Animation {
	constructor(
		public next: Component,				// next scene.
		duration: Duration = SCENE_TRANSIT	// duration in msec.
	) {
		super(duration);
	}

	onAnimation(progress: number, g: CanvasRenderingContext2D, when: Timestamp) {
		if (progress < 1) {
			if (progress > 0) {
				this.next.onDraw(g, when);
			}
			g.save();
			g.globalAlpha = 1 - progress;
			g.fillStyle = "black";
			g.fillRect(0, 0, SCREEN_W, SCREEN_H);
			g.restore();
		} else {
			this.next.attach(this.parent!);
		}
	}
}

class FadeOut extends Animation {
	constructor(
		public prev: Component,		// previous scene.
		public next?: Component,	// next scene.
		duration: Duration = SCENE_TRANSIT	// duration in msec.
	) {
		super(duration);
	}

	static go(
		prev: Component,
		next?: Component,
		duration: Duration = SCENE_TRANSIT
	): void {
		new FadeOut(prev, next, duration).attach(assume(prev.parent));
	}

	attach(parent: Composite): boolean {
		if (super.attach(parent)) {
			this.prev.detach();
			return true;
		} else {
			return false;
		}
	}

	onAnimation(progress: number, g: CanvasRenderingContext2D, when: Timestamp) {
		if (progress < 1) {
			this.prev.onDraw(g, when);
			if (progress > 0) {
				g.save();
				g.globalAlpha = progress;
				g.fillStyle = "black";
				g.fillRect(0, 0, SCREEN_W, SCREEN_H);
				g.restore();
			}
		} else if (this.next) {
			new FadeIn(this.next, this.duration).attach(this.parent!);
		}
	}
}

//================================================================================
// Dialog
//================================================================================

interface ConfirmOption {
	label: Word;
	click?: Slot;
	mnemonic?: KEY[];
}

class Dialog extends Composite {
	protected prev: Composite;

	attach(parent: Composite): boolean {
		if (!this.prev && parent.parent && super.attach(parent.parent)) {
			parent.detach();
			this.prev = parent;
			return true;
		} else {
			return false;
		}
	}

	detach(): Optional<Composite> {
		let parent = super.detach();
		if (parent) {
			this.prev.attach(parent);
		}
		return parent;
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		this.prev.onDraw(g, when);
		super.onDraw(g, when);
	}

	static confirm(
		parent: Composite,
		message: Word,
		...options: ConfirmOption[]
	): Dialog {
		assert(options.length > 0);

		let self = new Dialog();
		new Gallery(0, 0, SCREEN_W, SCREEN_H, new Label(message, CONFIRM_TEXT_STYLE, DLG_BKGND_STYLE)).attach(self);

		let { length } = options;
		let MODAL_BUTTON_W = SCREEN_W / (3 + length);
		let MODAL_BUTTON_MARGIN = MODAL_BUTTON_W / 8;
		let MODAL_BUTTON_X = (SCREEN_W - MODAL_BUTTON_W * length - MODAL_BUTTON_MARGIN * (length - 1)) / 2;
		for (let i = 0; i < length; ++i) {
			const { label, click, mnemonic } = options[i];
			new Button(MODAL_BUTTON_X + (MODAL_BUTTON_W + MODAL_BUTTON_MARGIN) * i, CONFIRM_BUTTON_Y, MODAL_BUTTON_W, CONFIRM_BUTTON_H,
				new Label(label),
				click
					? () => { self.detach(); click(); }
					: () => { self.detach(); },
				mnemonic
			).attach(self);
		}
		self.attach(parent);
		return self;
	}
}

//================================================================================
// Widget - Component with bounds.
//================================================================================

class Widget extends Component implements XYWH {
	constructor(public x: Pixel, public y: Pixel, public w: Pixel, public h: Pixel) {
		super();
	}

	contains(x: Pixel, y: Pixel): boolean {
		return this.visible && this.x <= x && this.y <= y && x < this.x + this.w && y < this.y + this.h;
	}

	get left(): Pixel {
		return this.x;
	}
	set left(value: Pixel) {
		this.w = this.w + this.x - value;
		this.x = value;
	}

	get right(): Pixel {
		return this.x + this.w;
	}
	set right(value: Pixel) {
		this.w = value - this.x;
	}

	get top(): Pixel {
		return this.y;
	}
	set top(value: Pixel) {
		this.h = this.h + this.y - value;
		this.y = value;
	}

	get bottom(): Pixel {
		return this.y + this.h;
	}
	set bottom(value: Pixel) {
		this.h = value - this.y;
	}

	get center(): XY {
		return { x: this.x + this.w / 2, y: this.y + this.h / 2 };
	}

	moveTo(x: Pixel, y: Pixel): this {
		this.x = x;
		this.y = y;
		return this;
	}

	moveBy(dx: Pixel, dy: Pixel): this {
		this.x += dx;
		this.y += dy;
		return this;
	}
}

//================================================================================
// Gallery - Display a drawable object without UI.
//================================================================================

class Gallery extends Widget {
	constructor(
		x: Pixel,
		y: Pixel,
		w: Pixel,
		h: Pixel,
		public drawable: Drawable
	) {
		super(x, y, w, h);
	}
	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		this.drawable.draw(g, when, this);
	}
}

//================================================================================
// Button
//================================================================================

const enum ButtonState {
	Normal,
	Hover,
	Pressed,
	Disabled
}

interface ButtonDesign {
	draw(g: CanvasRenderingContext2D, when: Timestamp, owner: Button): void;
}

class Button extends Widget {
	pressed?: boolean;	// 3-state boolean
	hover: boolean = false;

	constructor(
		x: Pixel,
		y: Pixel,
		w: Pixel,
		h: Pixel,
		public drawable: Drawable,
		public click?: Slot,
		public mnemonic?: KEY[],
		public design: ButtonDesign = Button.defaultDesign
	) {
		super(x, y, w, h);
	}

	static defaultDesign = {
		draw: function(g: CanvasRenderingContext2D, when: Timestamp, owner: Button): void {
			drawRect(g, owner, Button.defaultDesign.getStyle(owner.state));
			if (owner.drawable) {
				owner.drawable.draw(g, when, owner);
			}
		},
		getStyle: function(state: ButtonState): ShapeStyle {
			let style: ShapeStyle = {};
			switch (state) {
				case ButtonState.Normal:
					style.fillStyle = rgba(0, 0, 0, 0.8);
					style.strokeStyle = rgb(200, 200, 200);
					break;
				case ButtonState.Hover:
					style.fillStyle = rgba(0, 0, 50, 0.8);
					style.strokeStyle = rgb(100, 100, 200);
					break;
				case ButtonState.Pressed:
					style.fillStyle = rgba(0, 0, 150, 0.8);
					style.strokeStyle = rgb(100, 100, 255);
					break;
				case ButtonState.Disabled:
					style.fillStyle = rgba(200, 200, 200, 0.8);
					style.strokeStyle = rgb(200, 200, 200);
					break;
			}
			return style;
		}
	};

	static IconDesign = class implements ButtonDesign {
		constructor(public overlay: CanvasStyle) {
		}

		draw(g: CanvasRenderingContext2D, when: Timestamp, owner: Button): void {
			assert(owner.drawable instanceof Picture);
			let icon = owner.drawable as Picture;
			switch (owner.state) {
				case ButtonState.Normal:
					icon.draw(g, when, owner);
					break;
				case ButtonState.Hover:
					icon.draw(g, when, owner, this.overlay, 0.7);
					break;
				case ButtonState.Pressed:
					icon.draw(g, when, owner, this.overlay, 0.9);
					break;
				case ButtonState.Disabled:
					icon.draw(g, when, owner, rgb(200, 200, 200), 0.8);
					break;
			}
		}
	};

	get enabled(): boolean { return true; }
	set enabled(value: boolean) { defineProperty(this, "enabled", value); }

	get state(): ButtonState {
		if (!this.enabled) {
			return ButtonState.Disabled;
		} else if (this.pressed) {
			return ButtonState.Pressed;
		} else if (!this.hover) {
			return ButtonState.Normal;
		} else {
			return ButtonState.Hover;
		}
	}

	onHover(x: Pixel, y: Pixel): void {
		this.hover = this.contains(x, y);
		this.pressed = undefined;
	}

	onDrag(x: Pixel, y: Pixel): void {
		if (this.pressed != null) {
			this.pressed = this.contains(x, y);
		}
	}

	onDown(x: Pixel, y: Pixel): void {
		if (this.enabled && this.contains(x, y)) {
			this.pressed = true;
		}
	}

	onUp(x: Pixel, y: Pixel): void {
		let { pressed } = this;
		this.pressed = undefined;
		if (pressed) {
			if (this.contains(x, y)) {
				this.onClick();
			}
		}
	}

	onPress(key: KEY): void {
		if (this.mnemonic && this.mnemonic.indexOf(key) >= 0 && this.enabled) {
			this.pressed = false;
			this.onClick();
		}
	}

	onClick(): void {
		const { click } = this;
		if (click) {
			committed.then(() => click.call(this));
		}
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		this.design.draw(g, when, this);
	}
}

class SwappableButton extends Button {
	private dragged?: {
		xDown?: Pixel;	// not exists after swap.
		yDown?: Pixel;
		xOrig: Pixel;
		yOrig: Pixel;
	};

	private swapping?: {
		start: Timestamp;
		xFrom: Pixel;
		yFrom: Pixel;
		xTo: Pixel;
		yTo: Pixel;
	};

	constructor(
		x: Pixel,
		y: Pixel,
		w: Pixel,
		h: Pixel,
		public group: SwappableButton[],
		drawable: Drawable,
		click?: Slot,
		public swap?: (this: SwappableButton, that: SwappableButton) => void,
		mnemonic?: KEY[],
		design: ButtonDesign = Button.defaultDesign
	) {
		super(x, y, w, h, drawable, click, mnemonic, design);
		group.push(this);
	}

	onDrag(x: Pixel, y: Pixel): void {
		super.onDrag(x, y);
		let { dragged, swapping} = this;
		if (dragged && !swapping) {
			let that = this.group.find(o => o !== this && o.contains(x, y) && !o.swapping);
			if (that) {
				let when = now();
				this.onSwap(that, when);
				that.onSwap(this, when);
				swapping = this.swapping!;
				this.dragged = {
					xOrig: swapping.xTo,
					yOrig: swapping.yTo
				};
				if (this.swap) {
					this.swap(that);
				}
			} else if (dragged.xDown != null) {
				this.x = (dragged.xOrig - dragged.xDown + x);
				this.y = (dragged.yOrig - dragged.yDown + y);
			} else if (this.contains(x, y)) {
				dragged.xDown = x;
				dragged.yDown = y;
			} else {
				this.dragged = undefined;
				this.pressed = undefined;
				this.hover = false;
			}
		}
	}

	onDown(x: Pixel, y: Pixel): void {
		super.onDown(x, y);
		if (!this.dragged && this.contains(x, y)) {
			this.dragged = {
				xDown: x,
				yDown: y,
				xOrig: this.x,
				yOrig: this.y
			};
		}
	}

	onUp(x: Pixel, y: Pixel): void {
		if (this.swapping) {
			this.dragged = undefined;
			super.onUp(x, y);
		} else if (!this.dragged) {
			super.onUp(x, y);
		} else {
			let { xOrig, yOrig } = this.dragged;
			this.swapping = {
				start: now(),
				xFrom: this.x,
				yFrom: this.y,
				xTo: xOrig,
				yTo: yOrig
			};
			this.dragged = undefined;
			if (this.pressed) {
				this.pressed = undefined;
				if (this.contains(x, y) && xOrig <= x && yOrig <= y && x < xOrig + this.w && y < yOrig + this.h) {
					this.onClick();
				}
			}
		}
	}

	onSwap(that: SwappableButton, when: Timestamp) {
		this.pressed = undefined;
		this.swapping = {
			start: when,
			xFrom: this.x,
			yFrom: this.y,
			xTo: (that.dragged ? that.dragged.xOrig : that.x),
			yTo: (that.dragged ? that.dragged.yOrig : that.y)
		};
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		if (this.swapping) {
			let progress = Animation.clamp(when, this.swapping.start, SWAPPABLE_MS);
			if (progress < 1) {
				let d = (1 - cos(PI * progress)) / 2;
				this.x = this.swapping.xFrom * (1.0 - d) + this.swapping.xTo * d;
				this.y = this.swapping.yFrom * (1.0 - d) + this.swapping.yTo * d;
			} else {
				this.x = this.swapping.xTo;
				this.y = this.swapping.yTo;
				this.swapping = undefined;
			}
		}
		super.onDraw(g, when);
	}
}

//================================================================================
// ListView
//================================================================================

interface ListViewDesign {
	rowHeight: Pixel;
	rowFont: string;
	rowStyle: CanvasStyle;
	headerHeight: Pixel;
	headerFont: string;
	headerStyle: CanvasStyle;
	scrollBarWidth: Pixel;
	lineStyle: CanvasStyle;
	emptyText?: Word;
	emptyFont?: string;
	emptyStyle?: CanvasStyle;

	drawHeader(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void;
	drawBackground(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void;
	drawScrollBar(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void;
	drawRowDragged(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void;
	drawRowSelected(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void;
	drawRowHover(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void;
}

interface ListViewColumn<T> {
	name: Word;	// header text
	extract: ((row: T) => any) | number | string;	// value extracter
	compare?: (lhs: T, rhs: T) => number;	// sorter
	align?: TextAlign;	// row horizontal alignment
	width?: Pixel;		// row width
}

class ListView<T> extends Widget {
	private dragged?: number;	// (row index)
	private hover?: number;		// (row index)
	private scrolling?: Pixel;
	private topRow: number = 0;	// (row index) top row index to display
	private sortkeys?: number[];	// array of +- (column index + 1); nagative means desc order.
	public selected?: T;

	constructor(
		x: Pixel,
		y: Pixel,
		w: Pixel,
		h: Pixel,
		public columns: ListViewColumn<T>[],
		public rows: T[],
		public click: (row: T, rowIndex: number) => void,
		public design: ListViewDesign = ListView.defaultDesign
	) {
		super(x, y, w, h);
	}

	static defaultDesign: ListViewDesign = {
		rowHeight: 28,
		rowFont: font(20),
		rowStyle: "white",
		headerHeight: 24,
		headerFont: font(18),
		headerStyle: "white",
		scrollBarWidth: 14,
		lineStyle: rgb(102, 102, 102),

		drawHeader: function(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void {
			g.save();
			g.fillStyle = rgba(25, 25, 25, 0.8);
			g.fillRect(x, y, w, h);
			g.restore();
		},
		drawBackground: function(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void {
			g.save();
			g.fillStyle = rgba(0, 0, 0, 0.6);
			g.fillRect(x, y, w, h);
			g.restore();
		},
		drawScrollBar: function(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void {
			fillVerticalGradient(g, x, y, w, h, rgb(100, 100, 100), rgb(75, 75, 75));
		},
		drawRowDragged: function(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void {
			fillVerticalGradient(g, x, y, w, h, rgb(255, 0, 0), rgb(50, 0, 0));
		},
		drawRowSelected: function(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void {
			fillVerticalGradient(g, x, y, w, h, rgb(100, 0, 0), rgb(50, 0, 0));
		},
		drawRowHover: function(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel): void {
			fillVerticalGradient(g, x, y, w, h, rgb(75, 0, 0), rgb(50, 0, 0));
		}
	};

	static heightOf(rows: number, design: ListViewDesign = ListView.defaultDesign): number {
		return design.headerHeight + rows * design.rowHeight;
	}

	onHover(x: Pixel, y: Pixel): void {
		this.hover = this.toRowIndex(x, y);
		this.dragged = undefined;
		this.scrolling = undefined;
	}

	onDrag(_x: Pixel, y: Pixel): void {
		let { headerHeight } = this.design;
		if (this.scrolling != null) {
			let nRows = this.rows.length;
			let yItems = this.y + headerHeight;
			let hItems = this.h - headerHeight;
			this.scrollTo(floor(nRows * (y - yItems - this.scrolling) / hItems));
		} else {
			let row = this.toRowIndex(undefined, y);
			if (row != null && this.dragged != null && row !== this.dragged) {
				[this.rows[this.dragged], this.rows[row]] = [this.rows[row], this.rows[this.dragged]];
				this.dragged = row;
				this.hover = undefined;		// means row swapped
				this.scrolling = undefined;
				this.sortkeys = undefined;	// reset sort key
			}
		}
	}

	onDown(x: Pixel, y: Pixel): void {
		if (!this.contains(x, y)) { return; }
		this.hover = this.dragged = this.toRowIndex(x, y);
		if (this.dragged != null) { return; }
		let { headerHeight, scrollBarWidth } = this.design;
		let wItems = this.w - scrollBarWidth;
		let yItems = this.y + headerHeight;
		if (this.x <= x && x < this.x + wItems && this.y <= y && y < yItems) {
			// header
			let col = this.toColumnIndex(x);
			if (col != null) {
				this.sort(col, (!!this.sortkeys && this.sortkeys[0] === col + 1));
			}
		} else if (this.x + wItems <= x && x < this.right) {
			// scroll bar
			let nRows = this.rows.length;
			let nDisp = this.displayCount;
			let hItems = this.h - headerHeight;
			let yScroll = yItems + hItems * this.topRow / nRows;
			let hScroll = hItems * nDisp / nRows;
			if (yItems <= y && y < yScroll) {
				this.scrollTo(floor(nRows * (y - yItems) / hItems));
				yScroll = yItems + hItems * this.topRow / nRows;
			} else if (yScroll + hScroll <= y && y < this.bottom) {
				this.scrollTo(floor(nRows * (y - yItems) / hItems) - nDisp + 1);
				yScroll = yItems + hItems * this.topRow / nRows;
			}
			if (yScroll <= y && y < yScroll + hScroll) {
				this.scrolling = y - yScroll;
			}
		}
	}

	onUp(x: Pixel, y: Pixel): void {
		if (this.scrolling == null && this.dragged != null && this.dragged === this.hover) {
			this.click(this.rows[this.dragged], this.dragged);
			this.refresh();
		}
		this.dragged = undefined;
		this.scrolling = undefined;
		this.hover = this.toRowIndex(x, y);
	}

	onPress(key: KEY): void {
		switch (key) {
			case KEY.PAGE_DOWN:
				this.scrollBy(this.scrollStep);
				break;
			case KEY.PAGE_UP:
				this.scrollBy(-this.scrollStep);
				break;
		}
	}

	onDraw(g: CanvasRenderingContext2D, _when: Timestamp): void {
		let { design } = this;
		let { headerHeight, scrollBarWidth } = design;
		let nRows = this.rows.length;
		let nDisp = this.displayCount;
		let xItems = this.x;
		let yItems = this.y + headerHeight;
		let wItems = this.w - scrollBarWidth;
		let hItems = this.h - headerHeight;
		let xScroll = this.x + wItems;
		let yScroll = (nRows > 0 && hItems * this.topRow / nRows || 0) + yItems;
		let hScroll = (nRows > 0 && hItems * nDisp / nRows || hItems);
		let wAuto = this.defaultColumnWidth;
		// background
		design.drawHeader(g, this.x, this.y, this.w, headerHeight);
		design.drawBackground(g, this.x, yItems, wItems, hItems);
		// scroll bar
		if (scrollBarWidth > 0) {
			design.drawHeader(g, xScroll, yItems, scrollBarWidth, hItems);
			if (nDisp < nRows) {
				design.drawScrollBar(g, xScroll, yScroll, scrollBarWidth, hScroll);
			}
		}
		// rows
		g.save();
		g.font = design.rowFont;
		g.fillStyle = design.rowStyle;
		g.textBaseline = "middle";
		let hRow = design.rowHeight;
		for (let r = 0; r < nDisp; ++r) {
			let n = r + this.topRow;
			let row = this.rows[n];
			let yRow = yItems + hRow * r;
			if (n === this.dragged) {
				design.drawRowDragged(g, this.x, yRow, wItems, hRow);
			} else if (row === this.selected) {
				design.drawRowSelected(g, this.x, yRow, wItems, hRow);
			} else if (n === this.hover && this.dragged == null) {
				design.drawRowHover(g, this.x, yRow, wItems, hRow);
			}
			let ww = 0;
			for (let i = 0, len = this.columns.length; i < len; ++i) {
				let c = this.columns[i];
				let wHeader = coalesce(c.width, wAuto);
				let value = this.extract(row, c);
				if (value != null) {
					let xRow = xItems + ww + 2;
					let wRow = wHeader - 4;
					g.textAlign = (c.align || "left");
					switch (g.textAlign) {
						case "center":
							xRow += wRow / 2;
							break;
						case "right":
							xRow += wRow;
							break;
					}
					g.fillText(value, xRow, yRow + hRow / 2, wRow);
				}
				ww += wHeader;
			}
		}
		g.restore();
		// header && column partitions
		g.save();
		let ww = 0;
		g.font = design.headerFont;
		g.fillStyle = design.headerStyle;
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.strokeStyle = design.lineStyle;
		for (let i = 0, len = this.columns.length; i < len; ++i) {
			let c = this.columns[i];
			let wHeader = coalesce(c.width, wAuto);
			let xHeader = xItems + ww;
			if (i > 0) {
				g.beginPath();
				g.moveTo(xHeader, yItems);
				g.lineTo(xHeader, this.bottom);
				g.stroke();
			}
			g.fillText(c.name.localized, xHeader + wHeader / 2, this.y + headerHeight / 2);
			ww += wHeader;
		}
		g.restore();
		// empty message
		if (nDisp === 0 && hItems > 0 && design.emptyText) {
			g.save();
			if (design.emptyFont) {
				g.font = design.emptyFont;
			}
			g.textAlign = "center";
			g.textBaseline = "middle";
			if (design.emptyStyle) {
				g.fillStyle = design.emptyStyle;
			}
			g.fillText(design.emptyText.localized, this.x + wItems / 2, yItems + hItems / 2);
			g.restore();
		}
	}

	get displayCount() {
		let { design } = this;
		return min(floor((this.h - design.headerHeight) / design.rowHeight), this.rows.length);
	}

	get scrollStep(): number {
		let count = this.displayCount;
		return max(floor(count * 0.2), 1);	// 20% of rows in display
	}

	extract(row: T, col: ListViewColumn<T>): any {
		let { extract } = col;
		switch (typeof extract) {
			case "function":
				return (extract as (row: T) => any)(row);
			case "number":
				return (row as any)[extract as number];
			default:
				return (row as any)[extract as string];
		}
	}

	compare(lhs: T, rhs: T): number {
		let { sortkeys, columns } = this;
		let cmp = 0;
		if (sortkeys) {
			for (let i = 0, len = sortkeys.length; cmp === 0 && i < len; ++i) {
				let sortkey = sortkeys[i];
				let column = (sortkey > 0 ? sortkey : -sortkey) - 1;
				let c = columns[column];
				if (c.compare) {
					cmp = c.compare(lhs, rhs);
				} else {
					cmp = compare(this.extract(lhs, c), this.extract(rhs, c));
				}
				if (sortkey < 0) {
					cmp = -cmp;
				}
			}
		}
		return cmp;
	}

	sort(column: number, desc: boolean = false): void {
		assert(0 <= column && column < this.columns.length && column % 1 === 0);
		let sortkey = column + 1;
		if (!this.sortkeys) {
			this.sortkeys = [desc ? -sortkey : sortkey];
		} else {
			for (let i = 0, len = this.sortkeys.length; i < len; ++i) {
				let value = this.sortkeys[i];
				if (value === sortkey || value === -sortkey) {
					this.sortkeys.splice(i, 1);
					break;
				}
			}
			this.sortkeys.unshift(desc ? -sortkey : sortkey);
		}
		this.rows.sort((lhs, rhs) => this.compare(lhs, rhs));
	}

	// from screen coordinate to row index
	toRowIndex(x: Optional<Pixel>, y: Pixel): Optional<number> {
		let { design } = this;
		let wItems = this.w - design.scrollBarWidth;
		if (x === undefined || (this.x <= x && x < this.x + wItems)) {
			let n = this.topRow + floor((y - this.y - design.headerHeight) / design.rowHeight);
			if (this.topRow <= n && n < this.rows.length) {
				return n;
			}
		}
		return undefined;
	}

	// from screen coordinate to column index
	toColumnIndex(x: Pixel): Optional<number> {
		let wAuto = this.defaultColumnWidth;
		let ww = this.x;
		for (let i = 0, len = this.columns.length; i < len; ++i) {
			let c = this.columns[i];
			let wHeader = coalesce(c.width, wAuto);
			if (ww <= x && x < ww + wHeader) {
				return i;
			}
			ww += wHeader;
		}
		return undefined;
	}

	get defaultColumnWidth(): number {
		let wItems = this.w - this.design.scrollBarWidth;
		let wTotal = 0;
		let nAuto = 0;
		for (let c of this.columns) {
			if (c.width != null) {
				wTotal += c.width;
			} else {
				++nAuto;
			}
		}
		if (nAuto > 0 && wTotal < wItems) {
			return (wItems - wTotal) / nAuto;
		} else {
			return 0;
		}
	}

	refresh() {
		let len = this.rows.length;
		if (this.dragged >= len) {
			this.dragged = undefined;
		}
		if (this.hover >= len) {
			this.hover = undefined;
		}
		this.scrollTo(this.topRow);
	}

	scrollTo(pos: number) {
		this.topRow = clamp(0, this.rows.length - this.displayCount, pos);
	}

	scrollBy(by: number) {
		this.scrollTo(this.topRow + by);
	}
}

//================================================================================
// Slider
//================================================================================

interface SliderValue {
	min: number;
	max: number;
	value: number;
}

class Integer implements SliderValue {
	private _value: number;

	constructor(
		value: number,
		public min: number,
		public max: number
	) {
		assert(min <= value);
		assert(value <= max);
		this.value = value;
	}

	get value(): number { return this._value; }
	set value(value: number) { this._value = clamp(this.min, this.max, round(value)); }

	toString(): string { return this._value.toString(); }
	valueOf(): number { return this._value; }
}

const enum SliderKnobState {
	Normal,
	Hover,
	Dragged
}

interface SliderKnob extends XYWH {
	state: SliderKnobState;
}

interface SliderDesign {
	knobWidth: number;
	draw(g: CanvasRenderingContext2D, when: Timestamp, owner: Slider): void;
}

class Slider extends Widget {
	protected dragged: boolean = false;
	protected hover: boolean = false;

	constructor(
		x: Pixel,
		y: Pixel,
		w: Pixel,
		h: Pixel,
		public value: SliderValue,
		public design: SliderDesign = Slider.defaultDesign
	) {
		super(x, y, w, h);
	}

	static defaultDesign: SliderDesign = {
		knobWidth: 12,
		draw: function(g: CanvasRenderingContext2D, _when: Timestamp, owner: Slider): void {
			// Background
			drawRect(g, owner, {
				fillStyle: rgba(50, 50, 50, 0.8),
				strokeStyle: "white",
				lineWidth: 4
			});
			// Knob
			let knob = owner.knob;
			let style: ShapeStyle = {
				strokeStyle: "white",
				lineWidth: 4
			};
			switch (knob.state) {
				case SliderKnobState.Normal:
					style.fillStyle = rgba(150, 150, 150, 0.8);
					break;
				case SliderKnobState.Hover:
					style.fillStyle = rgba(200, 200, 200, 0.8);
					break;
				case SliderKnobState.Dragged:
					style.fillStyle = rgba(255, 255, 255, 0.8);
					break;
			}
			drawRect(g, knob, style);
		}
	};

	private getValueAsX(): Pixel {
		let wKnob = this.design.knobWidth;
		let { value, min, max } = this.value;
		let ratio = (value - min) / (max - min);
		return this.x + wKnob / 2 + (this.w - wKnob) * ratio;
	}

	private setValueByX(x: Pixel): void {
		let wKnob = this.design.knobWidth;
		let ratio = clamp(0, 1, (x - this.x - wKnob / 2) / (this.w - wKnob));
		let { min, max } = this.value;
		this.value.value = round(min + ratio * (max - min));
	}

	onHover(x: Pixel, y: Pixel): void {
		this.hover = this.contains(x, y);
		this.dragged = false;
	}

	onDrag(x: Pixel, y: Pixel): void {
		this.hover = (this.dragged && this.contains(x, y));
		if (this.dragged) {
			this.setValueByX(x);
		}
	}

	onDown(x: Pixel, y: Pixel): void {
		if (this.contains(x, y)) {
			this.dragged = true;
			this.setValueByX(x);
		}
	}

	onUp(_x: Pixel, _y: Pixel): void {
		this.dragged = false;
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		this.design.draw(g, when, this);
	}

	get knob(): SliderKnob {
		let w = this.design.knobWidth;
		let h = this.h;
		let x = this.getValueAsX() - w / 2;
		let y = this.y - (this.h - h) / 2;
		let state: SliderKnobState;
		if (this.dragged) {
			state = SliderKnobState.Dragged;
		} else if (this.hover) {
			state = SliderKnobState.Hover;
		} else {
			state = SliderKnobState.Normal;
		}
		return { x, y, w, h, state };
	}
}

//================================================================================

class ScreenLogger extends Widget implements Logger {
	logs: {
		message: string;
		when: Timestamp;
	}[];

	constructor(x: Pixel, y: Pixel, w: Pixel, h: Pixel, public duration: Duration, public style: TextStyle) {
		super(x, y, w, h);
		this.logs = [];
	}

	onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
		let { logs } = this;
		if (logs.length > 0) {
			let expired = when - this.duration;
			let keep = logs.findIndex(value => value.when > expired);
			if (keep < 0) {
				logs.length = 0;
			} else {
				logs.splice(0, keep);
			}
			let len = logs.length;
			if (len > 0) {
				let { style } = this;
				let stride = 1.2 * getFontSize(g, style);
				for (let i = 0; i < len; ++i) {
					let { message } = logs[i];
					drawTextBox(g, message, this.x, this.y + i * stride, this.w, stride, style);
				}
			}
		}
	}

	log(message: any): void {
		if (message) {
			let when = now();
			let { logs } = this;
			let { length } = logs;
			if (length > 0 && logs[length - 1].message === message) {
				logs[length - 1].when = when;	// keep alive the last one for repeated messages
			} else {
				logs.push({ message: str(message), when: when });
			}
		}
	}

	error(message: any): void {
		// XXX: play sound?
		this.log(message);
	}
}
