interface XY {
	x: Pixel;
	y: Pixel;
}

interface WH {
	w: Pixel;
	h: Pixel;
}

interface XYWH extends XY, WH {
}

function scaleProportionally(wh: WH, wLimit: number, hLimit: number, magnify: boolean = false): WH {
	let { w, h } = wh;
	if (w > wLimit || h > hLimit || magnify) {
		let rw = w / wLimit;
		let rh = h / hLimit;
		if (rw > rh) {
			w = wLimit;
			h /= rw;
		} else {
			w /= rh;
			h = hLimit;
		}
	}
	return { w, h };	// always return a new object.
}

//================================================================================
// CanvasRenderingContext2D
//================================================================================

type CanvasStyleString = string;	// "#...", "rgb(...)", "rgba(...)", "white", etc.
type CanvasStyle = CanvasStyleString | CanvasGradient | CanvasPattern;
type TextAlign = "left" | "right" | "center";		// FIXME: support "start" | "end"
type TextBaseline = "top" | "middle" | "bottom";	// FIXME: support "hanging" | "alphabetic" | "ideographic"

interface ShapeStyle {
	fillStyle?: CanvasStyle;
	strokeStyle?: CanvasStyle;
	globalAlpha?: Alpha;
	lineWidth?: Pixel;
}

interface TextStyle extends ShapeStyle {
	fontSize?: Pixel;
	fontFamily?: string;
	textAlign?: TextAlign;
	textBaseline?: TextBaseline;
}

function setupStyle(g: CanvasRenderingContext2D, style: any) {
	if (!style) { return; }
	for (let key in style) {
		switch (key) {
			case "fontSize":
				g.font = font(style.fontSize, style.fontFamily);
				break;
			case "fontFamily":
				if (!style.fontSize) {
					g.font = font(undefined, style.fontFamily);
				}
				break;
			default:
				(g as any)[key] = style[key];
				break;
		}
	}
}

function strokeRect(g: CanvasRenderingContext2D, rect: XYWH): void {
	g.strokeRect(rect.x, rect.y, rect.w, rect.h);
}

function fillRect(g: CanvasRenderingContext2D, rect: XYWH): void {
	g.fillRect(rect.x, rect.y, rect.w, rect.h);
}

function drawRect(g: CanvasRenderingContext2D, rect: XYWH, style?: ShapeStyle): void;
function drawRect(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel, style?: ShapeStyle): void;
function drawRect(
	g: CanvasRenderingContext2D,
	x_or_rect?: Pixel | XYWH,
	y_or_style?: Pixel | ShapeStyle,
	w?: Pixel,
	h?: Pixel,
	style?: ShapeStyle
): void {
	let x: Pixel;
	let y: Pixel;
	if (w == null) {
		({ x, y, w, h } = x_or_rect as XYWH);
		style = y_or_style as ShapeStyle;
	} else {
		x = x_or_rect as number;
		y = y_or_style as number;
	}
	if (w > 0 && h > 0) {
		g.save();
		setupStyle(g, style);
		if (!style || style.fillStyle) {
			g.fillRect(x, y, w, h!);
		}
		if (!style || style.strokeStyle) {
			let offset = g.lineWidth - 1;
			g.strokeRect(x + offset / 2, y + offset / 2, w - offset, h - offset);
		}
		g.restore();
	}
}

function drawRoundedRect(g: CanvasRenderingContext2D, rect: XYWH, style?: ShapeStyle): void;
function drawRoundedRect(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel, style?: ShapeStyle): void;
function drawRoundedRect(
	g: CanvasRenderingContext2D,
	x_or_rect?: Pixel | XYWH,
	y_or_style?: Pixel | ShapeStyle,
	w?: Pixel,
	h?: Pixel,
	style?: ShapeStyle
): void {
	let x: Pixel;
	let y: Pixel;
	if (w == null) {
		({ x, y, w, h } = x_or_rect as XYWH);
		style = y_or_style as ShapeStyle;
	} else {
		x = x_or_rect as number;
		y = y_or_style as number;
	}
	if (w > 0 && h > 0) {
		g.save();
		setupStyle(g, style);
		if (!style || style.strokeStyle) {
			let offset = g.lineWidth - 1;
			x += offset / 2;
			y += offset / 2;
			w -= offset;
			h -= offset;
		}
		let r = min(w, h) * 0.2;
		g.beginPath();
		g.moveTo(x + r, y);
		g.lineTo(x + w - r, y);
		g.quadraticCurveTo(x + w, y, x + w, y + r);
		g.lineTo(x + w, y + h - r);
		g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		g.lineTo(x + r, y + h);
		g.quadraticCurveTo(x, y + h, x, y + h - r);
		g.lineTo(x, y + r);
		g.quadraticCurveTo(x, y, x + r, y);
		if (!style || style.fillStyle) {
			g.fill();
		}
		if (!style || style.strokeStyle) {
			g.stroke();
		}
		g.restore();
	}
}

function drawText(
	g: CanvasRenderingContext2D,
	text: string,
	x: Pixel,
	y: Pixel,
	style?: TextStyle
): void {
	g.save();
	setupStyle(g, style);

	function draw(g: CanvasRenderingContext2D, text: string, x: Pixel, y: Pixel, style?: TextStyle) {
		if (!style || style.strokeStyle) { g.strokeText(text, x, y); }
		if (!style || style.fillStyle) { g.fillText(text, x, y); }
	}

	if (text.indexOf("\n") < 0) {
		draw(g, text, x, y, style);
	} else {
		let lines = text.split("\n");
		let stride = 1.2 * getFontSize(g, style);
		switch (g.textBaseline) {
			case "top":
				for (let line of lines) {
					draw(g, line, x, y, style);
					y += stride;
				}
				break;
			case "middle":
				y -= (stride * (lines.length - 1)) / 2;
				for (let line of lines) {
					draw(g, line, x, y, style);
					y += stride;
				}
				break;
			case "bottom":
				for (let line of lines.reverse()) {
					draw(g, line, x, y, style);
					y -= stride;
				}
				break;
		}
	}
	g.restore();
}

function drawTextBox(
	g: CanvasRenderingContext2D,
	text: string,
	x: Pixel,
	y: Pixel,
	w: Pixel,
	h: Pixel,
	style?: TextStyle
): void {
	g.save();
	setupStyle(g, style);

	function draw(g: CanvasRenderingContext2D, text: string, x: Pixel, y: Pixel, width: Pixel, style?: TextStyle) {
		if (!style || style.strokeStyle) { g.strokeText(text, x, y, width); }
		if (!style || style.fillStyle) { g.fillText(text, x, y, width); }
	}

	// FIXME: RTL characters.
	let tx: Pixel;
	switch (g.textAlign) {
		case "center":
			tx = x + w / 2;
			break;
		case "right":
			tx = x + w;
			break;
		default:
			tx = x;
			break;
	}

	let ty: Pixel;
	if (text.indexOf("\n") < 0) {
		switch (g.textBaseline) {
			case "middle":
				ty = y + h / 2;
				break;
			case "bottom":
				ty = y + h;
				break;
			default:
				ty = y;
				break;
		}
		draw(g, text, tx, ty, w, style);
	} else {
		let lines = text.split("\n");
		let stride = 1.2 * getFontSize(g, style);
		switch (g.textBaseline) {
			case "middle":
				ty = y + (h - stride * (lines.length - 1)) / 2;
				break;
			case "bottom":
				ty = y + h - stride * (lines.length - 1);
				break;
			default:
				ty = y;
				break;
		}
		for (let line of lines) {
			draw(g, line, tx, ty, w, style);
			ty += stride;
		}
	}
	g.restore();
}

function createLinearGradient(
	g: CanvasRenderingContext2D,
	x0: Pixel,
	y0: Pixel,
	x1: Pixel,
	y1: Pixel,
	startStyle: CanvasStyleString,
	stopStyle: CanvasStyleString
): CanvasGradient {
	let gradient = g.createLinearGradient(x0, y0, x1, y1);
	gradient.addColorStop(0, startStyle);
	gradient.addColorStop(1, stopStyle);
	return gradient;
}

function fillVerticalGradient(
	g: CanvasRenderingContext2D,
	x: Pixel,
	y: Pixel,
	w: Pixel,
	h: Pixel,
	topStyle: CanvasStyleString,
	bottomStyle: CanvasStyleString
): void {
	if (w > 0 && h > 0) {
		g.save();
		g.fillStyle = createLinearGradient(g, x, y, x, y + h, topStyle, bottomStyle);
		g.fillRect(x, y, w, h);
		g.restore();
	}
}

function fillRadialGradient(
	g: CanvasRenderingContext2D,
	x: Pixel,
	y: Pixel,
	w: Pixel,
	h: Pixel,
	innerStyle: CanvasStyleString,
	outerStyle: CanvasStyleString,
	inner: number = 0	// 0..1
): void {
	if (w > 0 && h > 0) {
		g.save();
		g.translate(x + w / 2, y + h / 2);
		g.scale(w, h);
		let gradient = g.createRadialGradient(0, 0, inner / 2, 0, 0, 0.5);
		gradient.addColorStop(0, innerStyle);
		gradient.addColorStop(1, outerStyle);
		g.fillStyle = gradient;
		g.fillRect(-0.5, -0.5, 1, 1);
		g.restore();
	}
}

//================================================================================
// Color
//================================================================================

type Byte = number;		// integer of [0, 255]
type Alpha = number;	// real of [0, 1]

function toFixed(n: number, fractionDigits: number): string {
	return n.toFixed(fractionDigits).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, "$1");
}

function rgb(r: Byte, g: Byte, b: Byte): CanvasStyleString {
	return `rgb(${r},${g},${b})`;
}

function rgba(r: Byte, g: Byte, b: Byte, a: Alpha): CanvasStyleString {
	return `rgba(${r},${g},${b},${toFixed(a, 6)})`;	// NOTE: Edge requires fixed format.
}

interface RGB {
	r: Byte;
	g: Byte;
	b: Byte;
}

function RGBtoString(color: RGB, a?: Alpha): CanvasStyleString {
	return a == null ? rgb(color.r, color.g, color.b) : rgba(color.r, color.g, color.b, a);
}

//================================================================================
// Drawables
//================================================================================

interface Drawable {
	draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void;
}

class Box implements Drawable {
	constructor(public rectStyle: ShapeStyle) {
	}

	draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
		drawRect(g, rect, this.rectStyle);
	}
}

class Label implements Drawable {
	constructor(
		public value: any,
		public textStyle?: TextStyle,
		public rectStyle?: ShapeStyle
	) {
		if (!textStyle || !textStyle.fillStyle || !textStyle.textAlign || !textStyle.textBaseline) {
			let defaults = Object.create(textStyle || null) as TextStyle;
			if (!textStyle || !textStyle.fillStyle) {
				defaults.fillStyle = "white";
			}
			if (!textStyle || !textStyle.textAlign) {
				defaults.textAlign = "center";
			}
			if (!textStyle || !textStyle.textBaseline) {
				defaults.textBaseline = "middle";
			}
			this.textStyle = defaults;
		}
	}

	draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
		let { x, y, w, h } = rect;
		if (this.rectStyle) {
			drawRect(g, x, y, w, h, this.rectStyle);
		}
		drawTextBox(g, this.text, x, y, w, h, this.textStyle);
	}

	get text(): string {
		let { value } = this;
		if (typeof value === "function") {
			value = value();
		}
		return str(value);
	}
}

type DrawableElement = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

class Picture implements Drawable, WH, Job {
	static DUMMY: HTMLImageElement | null = null;	// NOTE: dont use undefined

	// NOTE: undefined and null are used for different purpose here.
	// - undefined: unloaded.
	// - null: loading or not found.
	private _image: DrawableElement | null | undefined = undefined;

	constructor(public readonly src?: string) {
	}

	static from(elem: DrawableElement): Picture {
		let self = new Picture();
		self._image = elem;
		return self;
	}

	private sig: Signal;

	then(slot: Slot): this {
		let { _image } = this;
		if (_image) {
			committed.then(slot);
		} else {
			this.sig = connect(this.sig, slot);
			this.preload();	// kick to load
		}
		return this;
	}

	preload(): void {
		if (this._image !== undefined) { return; }

		let assign = (image: HTMLImageElement | null) => {
			this._image = image;
			commit(this.sig);
			this.sig = undefined;
		};

		this._image = null;	// now loading
		let image = new Image();
		image.addEventListener("load", () => assign(image));
		image.addEventListener("error", () => assign(Picture.DUMMY));
		if (this.src) {
			image.src = this.src;
		}
	}

	get image() {
		if (this._image === undefined) { this.preload(); }
		return this._image;
	}

	get w(): number {
		let { image } = this;
		return image ? image.width : 1;
	}

	get h(): number {
		let { image } = this;
		return image ? image.height : 1;
	}

	draw(
		g: CanvasRenderingContext2D,
		when: Optional<Timestamp>,
		rect: XYWH,
		overlayStyle?: CanvasStyle,
		overlayAlpha?: Alpha
	): void {
		let { image } = this;
		let { x, y, w, h } = rect;
		if (image && w > 0 && h > 0) {
			if (!overlayStyle || overlayAlpha <= 0) {
				g.drawImage(image, x, y, w, h);
			} else {
				g.save();
				g.globalCompositeOperation = "destination-out";
				g.drawImage(image, x, y, w, h);
				g.globalCompositeOperation = "destination-over";
				g.fillStyle = overlayStyle;
				g.fillRect(x, y, w, h);
				if (overlayAlpha < 1) {
					g.globalCompositeOperation = "source-over";
					g.globalAlpha = (1 - overlayAlpha);
					g.drawImage(image, x, y, w, h);
				}
				g.restore();
			}
		}
	}
}
