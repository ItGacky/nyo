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
		return { w, h };
	} else {
		return wh;
	}
}

//================================================================================
// CanvasRenderingContext2D
//================================================================================

type CanvasStyleString = string;	// "#...", "rgb(...)", "rgba(...)", "white", etc.
type CanvasStyle = CanvasStyleString | CanvasGradient | CanvasPattern;
type TextAlign = "left" | "right" | "center";		// FIXME: support "start" | "end"
type TextBaseline = "top" | "middle" | "bottom";	// FIXME: support "hanging" | "alphabetic" | "ideographic"

interface RectStyle {
	fillStyle?: CanvasStyle;
	strokeStyle?: CanvasStyle;
	globalAlpha?: Alpha,
	lineWidth?: Pixel;
}

interface TextStyle {
	fontSize?: Pixel;
	fontFamily?: string;
	fillStyle?: CanvasStyle;
	strokeStyle?: CanvasStyle;
	globalAlpha?: Alpha,
	lineWidth?: Pixel;
	textAlign?: TextAlign;
	textBaseline?: TextBaseline;
}

function setupStyle(g: CanvasRenderingContext2D, style: any) {
	if (!style) { return; }
	for (let key in style) {
		switch (key) {
			case "fontSize":
				g.font = `${style.fontSize}px ${style.fontFamily || DEFAULT_FONT_FAMILY}`;
				break;
			case "fontFamily":
				if (style.fontSize == null) {
					g.font = `${DEFAULT_FONT_SIZE}px ${style.fontFamily}`;
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

function drawRect(g: CanvasRenderingContext2D, rect: XYWH, style?: RectStyle): void;
function drawRect(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, w: Pixel, h: Pixel, style?: RectStyle): void;
function drawRect(
	g: CanvasRenderingContext2D,
	x_or_rect?: Pixel | XYWH,
	y_or_style?: Pixel | RectStyle,
	w?: Pixel,
	h?: Pixel,
	style?: RectStyle
): void {
	let x: Pixel;
	let y: Pixel;
	if (w == null) {
		({ x, y, w, h } = x_or_rect as XYWH);
		style = y_or_style as RectStyle;
	} else {
		x = x_or_rect as number;
		y = y_or_style as number;
	}
	if (w > 0 && h > 0) {
		g.save();
		setupStyle(g, style);
		if (!style || style.fillStyle) { g.fillRect(x, y, w, h); }
		if (!style || style.strokeStyle) { g.strokeRect(x, y, w, h); }
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

	function draw(g: CanvasRenderingContext2D, text: string, x: Pixel, y: Pixel, style: TextStyle) {
		if (!style || style.strokeStyle) { g.strokeText(text, x, y); }
		if (!style || style.fillStyle) { g.fillText(text, x, y); }
	}

	if (text.indexOf("\n") < 0) {
		draw(g, text, x, y, style);
	} else {
		let lines = text.split("\n");
		let fontSize = (style && style.fontSize || DEFAULT_FONT_SIZE);
		switch (g.textBaseline) {
			case "top":
				for (let line of lines) {
					draw(g, line, x, y, style);
					y += fontSize;
				}
				break;
			case "middle":
				y -= (fontSize * (lines.length - 1)) / 2;
				for (let line of lines) {
					draw(g, line, x, y, style);
					y += fontSize;
				}
				break;
			case "bottom":
				for (let line of lines.reverse()) {
					draw(g, line, x, y, style);
					y -= fontSize;
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

	function draw(g: CanvasRenderingContext2D, text: string, x: Pixel, y: Pixel, width: Pixel, style: TextStyle) {
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
			case "top":
			default:
				ty = y;
				break;
		}
		draw(g, text, tx, ty, w, style);
	} else {
		let lines = text.split("\n");
		let fontSize = (style && style.fontSize || DEFAULT_FONT_SIZE);
		switch (g.textBaseline) {
			case "middle":
				ty = y + (h - fontSize * (lines.length - 1)) / 2;
				break;
			case "bottom":
				ty = y + h - fontSize * (lines.length - 1);
				break;
			case "top":
			default:
				ty = y;
				break;
		}
		for (let line of lines) {
			draw(g, line, tx, ty, w, style);
			ty += fontSize;
		}
	}
	g.restore();
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
		let gradient = g.createLinearGradient(x, y, x, y + h);
		gradient.addColorStop(0, topStyle);
		gradient.addColorStop(1, bottomStyle);
		g.fillStyle = gradient;
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
	inner: Pixel = 0
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
	return n.toFixed(fractionDigits).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1');
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

//================================================================================
// Drawables
//================================================================================

interface Drawable {
	draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void;
}

class Box implements Drawable {
	constructor(public rectStyle: RectStyle) {
	}

	draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
		drawRect(g, rect, this.rectStyle);
	}
}

class Label implements Drawable {
	constructor(
		public value: any,
		public textStyle?: TextStyle,
		public rectStyle?: RectStyle
	) {
		if (this.textStyle == null) { this.textStyle = {}; }
		// TODO: textStyle を所有しておらず、参照しているだけのため、直接変更すべきではない。
		if (!this.textStyle.fillStyle) {
			this.textStyle.fillStyle = "white";
		}
		if (!this.textStyle.textAlign) {
			this.textStyle.textAlign = "center";
		}
		if (!this.textStyle.textBaseline) {
			this.textStyle.textBaseline = "middle";
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

class Picture implements Drawable, WH {
	static DUMMY: HTMLImageElement = null;
	private _image: HTMLImageElement = undefined;

	constructor(public src: string) {
	}

	get image(): HTMLImageElement {
		if (this._image === undefined) {
			this._image = null;	// now loading
			let image = new Image();
			image.addEventListener("load", () => { this._image = image; });
			image.addEventListener("error", () => { this._image = Picture.DUMMY; })
			image.src = this.src;
		}
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
		when: Timestamp,
		rect: XYWH,
		overlayStyle?: CanvasStyle,
		overlayAlpha?: Alpha
	): void {
		let { image } = this;
		let { x, y, w, h } = rect;
		if (image && w > 0 && h > 0) {
			g.save();
			if (!overlayStyle || overlayAlpha <= 0) {
				g.drawImage(image, x, y, w, h);
			} else {
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
			}
			g.restore();
		}
	}

	createPattern(g: CanvasRenderingContext2D, repetition: string): CanvasStyle {
		let { image } = this;
		if (image) {
			return g.createPattern(image, repetition);
		} else {
			return rgba(0, 0, 0, 0);
		}
	}
}
