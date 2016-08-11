namespace Combat {
	// Model
	const LEVEL_PER_DEPTH = 0.1;
	const BASE_FOR_LEVEL = pow(2, 0.1);	// twice power per 10 differece of levels.
	const UNIT_RECUPERATE_RATIO = 0.1;	// regenerated HP ratio on dead.
	const UNIT_REVIVE_RATIO = 0.5;		// threshold to revive.

	//interface Coord extends Number { Coord; };
	type Coord = number;

	// Number of cells in field
	const MAP_W: Coord = 20;
	const MAP_H: Coord = 3;

	// Cell
	const CELL_W: Pixel = 128;
	const CELL_H: Pixel = 80;
	const CELL_INFLATE_W = CELL_W / 4;
	const CELL_INFLATE_H = CELL_H / 4;

	// Panel: for unit panel
	const PANEL_H: Pixel = CELL_H * 2;
	const PANEL_Y: Pixel = SCREEN_H - PANEL_H;
	const PANEL_LX: Pixel = 0;
	const PANEL_LW: Pixel = SCREEN_W;
	const PANEL_RX: Pixel = SCREEN_W / 2;
	const PANEL_RW: Pixel = SCREEN_W / 2;
	const PANEL_BKGND_STYLE: ShapeStyle[] = [
		{
			lineWidth: 2,
			fillStyle: rgb(0, 0, 68),
			strokeStyle: rgb(204, 204, 255)
		},
		{
			lineWidth: 2,
			fillStyle: rgb(68, 0, 0),
			strokeStyle: rgb(255, 204, 204)
		}
	];
	const PANEL_TEXT_STYLE: TextStyle = {
		fillStyle: "white",
		textAlign: "left",
		textBaseline: "top"
	};

	// System Buttons
	const SYSTEM_BUTTON_W: Pixel = PANEL_H - 2 * MARGIN;
	const SYSTEM_BUTTON_H: Pixel = PANEL_H - 2 * MARGIN;

	// Ally Buttons
	const ALLY_BUTTON_X: Pixel = MARGIN;
	const ALLY_BUTTON_Y: Pixel = PANEL_Y + MARGIN;
	const ALLY_BUTTON_W: Pixel = 100;
	const ALLY_BUTTON_H: Pixel = PANEL_H - MARGIN * 2;
	const ALLY_BAR_W: Pixel = ALLY_BUTTON_W - MARGIN * 2;
	const ALLY_BAR_H: Pixel = 6;
	const ALLY_BAR_X: Pixel = (ALLY_BUTTON_W - ALLY_BAR_W) / 2;
	const ALLY_BAR_Y: Pixel = ALLY_BUTTON_H - ALLY_BAR_H * 2;

	// Field: Sky + Cells + Fades
	const SKY_H: Pixel = SCREEN_H - CELL_H * MAP_H * 2 - PANEL_H;
	const FIELD_W: Pixel = MAP_W * CELL_W / 2;
	const FIELD_H: Pixel = SKY_H + MAP_H * CELL_H * 2;
	const FIELD_X: Pixel = (SCREEN_W - FIELD_W) / 2;
	const FIELD_Y: Pixel = 0;
	const FADE_W: Pixel = CELL_W;
	const FADE_NEAR: CanvasStyleString = rgba(0, 0, 0, 0);
	const FADE_FAR: CanvasStyleString = rgba(0, 0, 0, 0.75);
	const FIELD_SCROLL_DURATION: Duration = 400;	// duration for scroll per cell; usually takes x2 of the value.

	// Caret
	interface CaretStyle {
		inner: CanvasStyle;
		outer: CanvasStyle;
	}
	const CARET_LINE_OUTER: Pixel = 7;
	const CARET_LINE_INNER: Pixel = 3;

	const CARET_SELECT: CaretStyle = {
		inner: rgb(230, 255, 180),
		outer: rgb(51, 230, 51)
	};
	const CARET_WALK: CaretStyle = {
		inner: rgb(230, 180, 255),
		outer: rgb(51, 51, 230)
	};
	const CARET_HOSTILE: CaretStyle = {
		inner: rgb(255, 180, 230),
		outer: rgb(230, 51, 51)
	};
	const CARET_FRIENDLY: CaretStyle = {
		inner: rgb(230, 180, 255),
		outer: rgb(51, 51, 230)
	};

	// Marker
	const MARKER_DURATION: Duration = 300;		// duration for marker's fade-in.

	interface MarkerStyle {
		inner: CanvasStyle;
		outer: CanvasStyle;
		bkgnd: CanvasStyle;
	}

	interface MarkerTargetStyle {
		DASH_OR_RANGE: MarkerStyle;
		RANGE: MarkerStyle;
		TARGET: MarkerStyle;
	}

	const MARKER_WALK: MarkerStyle = {
		outer: rgb(64, 192, 255),
		inner: rgb(180, 232, 255),
		bkgnd: rgba(64, 192, 255, 0.3)
	};

	const MARKER_DASH: MarkerStyle = {
		outer: rgb(255, 192, 64),
		inner: rgb(255, 232, 192),
		bkgnd: rgba(255, 192, 64, 0.3)
	};

	const MARKER_HOSTILE: MarkerTargetStyle = {
		DASH_OR_RANGE: {
			outer: rgb(255, 64, 64),
			inner: rgb(255, 180, 180),
			bkgnd: rgba(255, 192, 64, 0.3)
		},
		RANGE: {
			outer: rgb(255, 64, 64),
			inner: rgb(255, 180, 180),
			bkgnd: rgba(255, 128, 64, 0.3)
		},
		TARGET: {
			outer: rgb(255, 24, 24),
			inner: rgb(255, 64, 64),
			bkgnd: rgba(255, 24, 24, 0.3)
		}
	};

	const MARKER_FRIENDLY: MarkerTargetStyle = {
		DASH_OR_RANGE: {
			outer: rgb(24, 24, 255),
			inner: rgb(180, 180, 255),
			bkgnd: rgba(255, 192, 64, 0.3)
		},
		RANGE: {
			outer: rgb(64, 64, 255),
			inner: rgb(180, 180, 255),
			bkgnd: rgba(24, 128, 255, 0.3)
		},
		TARGET: {
			outer: rgb(24, 24, 255),
			inner: rgb(64, 64, 255),
			bkgnd: rgba(24, 24, 255, 0.3)
		}
	};

	// Unit
	const UNIT_MAX_W: Pixel = CELL_W;		// max width of unit image
	const UNIT_MAX_H: Pixel = CELL_W;		// max height of unit image
	const UNIT_IDLE_CYCLE: Duration = 200;	// cycle of unit idle animation per DEX.
	const UNIT_IDLE_LO: Pixel = 10;
	const UNIT_IDLE_UI: Pixel = 16;
	const UNIT_STEP_DURATION: Duration = 100;		// duration per step.
	const UNIT_STEP_POW = 0.75;			// duration will be reduced for many steps.
	const UNIT_OVERLAY_DYING: CanvasStyle = "red";
	const UNIT_OVERLAY_FOCUS: CanvasStyle = "yellow";
	const UNIT_OVERLAY_HOSTILE: CanvasStyle = "red";
	const UNIT_OVERLAY_FRIENDLY: CanvasStyle = "blue";
	const UNIT_OVERLAY_CYCLE: Duration = 1000;
	const UNIT_OVERLAY_ALPHA: Alpha = 0.5;
	const UNIT_SHADOW_INNER: CanvasStyleString = rgba(0, 0, 0, 0.65);
	const UNIT_SHADOW_OUTER: CanvasStyleString = rgba(0, 0, 0, 0);
	const UNIT_SHADOW_INNER_R = 0.75;
	const UNIT_SHADOW_SCALE_Y = 0.2;
	const UNIT_DAMAGED_DURATION: Duration = 500;	// duration of stagger for damaged unit
	const UNIT_DAMAGED_CYCLE: Duration = 250;		// cycle of stagger for damaged unit
	const UNIT_DAMAGED_RADIUS: Pixel = CELL_H / 4;	// radius of stagger for damaged unit
	const UNIT_DONE_STYLE: TextStyle = {	// cannot move nor shoot because SP lacks.
		textAlign: "center",
		textBaseline: "bottom",
		fontSize: 32,
		fillStyle: "yellow",
		strokeStyle: "black",
		lineWidth: 2
	};
	const UNIT_BOUND_STYLE: TextStyle = {	// cannot move nor shoot because bound by ZoC.
		textAlign: "center",
		textBaseline: "bottom",
		fontSize: 32,
		fillStyle: "red",
		strokeStyle: "black",
		lineWidth: 2
	};

	// Path
	const PATH_RADIUS: Pixel = 20;
	const PATH_WIDTH: Pixel = 12;
	const PATH_STYLE: CanvasStyle = rgba(255, 0, 0, 0.8);

	// Unit.HP/SP
	const UNIT_BAR_W: Pixel = CELL_W * 3 / 4;
	const UNIT_BAR_H: Pixel = 6;
	const UNIT_BAR_X: Pixel = CELL_W / 2 - UNIT_BAR_W / 2;
	const UNIT_BAR_Y: Pixel = CELL_H * 3 / 4;
	const UNIT_BAR_BORDER: Pixel = 1;

	// Popup
	const POPUP_DURATION: Duration = 600;	// duration for generic popup
	const POPUP_DY: Pixel = CELL_H / 2;		// Y-length of popup's run
	const POPUP_FONT_SIZE: Pixel = 48;
	const POPUP_COLOR_DAMAGE: CanvasStyle = rgb(255, 180, 180);
	const POPUP_COLOR_HEAL: CanvasStyle = rgb(180, 255, 180);

	// Switch
	const COMBAT_SWITCH_DURATION: Duration = 800;	// turn switch animation
	interface CombatSwitchStyle {
		messageID: string;
		innerStyle: CanvasStyleString;
		outerStyle: CanvasStyleString;
		textStyle: TextStyle;
	}
	const COMBAT_SWITCH: CombatSwitchStyle[] = [
		{
			messageID: "PartyTurn",
			innerStyle: rgb(0, 0, 128),
			outerStyle: rgba(0, 0, 128, 0),
			textStyle: {
				fontSize: 64,
				fillStyle: "white",
				textAlign: "center",
				textBaseline: "middle"
			}
		},
		{
			messageID: "EnemyTurn",
			innerStyle: rgb(128, 0, 0),
			outerStyle: rgba(128, 0, 0, 0),
			textStyle: {
				fontSize: 64,
				fillStyle: "white",
				textAlign: "center",
				textBaseline: "middle"
			}
		}
	];

	// Skills
	const SKILL_ROWS = 2;
	const SKILL_X = PANEL_LX + 400;
	const SKILL_Y = PANEL_Y + MARGIN;
	const SKILL_W = 160;
	const SKILL_H = (PANEL_H - MARGIN * (1 + SKILL_ROWS)) / SKILL_ROWS;

	const enum DIR {
		BEGIN,
		NE = BEGIN,
		E,
		SE,
		SW,
		W,
		NW,
		END
	}

	const enum TEAM {
		ALLY,
		ENEMY
	}

	function enemyOf(team: TEAM): TEAM {
		return team === TEAM.ALLY ? TEAM.ENEMY : TEAM.ALLY;
	}

	interface SkillEffect {
		target: Unit;
		deltaHP?: number;	// change of target's HP.
		deltaSP?: number;	// change of target's SP.
		duration?: number;	// number of turns for effect over time.
		deltaHPoT?: number;	// change of target's HP over time.
	}

	type Effect = (scene: Scene, unit: Unit, target: Unit, skill: Skill) => SkillEffect;
	type Action = (scene: Scene, unit: Unit, target: Unit, skill: Skill) => Job;

	//================================================================================
	// Hex
	//================================================================================

	// Dense hex-coordinate
	interface Hex {
		xH: Coord;
		yH: Coord;
	}

	function shift({ xH, yH }: Hex, dir: DIR): Hex {
		let even = (xH % 2 === 0);	// avoid minus for nagative xH.
		const shiftX = (even ? [1, 2, 1, -1, -2, -1] : [1, 2, 1, -1, -2, -1]);
		const shiftY = (even ? [-1, 0, 0, 0, 0, -1] : [0, 0, 1, 1, 0, 0]);
		return {
			xH: xH + shiftX[dir],
			yH: yH + shiftY[dir]
		};
	}

	function distance(lhs: Hex, rhs: Hex): number {
		let xL = lhs.xH;
		let xR = rhs.xH;
		// dense to sparse coordinates
		let x = xR - xL;
		let y = (rhs.yH * 2 + xR % 2) - (lhs.yH * 2 + xL % 2);
		if (y < 0) {
			if (y > x) {
				return (-x - y) / 2;	// NW
			} else if (y > -x) {
				return (x - y) / 2;		// NE
			} else {
				return -y;				// N
			}
		} else {
			if (y < x) {
				return (x + y) / 2;		// SE
			} else if (y < -x) {
				return (-x + y) / 2;	// SW
			} else {
				return y;				// S
			}
		}
	}

	function same(lhs: Optional<Hex>, rhs: Optional<Hex>): boolean {
		return (lhs === rhs) || (!!lhs && !!rhs && lhs.xH === rhs.xH && lhs.yH === rhs.yH);
	}

	class HexMap<T> {
		private readonly cells: { [xH: number/*Coord*/]: T[] };
		public depth: Coord;

		constructor(
			depth: Coord,
			public readonly dummy: T
		) {
			this.cells = {};
			this.depth = floor(depth);
		}

		// valid min/max xH
		get minXH(): Coord { return 1 + ceil(this.depth); }
		get maxXH(): Coord { return MAP_W + floor(this.depth); }

		// visible min/max xH
		get minVisibleXH(): Coord { return floor(this.depth); }
		get maxVisibleXH(): Coord { return 1 + MAP_W + ceil(this.depth); }

		// true if hex is valid.
		contains(xH: Coord, yH: Coord): boolean;
		contains(hex: Hex): boolean;
		contains(xH_or_hex: Coord | Hex, yH?: Coord): boolean {
			if (xH_or_hex == null) { return false; }
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			return 0 <= yH && yH < MAP_H && this.minXH <= xH && xH < this.maxXH;
		}

		getLine(xH: Coord): T[] {
			return this.cells[xH];
		}

		setLine(xH: Coord, line: T[]): void {
			this.cells[xH] = line;
		}

		deleteLine(xH: Coord): void {
			delete this.cells[xH];
		}

		rawget(xH: Coord, yH: Coord): Optional<T>;
		rawget(hex: Hex): Optional<T>;
		rawget(xH_or_hex: Coord | Hex, yH?: Coord): Optional<T> {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			if (0 <= yH && yH < MAP_H && this.minVisibleXH <= xH && xH < this.maxVisibleXH) {
				let line = this.cells[xH];
				if (line) {
					return line[yH];
				}
			}
			return undefined;
		}

		get(xH: Coord, yH: Coord): T;
		get(hex: Hex): T;
		get(xH_or_hex: Coord | Hex, yH?: Coord): T {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			let raw = this.rawget(xH, yH);
			return (raw === undefined ? this.dummy : raw);
		}

		set(value: T, xH: Coord, yH: Coord): void;
		set(value: T, hex: Hex): void;
		set(value: T, xH_or_hex: Coord | Hex, yH?: Coord): void {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			let line = this.cells[xH];
			if (!line) {
				line = this.cells[xH] = [];
			}
			line[yH] = value;
		}

		// visit each valid cell
		each(callback: (cell: T, xH: Coord, yH: Coord) => void): void {
			let { minXH, maxXH } = this;
			for (let xH = minXH; xH < maxXH; ++xH) {
				for (let yH = 0; yH < MAP_H; ++yH) {
					callback(this.get(xH, yH), xH, yH);
				}
			}
		}

		// visit each visible cell
		eachVisible(callback: (cell: T, xH: Coord, yH: Coord) => void): void {
			let { minVisibleXH, maxVisibleXH } = this;
			for (let xH = minVisibleXH; xH < maxVisibleXH; ++xH) {
				for (let yH = 0; yH < MAP_H; ++yH) {
					callback(this.get(xH, yH), xH, yH);
				}
			}
		}

		// visit cells int the straight line up to range, excluding the starting hex.
		straight(from: Hex, to: Hex, range: number, callback: (hex: Hex, steps: number) => void): void {
			if (same(from, to)) { return; }

			let xFrom = from.xH;
			let yFrom = 1 + 2 * (from.yH * 2 + from.xH % 2);
			let xTo = to.xH;
			let yTo = 1 + 2 * (to.yH * 2 + to.xH % 2);
			let steps = distance(from, to);
			let xStep = (xTo - xFrom) / steps;
			let yStep = (yTo - yFrom) / steps;

			for (let i = 1; i <= range; ++i) {
				let dx = xFrom + i * xStep;
				let dy = yFrom + i * yStep;
				let yH2 = floor(dy / 2);
				let xH: Coord;
				if (yH2 % 2 === 0) {
					xH = 2 * floor((dx + 1) / 2);
				} else {
					xH = 2 * floor(dx / 2) + 1;
				}
				let yH = floor(yH2 / 2);
				if (this.contains(xH, yH)) {
					callback({ xH, yH }, i);
				}
			}
		}

		// visit cells surround up to range, excluding the center hex.
		surround(center: Hex, range: number, callback: (hex: Hex, steps: number) => void): void {
			if (range === 1) {
				// fast path for near
				for (let dir = DIR.BEGIN; dir < DIR.END; ++dir) {
					let hex = shift(center, dir);
					if (this.contains(hex)) {
						callback(hex, 1);
					}
				}
			} else if (range > 1) {
				let NE = shift(center, DIR.NE);
				for (let i = 1; i <= range; ++i) {
					let hex = NE;
					for (let dir of [DIR.SE, DIR.SW, DIR.W, DIR.NW, DIR.NE, DIR.E]) {
						for (let step = 0; step < i; ++step, hex = shift(hex, dir)) {
							if (this.contains(hex)) {
								callback(hex, i);
							}
						}
					}
					NE = shift(NE, DIR.NE);
				}
			}
		}
	}

	//================================================================================
	// Unit
	//================================================================================

	abstract class UnitState implements Job {
		public start?: Timestamp;
		public duration?: Duration;

		constructor(duration: Duration) {
			this.duration = duration;
		}

		private sig: Signal;

		then(slot: Slot): this {
			if (!this.duration) {
				committed.then(slot);
			} else {
				this.sig = connect(this.sig, slot);
			}
			return this;
		}

		commit(): void {
			commit(this.sig);
			this.sig = undefined;
			this.duration = undefined;
		}

		getXY(unit: Unit, scene: Scene, when: Timestamp): Optional<XY> {
			if (!this.duration) {
				return undefined;
			}
			let progress = Animation.clamp(when, this.start, this.duration);
			if (progress >= 1) {
				this.commit();
				return undefined;
			}
			return this.onGetXY(unit, scene, progress);
		}

		protected abstract onGetXY(unit: Unit, scene: Scene, progress: number): XY;

		drawCharacter(unit: Unit, g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: Optional<CanvasStyle>, overlayAlpha: Alpha): void {
			unit.drawCharacter(g, when, x, y, overlayStyle, overlayAlpha);
		}
	}

	class UnitEnter extends UnitState {
		constructor(DEX: number) {
			super(SCENE_TRANSIT * (13 - DEX) / 4);
		}

		onGetXY(unit: Unit, scene: Scene, progress: number): XY {
			let hex = unit.hex;
			let x = scene.toX(hex);
			return {
				x: x - (1.0 - progress) * CELL_W + CELL_W / 2,
				y: scene.toY(hex) + CELL_H
			};
		}
	}

	class UnitWalk extends UnitState {
		constructor(private path: Hex[]) {
			super(pow(path.length - 1, UNIT_STEP_POW) * UNIT_STEP_DURATION);
		}

		onGetXY(_unit: Unit, scene: Scene, progress: number): XY {
			let steps = this.path.length - 1;
			let i = floor(steps * progress);
			let hexFrom = this.path[i];
			let hexTo = this.path[i + 1];
			let xFrom = scene.toX(hexFrom);
			let yFrom = scene.toY(hexFrom);
			let xTo = scene.toX(hexTo);
			let yTo = scene.toY(hexTo);
			let d = steps * progress - i;
			return {
				x: xFrom * (1.0 - d) + xTo * d + CELL_W / 2,
				y: yFrom * (1.0 - d) + yTo * d + CELL_H
			};
		}
	}

	class UnitCharge extends UnitState {
		private hexFrom: Hex;
		private hexTo: Hex;
		constructor(scene: Scene, hexFrom: Hex, hexTo: Hex) {
			super(duration(scene, hexFrom, hexTo));
			this.hexFrom = hexFrom;
			this.hexTo = hexTo;

			function duration(scene: Scene, hexFrom: Hex, hexTo: Hex): number {
				let dx = scene.toX(hexFrom) - scene.toX(hexTo);
				let dy = scene.toY(hexFrom) - scene.toY(hexTo);
				return 200 + pow(dx * dx + dy * dy, 0.3) / SCREEN_W * 1000;
			}
		}

		private hitsig: Signal;

		hit(slot: Slot): void {
			if (!this.duration) {
				committed.then(slot);
			} else {
				this.hitsig = connect(this.hitsig, slot);
			}
		}

		commit(): void {
			commit(this.hitsig);
			this.hitsig = undefined;
			super.commit();
		}

		onGetXY(_unit: Unit, scene: Scene, progress: number): XY {
			let { hexFrom, hexTo } = this;
			let xFrom = scene.toX(hexFrom);
			let yFrom = scene.toY(hexFrom);
			let xTo = scene.toX(hexTo);
			let yTo = scene.toY(hexTo);
			if (progress < 0.5) {
				progress = progress * 2;
			} else {
				progress = 2 - progress * 2;
				commit(this.hitsig);
				this.hitsig = undefined;
			}
			return {
				x: xFrom * (1.0 - progress) + xTo * progress + CELL_W / 2,
				y: yFrom * (1.0 - progress) + yTo * progress + CELL_H
			};
		}
	}

	class UnitStagger extends UnitState {
		radius: number;
		dying?: Hex;

		constructor(unit: Unit, damage: number) {
			super(UNIT_DAMAGED_DURATION);
			assert(damage > 0);
			let { HP } = unit;
			this.dying = (damage >= HP ? unit.hex : undefined);
			if (damage >= HP / 2) {
				this.radius = 1;
			} else {
				this.radius = 0.5 + damage / HP;
			}
		}

		onGetXY(unit: Unit, scene: Scene, progress: number): XY {
			let radius = (1.0 - progress) * UNIT_DAMAGED_RADIUS * this.radius;
			let theta = progress * PI * this.duration / UNIT_DAMAGED_CYCLE * this.radius;
			let hex = this.dying || unit.hex;
			return {
				x: radius * sin(theta * 4) + scene.toX(hex) + CELL_W / 2,
				y: radius * sin(theta * 3) + scene.toY(hex) + CELL_H
			};
		}

		drawCharacter(unit: Unit, g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: CanvasStyle, overlayAlpha: Alpha): void {
			if (this.dying) {
				let progress = Animation.clamp(when, this.start, this.duration);
				g.save();
				g.globalAlpha = (1 - progress);
				super.drawCharacter(unit, g, when, x, y, UNIT_OVERLAY_DYING, progress);
				g.restore();
			} else {
				super.drawCharacter(unit, g, when, x, y, overlayStyle, overlayAlpha);
			}
		}
	}

	interface EffectOverTime {
		spec: string;
		duration: number;
		deltaHPoT?: number;
	}

	class Unit {
		public HP: number;
		public SP: number;
		public skill: Skill;	// selected active skill
		public readonly minCost: number;	// min cost in active skills
		public readonly effectsOverTime: EffectOverTime[];
		private readonly idleOffset: number;	// 0..1

		public _hex?: Hex;		// NOTICE: Do not set directly; Use Scene.setUnit instead.
		public get hex(): Hex { return assume(this._hex); }
		public get alive(): boolean { return !!this._hex; }

		constructor(
			public readonly ch: Character,
			public readonly team: TEAM,
			hex: Hex
		) {
			this._hex = hex;
			this.idleOffset = random();
			this.skill = (ch.skills.find(skill => ch.rangeOf(skill) > 0) || Skill.DUMMY);
			this.HP = this.maxHP;
			this.minCost = this.SP = this.availSP;
			for (let skill of ch.skills) {
				if (skill.isActive) {
					let cost = this.costOf(skill);
					if (cost && cost < this.minCost) {
						this.minCost = cost;
					}
				}
			}
			this.effectsOverTime = [];
		}

		get name(): string { return this.ch.name; }
		get level(): number { return this.ch.level; }
		get INT(): number { return this.ch.INT; }
		get DEX(): number { return this.ch.DEX; }
		get STR(): number { return this.ch.STR; }
		get maxHP(): number { return this.ch.HP; }
		get maxSP(): number { return this.ch.SP; }
		get availSP(): number { return max(0, this.ch.SP - this.ch.reservedSP); }

		get step(): number { return this.ch.step; }
		get ZoC(): number { return this.ch.ZoC; }
		get DEF(): number { return this.ch.DEF; }

		// TODO: ch.skills と対応したキャッシュ構造を持たせる。スキルに最適な武器や攻撃力をキャッシュしておく。
		get skills(): Skill[] { return this.ch.skills; }

		costOf(skill: Skill) { return this.ch.costOf(skill); }
		rangeOf(skill: Skill) { return this.ch.rangeOf(skill); }
		powerOf(skill: Skill) { return this.ch.powerOf(skill); }

		getPassive(tagbits: number, action: string): number {
			let total = 0;
			for (let skill of this.ch.skills) {
				if (skill.isPassive && skill.action === action && (tagbits & skill.tagbits) !== 0) {
					total += skill.rawPower;	// TODO: Should use rawPower?
				}
			}
			return total;
		}

		getOffenceLevel(tagbits: number): number { return this.getPassive(tagbits, "Offence"); }
		getDefenceLevel(tagbits: number): number { return this.getPassive(tagbits, "Defence"); }

		isEnemy(other?: Unit): boolean {
			return !!other && this.team !== other.team;
		}

		// Check: team
		isTarget(target: Optional<Unit>, skill: Skill): boolean {
			if (!target) {
				return false;
			} else if (skill.usage === USAGE.DOSE) {
				return this === target;
			} else if (skill.hostile) {
				return this.isEnemy(target);
			} else {
				return this !== target && !this.isEnemy(target);
			}
		}

		//
		getTarget(field: Field, hex: Hex): Optional<Unit> {
			let { unit } = field.get(hex);
			if (this.isTarget(unit, this.skill)) {
				return unit;
			}
			return undefined;
		}

		done(scene: Scene): boolean {
			let { _hex } = this;
			return scene.enabled && !!_hex && this.SP < this.minCost && this.SP < this.step + scene.zoc[this.team].get(_hex);
		}

		// Estimate effect of the current skill.
		estimate(scene: Scene, target: Unit, skill: Skill): SkillEffect {
			assert(this.isTarget(target, skill));
			let effect = getEffect(skill.effect);
			return effect(scene, this, target, skill);
		}

		// Use the skill to the target.
		shoot(scene: Scene, target: Unit, skill: Skill): Job {
			assert(this.isTarget(target, skill));
			let cost = this.costOf(skill);
			assert(this.SP >= cost);
			let action = getAction(skill.action);
			let job = action(scene, this, target, skill);
			this.SP -= cost;
			return job;
		}

		// Regenerate HP on dead.
		recuperate(): void {
			assert(!this._hex);
			let deltaHP = floor(this.maxHP * UNIT_RECUPERATE_RATIO);	// TODO: based on character's status?
			this.HP = min(this.maxHP, this.HP + deltaHP);
		}

		// Can revive on dead?
		get canRevive(): boolean {
			return !this._hex && this.HP / this.maxHP >= UNIT_REVIVE_RATIO;		// TODO: based on character's status?
		}

		onTurnEnd(scene: Scene): void {
			if (this.team === scene.team) {
				this.SP = this.availSP;
			}
		}

		onTurnStart(scene: Scene): Optional<Job> {
			if (this.team === scene.team) {
				let deltaHP = 0;
				let { effectsOverTime } = this;
				for (let i = effectsOverTime.length - 1; i >= 0; --i) {
					let effect = effectsOverTime[i];
					if (effect.deltaHPoT != null) {
						deltaHP += effect.deltaHPoT;
					}
					if (--effect.duration <= 0) {
						effectsOverTime.splice(i, 1);
					}
				}
				if (deltaHP !== 0) {
					let popup = scene.promiseEffect({ target: this, deltaHP }, this.hex);
					popup.attach(scene);
					return popup;
				}
			}
			return undefined;
		}

		// screen position
		getXY(scene: Scene, when: Timestamp): Optional<XY> {
			let pt: Optional<XY>;
			if (this.state) {
				pt = this.state.getXY(this, scene, when);
				if (!pt) {
					this.state = undefined;
				}
			}
			if (!pt) {
				let { _hex } = this;
				if (_hex) {
					pt = {
						x: scene.toX(_hex) + CELL_W / 2,
						y: scene.toY(_hex) + CELL_H
					};
				}
			}
			return pt;
		}

		private _state?: UnitState;

		get state(): Optional<UnitState> {
			return this._state;
		}

		set state(value: Optional<UnitState>) {
			let state = this._state;
			this._state = value;
			if (value) { value.start = now(); }
			if (state) { state.commit(); }
		}

		drawCharacter(g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: Optional<CanvasStyle>, overlayAlpha: Alpha) {
			let { ch } = this;
			let rect = scaleProportionally(ch, UNIT_MAX_W, UNIT_MAX_H) as XYWH;

			let wShadow = rect.w;
			let hShadow = wShadow * UNIT_SHADOW_SCALE_Y;
			fillRadialGradient(
				g,
				x - wShadow / 2,
				y - UNIT_IDLE_LO - hShadow / 2,
				wShadow,
				hShadow,
				UNIT_SHADOW_INNER,
				UNIT_SHADOW_OUTER,
				UNIT_SHADOW_INNER_R
			);

			// idle animation
			if (when) {
				let cycle = UNIT_IDLE_CYCLE * (13 - ch.DEX);
				let theta = this.idleOffset + (when % cycle) / cycle;
				let progress = max(0, sin(2 * PI * theta));
				y -= (UNIT_IDLE_UI * progress + UNIT_IDLE_LO * (1 - progress));
			}
			rect.x = x - rect.w / 2;
			rect.y = y - rect.h;
			ch.draw(g, when, rect, overlayStyle, overlayAlpha);
		}

		draw(g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: Optional<CanvasStyle>, overlayAlpha: Alpha) {
			if (this.state) {
				this.state.drawCharacter(this, g, when, x, y, overlayStyle, overlayAlpha);
			} else {
				this.drawCharacter(g, when, x, y, overlayStyle, overlayAlpha);
			}
		}

		drawBars(g: CanvasRenderingContext2D, _when: Timestamp, scene: Scene, deltaHP?: number, deltaSP?: number): void {
			let { hex } = this;
			let x = scene.toX(hex) + UNIT_BAR_X;
			let y = scene.toY(hex) + UNIT_BAR_Y;
			drawBar(g, x, y, UNIT_BAR_W, UNIT_BAR_H, this.HP, this.maxHP, deltaHP, BAR_STYLE_HP);
			drawBar(g, x, y + UNIT_BAR_H, UNIT_BAR_W, UNIT_BAR_H, this.SP, this.maxSP, deltaSP, BAR_STYLE_SP);
		}

		static compare(lhs: XY, rhs: XY): number {
			if (lhs.y < rhs.y) {
				return -1;
			} else if (lhs.y > rhs.y) {
				return +1;
			} else if (lhs.x < rhs.x) {
				return -1;
			} else if (lhs.x > rhs.x) {
				return +1;
			} else {
				return 0;
			}
		}
	}

	function drawBar(
		g: CanvasRenderingContext2D,
		x: Pixel,
		y: Pixel,
		w: Pixel,
		h: Pixel,
		value: number,
		limit: number,
		delta: Optional<number>,
		style: UnitBarStyle
	): void {
		let ratio = clamp(0, 1, value / limit);
		let after = (delta == null ? ratio : clamp(0, 1, (value + delta) / limit));

		g.save();
		g.fillStyle = style.bkgnd;
		g.fillRect(x, y, w, h);

		x += UNIT_BAR_BORDER;
		y += UNIT_BAR_BORDER;
		w -= UNIT_BAR_BORDER * 2;
		h -= UNIT_BAR_BORDER * 2;

		if (after > ratio) {
			g.fillStyle = (ratio >= 1 ? style.full : style.normal);
			g.fillRect(x, y, w * ratio - 1, h);
			g.fillStyle = style.full;
			g.fillRect(x + w * ratio, y, w * (after - ratio), h);
		} else if (after < ratio) {
			let remain = w * after;
			if (after > 0) {
				remain = max(remain, 2);	// at least 2px to draw remaining HP.
				g.fillStyle = (ratio >= 1 ? style.full : style.normal);
				g.fillRect(x, y, remain - 1, h);
			}
			g.fillStyle = style.delta;
			g.fillRect(x + remain, y, w * (ratio - after), h);
		} else {
			g.fillStyle = (ratio >= 1 ? style.full : style.normal);
			g.fillRect(x, y, w * ratio, h);
		}
		g.restore();
	}

	function drawHP(g: CanvasRenderingContext2D, _when: Timestamp, scene: Scene, unit: Unit, hex: Hex) {
		let x = scene.toX(hex) + UNIT_BAR_X;
		let y = scene.toY(hex) + UNIT_BAR_Y;
		drawBar(g, x, y, UNIT_BAR_W, UNIT_BAR_H, unit.HP, unit.maxHP, undefined, BAR_STYLE_HP);
	}

	function drawSP(g: CanvasRenderingContext2D, _when: Timestamp, scene: Scene, unit: Unit, hex: Hex, remainSP: number) {
		let x = scene.toX(hex) + UNIT_BAR_X;
		let y = scene.toY(hex) + UNIT_BAR_Y + UNIT_BAR_H;
		drawBar(g, x, y, UNIT_BAR_W, UNIT_BAR_H, unit.SP, unit.maxSP, remainSP - unit.SP, BAR_STYLE_SP);
	}

	//================================================================================
	// Cell and Field
	//================================================================================

	const enum CELL {
		NORMAL,
		HOLE
	}

	class Cell {
		constructor(
			public type: CELL = CELL.NORMAL,
			public unit?: Unit
		) {
		}

		get empty(): boolean {
			return this.unit == null && this.type === CELL.NORMAL;
		}

		static DUMMY: Cell = new Cell(CELL.HOLE);
	}

	type Field = HexMap<Cell>;

	//================================================================================
	// ZoC
	//================================================================================

	type ZoC = HexMap<number>;	// map of additional walk cost.

	//================================================================================
	// ActionMap
	//================================================================================

	interface ActionResult {
		SP: number;			// left SP on the hex, or -1
		comeFrom?: Hex;		// where come from (always exists if SP >= 0)
		shotFrom?: Hex;		// where shot from (always exists if effect != null)
		effect?: SkillEffect;
	}

	// HexMap of ActionResult
	class ActionMap extends HexMap<ActionResult> {
		static DUMMY: ActionResult = { SP: -1 };

		constructor(scene: Scene, unit: Unit, baseSP: number) {
			let { field } = scene;
			super(field.depth, ActionMap.DUMMY);
			let zoc = scene.zoc[unit.team];
			let hex = unit.hex;
			let { step, skill } = unit;
			const cost = unit.costOf(skill);
			const range = unit.rangeOf(skill) || 0;
			this.ensure(hex).SP = baseSP;
			// walk/dash
			if (baseSP >= step + zoc.get(hex)) {
				let deque: Hex[] = [];
				for (let from: Optional<Hex> = hex; from; from = deque.shift()) {
					let remain = this.get(from).SP - (step + zoc.get(from));
					if (remain >= 0) {
						for (let dir = DIR.BEGIN; dir < DIR.END; ++dir) {
							let near = shift(from, dir);
							let cell = field.rawget(near);
							if (cell && cell.type === CELL.NORMAL && !unit.isEnemy(cell.unit)) {
								let r = this.ensure(near);
								if (r.SP < remain || (r.SP === remain && field.get(from).empty && (!r.comeFrom || !field.get(r.comeFrom).empty))) {
									r.SP = remain;
									r.comeFrom = from;
									if (remain >= step + zoc.get(near)) {
										deque.push(near);
									}
								}
							}
						}
					}
				}
			}
			// skill
			if (baseSP >= cost && range >= 1) {
				expandRange.call(this, hex);
				this.each(({ SP }, xH, yH) => {
					if (SP >= cost && field.get(xH, yH).empty) {
						expandRange.call(this, { xH, yH });
					}
				});
			}

			function expandRange(this: ActionMap, from: Hex): void {
				assert(range >= 1);

				let hexUnit = unit.hex;
				let { field, numScrollsPerTurn } = scene;

				// XXX: This evaluation function can be moved to CPU class.
				let spL = this.get(from).SP;
				let zL = zoc.get(from);
				let yL = yScore(from);
				let edge = field.minXH + numScrollsPerTurn;
				let edgeL = (from.xH < edge);
				let better = (rhs: Hex): boolean => {
					let spR = this.get(rhs).SP;
					if (spL > spR) { return true; }
					if (spL < spR) { return false; }
					let edgeR = (rhs.xH < edge);
					if (!edgeL && edgeR) { return true; }
					if (edgeL && !edgeR) { return false; }
					let zR = zoc.get(rhs);
					if (zL < zR) { return true; }
					if (zL > zR) { return false; }
					if (from.xH < rhs.xH) { return true; }
					if (from.xH > rhs.xH) { return false; }
					return yL < yScore(rhs);
				};

				field.surround(from, range, hex => {
					if (!same(hex, hexUnit)) {
						let r = this.ensure(hex);
						if (!r.shotFrom) {
							r.shotFrom = from;
							let target = field.get(hex).unit;
							if (unit.isTarget(target, skill)) {
								r.effect = unit.estimate(scene, target!, skill);
							}
						} else if (better(r.shotFrom)) {
							r.shotFrom = from;
						}
					}
				});
			}

			function yScore(hex: Hex): number {
				return abs(hex.yH * 2 + hex.xH % 2 - MAP_H);
			}
		}

		ensure(hex: Hex): ActionResult {
			let value = this.rawget(hex);
			if (!value) {
				value = { SP: -1 };
				this.set(value, hex);
			}
			return value;
		}

		// returns path of walking to the hex or to the shootable hex for it.
		getPath(hex: Hex, field: Field): Optional<Hex[]> {
			let r = this.get(hex);
			if (!r) { return undefined; }
			let { effect, comeFrom, shotFrom } = r;
			let path: Hex[];
			if (effect && shotFrom) {
				if (!field.get(shotFrom).empty) { return undefined; }
				path = [shotFrom];
				({ comeFrom } = this.get(shotFrom));
			} else if (comeFrom) {
				if (!field.get(hex).empty) { return undefined; }
				path = [hex];
			} else {
				return undefined;
			}
			while (comeFrom) {
				path.unshift(comeFrom);
				({ comeFrom } = this.get(comeFrom));
			}
			return path;
		}
	}
	type ActionMaps = HexMap<ActionMap | undefined>;

	//================================================================================

	class SkillButton extends Button {
		constructor(
			private scene: Scene,
			private index: number,
			x: Pixel, y: Pixel, w: Pixel, h: Pixel
		) {
			super(x, y, w, h, new Label(label, {
				fontSize: 20
			}), equip, undefined, SkillButton.design);

			function label(): Optional<string> {
				let { focus } = scene;
				if (focus) {
					let skill = focus.skills[index];
					if (skill) {
						if (skill.isActive) {
							// Active Skills
							let selected = (focus.skill === skill);
							let cost = focus.costOf(skill);
							let range = focus.rangeOf(skill) || 0;
							let power = focus.powerOf(skill);
							return `${selected ? "E " : ""}${skill.name.localized}\n${cost} / ${range} / ${toFixed(power)}`;
						} else {
							// Passive Skills
							return `${skill.name.localized}\n${skill.action === "Offence" ? "ATK" : "DEF"}: ${tags2str(skill.tags)}`;
						}
					}
				}
				return undefined;

				function toFixed(n?: number): string {
					return n != null ? n.toFixed(1) : "-";
				}
			}

			function equip(this: SkillButton) {
				if (this.enabled) {
					let focus = assume(this.scene.focus);
					let skill = focus.skills[this.index];
					if (skill.usage === USAGE.DOSE) {
						scene.controller.dose(focus, skill);
					} else {
						focus.skill = skill;
						scene.onSkillChanged(focus);
					}
				}
			}
		}

		get visible(): boolean {
			let { focus } = this.scene;
			return !!focus && !!focus.skills[this.index];
		}

		get enabled(): boolean {
			let { focus } = this.scene;
			if (focus) {
				let skill = focus.skills[this.index];
				if (skill) {
					if (skill.usage === USAGE.DOSE) {
						return focus.SP >= focus.costOf(skill);
					} else {
						return focus.rangeOf(skill) > 0;
					}
				}
			}
			return false;
		}

		static design: ButtonDesign = {
			draw: function (g: CanvasRenderingContext2D, when: Timestamp, owner: SkillButton): void {
				if (owner.visible) {
					let focus = assume(owner.scene.focus);
					let skill = focus.skills[owner.index];
					if (focus.rangeOf(skill) > 0) {
						Button.defaultDesign.draw(g, when, owner);
					} else {
						drawRoundedRect(g, owner, Button.defaultDesign.getStyle(owner.state));
						if (owner.drawable) {
							owner.drawable.draw(g, when, owner);
						}
					}
				}
			}
		};
	}

	//================================================================================
	// Stage: field generator
	//================================================================================

	export interface Stage {
		level: number;
		numScrollsPerTurn: number;
		generate(scene: Scene, xH: Coord): Cell[];
		draw(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene): void;
	}

	const ENEMY_RATIO = 0.3;

	export class EndressStage implements Stage {
		private imgSky: Picture;
		private imgCells: Picture[];

		constructor(
			skin: string,
			public level: number,
			public numScrollsPerTurn: number = 2
		) {
			let URL_TILESET = URL_ASSETS + `level/${skin}/`;
			this.imgSky = new Picture(URL_TILESET + "sky.png");
			this.imgCells = [
				new Picture(URL_TILESET + "tile.png"),
				new Picture(URL_TILESET + "hole.png")
			];
		}

		generate(scene: Scene, xH: Coord): Cell[] {
			const XH_ENEMY = MAP_W - 8;
			const XH_HOLE = 6;

			let numAllies = 0;
			let numEnemies = 0;
			scene.eachUnit(({ team }) => {
				if (team === TEAM.ALLY) {
					++numAllies;
				} else {
					++numEnemies;
				}
			});
			let enemyRatio = (numAllies === 0 ? ENEMY_RATIO : ENEMY_RATIO * pow(1.1, numAllies - numEnemies));
			let holeRatio = 0.1;

			let line: Cell[] = new Array(MAP_H);
			let monsters = keys(MONSTERS);
			for (let yH = 0; yH < MAP_H; ++yH) {
				let unit: Optional<Unit>;
				let type = CELL.NORMAL;
				if (xH > XH_ENEMY && random() < enemyRatio) {
					let name = monsters[rand(monsters.length)];
					let ch = Character.monster(name, scene.getLevel());
					unit = new Unit(ch, TEAM.ENEMY, { xH, yH });
				} else if (xH > XH_HOLE && random() < holeRatio) {
					type = CELL.HOLE;
				}
				line[yH] = new Cell(type, unit);
			}
			return line;
		}

		draw(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene): void {
			let { field } = scene;

			// Sky
			let { image } = this.imgSky;
			if (image) {
				g.save();
				let offsetX = field.depth * CELL_W / 2;
				g.fillStyle = g.createPattern(image, "repeat");
				g.translate(-offsetX, 0);
				g.fillRect(FIELD_X + offsetX, FIELD_Y, FIELD_W, SKY_H);
				g.restore();
			}

			// Field
			let rect = { x: 0, y: 0, w: CELL_W, h: CELL_H };
			field.eachVisible(({ type }, xH, yH) => {
				rect.x = scene.toX(xH, yH);
				rect.y = scene.toY(xH, yH);
				this.imgCells[type].draw(g, when, rect);
			});
		}
	}

	//================================================================================
	// Scene
	//================================================================================

	interface Snapshot {
		readonly unit: Unit;
		readonly hex: Hex;
		readonly SP: number;
		readonly maps: ActionMaps;
		readonly zoc: ZoC[];
	}

	interface Controller {
		visible: boolean;
		readonly caret?: Hex;
		dose(unit: Unit, skill: Skill): void;
	}

	export class Scene extends Composite {
		team: TEAM = TEAM.ALLY;
		enabled = false;
		readonly field: Field;
		readonly dying: Unit[];
		readonly deads: Unit[];
		readonly snapshots: Snapshot[];

		constructor(public data: Data, public stage: Stage) {
			super();
			let field = this.field = new HexMap<Cell>(0, Cell.DUMMY);
			this.dying = [];
			this.deads = [];
			this.snapshots = [];

			// Controllers must be the 1st and 2nd children.
			let human = new Human();
			human.attach(this);
			human.visible = false;
			let cpu = new CPU();
			cpu.attach(this);
			cpu.visible = false;

			// Field
			for (let xH = field.minVisibleXH, maxXH = field.maxVisibleXH; xH < maxXH; ++xH) {
				field.setLine(xH, this.stage.generate(this, xH));
			}
			let allyButtons: Button[] = [];
			const locations = [[2, 0], [2, 1], [2, 2], [1, MAP_H - 3], [1, MAP_H - 2], [1, MAP_H - 1]];
			let { party } = data;
			for (let i = 0; i < PARTY_MAX; ++i) {
				let ch = party[i];
				if (ch) {
					let [xH, yH] = locations[i];
					let hex = { xH, yH };
					let unit = new Unit(ch, TEAM.ALLY, hex);
					unit.state = new UnitEnter(ch.DEX);
					assume(field.rawget(hex)).unit = unit;

					allyButtons.push(createAllyButton(this, i, unit));
				}
			}

			function createAllyButton(scene: Scene, index: number, unit: Unit): Button {
				function draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
					let { ch } = unit;
					let chRect = scaleProportionally(ch, rect.w, rect.h, true) as XYWH;
					chRect.x = rect.x + (rect.w - chRect.w) / 2;
					chRect.y = rect.y + (rect.h - chRect.h) / 2;
					if (unit.alive || unit.canRevive) {
						ch.draw(g, when, chRect);
					} else {
						let { images } = ch;
						let image = (images[CharacterImage.DEAD] || images[CharacterImage.DEFAULT]);
						image.draw(g, when, chRect);
					}
					drawBar(g, rect.x + ALLY_BAR_X, rect.y + ALLY_BAR_Y, ALLY_BAR_W, ALLY_BAR_H, unit.HP, unit.maxHP, undefined, BAR_STYLE_HP);
				}
				function click() {
					if (unit.alive) {
						human.click(unit.hex);
					} else if (unit.canRevive) {
						let xH = field.minXH;
						let yH = index % 3;
						for (let i = 0; i < MAP_H; ++i) {
							if (field.get(xH, yH).empty) {
								scene.revive(unit, { xH, yH });
								return;
							}
							yH = (yH + 1) % MAP_H;
						}
						logger.error(_("Combat", "NoSpaceToRevive"));
					} else {
						logger.error(_("Combat", "CannotRevive"));
					}
				}
				return new Button(
					ALLY_BUTTON_X + index * (ALLY_BUTTON_W + MARGIN), ALLY_BUTTON_Y, ALLY_BUTTON_W, ALLY_BUTTON_H,
					{ draw },
					click,
					[KEY.$1 + index]
				);
			}

			//========= Human =========
			let componentsForHuman = new Composite(allyButtons);
			defineGetSet(componentsForHuman, "visible", () => human.visible && !this.focus);
			componentsForHuman.attach(this);

			addSystemButton(componentsForHuman, 1, _("Combat", "End"), () => this.endTurn());
			addSystemButton(componentsForHuman, 2, _("Combat", "Undo"), () => human.undo(), () => human.canUndo);
			addSystemButton(componentsForHuman, 3, _("Combat", "Retire"), () => this.retire());
			let view = addSystemButton(componentsForHuman, 4, _("Combat", "View"));

			function addSystemButton(
				parent: Composite,
				nth: number,
				label: any,
				click?: Slot,
				enabled?: () => boolean
			): Button {
				let x = SCREEN_W - (SYSTEM_BUTTON_W + MARGIN) * nth;
				let y = SCREEN_H - (SYSTEM_BUTTON_H + MARGIN);
				let btn = new Button(x, y, SYSTEM_BUTTON_W, SYSTEM_BUTTON_H, new Label(label), click);
				if (enabled) {
					defineGetSet(btn, "enabled", enabled);
				}
				btn.attach(parent);
				return btn;
			}

			//========= Units =========
			let drawUnits = new Component();
			drawUnits.onDraw = (g, when) => this.drawUnits(g, when, this.focusTime);
			drawUnits.attach(this);

			//========= View =========
			let drawOnView = new Component();
			drawOnView.onDraw = (g, when) => this.drawBarsOnView(g, when);
			defineGetSet(drawOnView, "visible", () => componentsForHuman.visible && (view.hover || view.pressed));
			drawOnView.attach(this);

			//========= Focus =========
			let componentsForFocus = new Composite();
			defineGetSet(componentsForFocus, "visible", () => !!this.focus);
			componentsForFocus.attach(this);

			let barsOnFocus = new Component();
			barsOnFocus.onDraw = (g, when) => this.drawBarsOnFocus(g, when, this.focus, this.controller.caret);
			barsOnFocus.attach(componentsForFocus);

			let panelForFocus = new Widget(PANEL_LX, PANEL_Y, PANEL_LW, PANEL_H);
			panelForFocus.onDraw = (g, when) => this.drawPanel(g, when, panelForFocus, assume(this.focus));
			panelForFocus.attach(componentsForFocus);

			//========= Skills =========
			let componentsForSkills = new Composite();
			defineGetSet(componentsForSkills, "visible", () => human.visible && !!this.focus);
			componentsForSkills.attach(this);

			for (let i = 0; i < SKILL_MAX; ++i) {
				new SkillButton(
					this, i,
					SKILL_X + floor(i / SKILL_ROWS) * (SKILL_W + MARGIN),
					SKILL_Y + (i % SKILL_ROWS) * (SKILL_H + MARGIN),
					SKILL_W, SKILL_H
				).attach(componentsForSkills);
			}

			//========= Target =========
			let target = (): Optional<Unit> => {
				let { focus } = this;
				if (focus && this.enabled) {
					let map = this.mapFor(focus);
					let { caret } = this.controller;
					if (caret) {
						let { effect } = map.get(caret);
						if (effect) {
							return effect.target;
						}
					}
				}
				return undefined;
			};

			let panelForTarget = new Widget(PANEL_RX, PANEL_Y, PANEL_RW, PANEL_H);
			defineGetSet(panelForTarget, "visible", () => !!target());
			panelForTarget.onDraw = (g, when) => this.drawPanel(g, when, panelForTarget, assume(target()));
			panelForTarget.attach(this);

			//========= Fades and Others =========
			let g = System.canvas.getContext("2d");
			if (g) {
				new Gallery(FIELD_X, FIELD_Y, FADE_W, FIELD_H, new Box({
					fillStyle: createLinearGradient(g, FIELD_X, FIELD_Y, FIELD_X + FADE_W, FIELD_Y, FADE_FAR, FADE_NEAR)
				})).attach(this);
				new Gallery(FIELD_X + FIELD_W - FADE_W, FIELD_Y, FIELD_W, FIELD_H, new Box({
					fillStyle: createLinearGradient(g, FIELD_X + FIELD_W - FADE_W, FIELD_Y, FIELD_X + FIELD_W, FIELD_Y, FADE_NEAR, FADE_FAR)
				})).attach(this);
			}
			addConfigButton(this);

			//========= start the combat =========
			this.startTurn();
		}

		get controller(): Controller { return this.children[this.team] as any; }
		get numScrollsPerTurn(): number { return this.stage.numScrollsPerTurn; }

		getLevel(_tagbits?: number): number {
			let { level, numScrollsPerTurn } = this.stage;
			if (numScrollsPerTurn > 0) {
				level += (this.field.depth / numScrollsPerTurn) * LEVEL_PER_DEPTH;
			}
			// TODO: modify level depending on tagbits; ex. wet dungeons decrease fire damages.
			return level;
		}

		private _focus?: Unit;
		private focusTime?: Timestamp;

		get focus(): Optional<Unit> { return this._focus; }
		set focus(value: Optional<Unit>) {
			if (!value) {
				this._focus = undefined;
				this.focusTime = undefined;
			} else if (this._focus !== value) {
				this._focus = value;
				this.focusTime = now();
			}
		}

		private _zoc?: ZoC[];
		get zoc(): ZoC[] {
			assert(this.enabled);
			let { _zoc } = this;
			if (!_zoc) {
				let { depth } = this.field;
				let zocs = [
					new HexMap<number>(depth, 0),
					new HexMap<number>(depth, 0)
				];
				this.eachUnit(unit => {
					let costZoC = unit.ZoC;
					if (costZoC > 0) {
						let zoc = zocs[enemyOf(unit.team)];
						zoc.surround(unit.hex, 1, hex => zoc.set(zoc.get(hex) + costZoC, hex));
					}
				});
				this._zoc = _zoc = zocs;
			}
			return _zoc;
		}

		private maps?: ActionMaps;
		mapFor(unit: Unit): ActionMap {
			assert(this.enabled);
			let { maps } = this;
			if (!maps) {
				this.maps = maps = new HexMap<ActionMap | undefined>(this.field.depth, undefined);
			}
			let { hex } = unit;
			let map = maps.rawget(hex);
			if (!map) {
				map = new ActionMap(this, unit, unit.SP);
				maps.set(map, hex);
			}
			return map;
		}

		onSkillChanged(unit: Unit): void {
			let { hex } = unit;
			let { maps, snapshots } = this;
			if (maps) {
				maps.set(undefined, hex);
			}
			if (snapshots) {
				for (let snapshot of snapshots) {
					if (snapshot.unit === unit) {
						snapshot.maps.set(undefined, snapshot.hex);
					}
				}
			}
		}

		savepoint(unit: Unit): void {
			this.snapshots.push({
				unit: unit,
				hex: unit.hex,
				SP: unit.SP,
				maps: assume(this.maps),
				zoc: this.zoc
			});
		}

		rollback(): void {
			let snapshot = assume(this.snapshots.pop());
			let { unit } = snapshot;
			this.setUnit(unit, snapshot.hex);
			unit.SP = snapshot.SP;
			this._zoc = snapshot.zoc;
			this.maps = snapshot.maps;
			this.focus = unit;
		}

		setUnit(unit: Optional<Unit>, hex: Hex): void {
			let { field } = this;
			let cell = assume(field.rawget(hex));
			let occupied = cell.unit;
			if (unit) {
				if (occupied === unit) {
					return;	// not moved at all
				}
				assert(!occupied);
				let { _hex } = unit;
				if (_hex) {
					assume(field.rawget(_hex)).unit = undefined;
				}
				unit._hex = hex;
			} else if (occupied) {
				occupied._hex = undefined;
			}
			cell.unit = unit;
			this.invalidate();
		}

		revive(unit: Unit, hex: Hex): void {
			assert(unit.HP > 0);
			let { deads } = this;
			let index = deads.indexOf(unit);
			assert(index >= 0);
			deads.splice(index, 1);
			unit.SP = unit.availSP;
			unit.state = new UnitEnter(unit.DEX);
			this.setUnit(unit, hex);
			this.snapshots.length = 0;
		}

		// invalidate caches of ZoC and ActionMap
		invalidate(): void {
			this._zoc = undefined;
			this.maps = undefined;
		}

		startTurn(): void {
			let { team } = this;
			for (let dead of this.deads) {
				if (dead.team === team) {	// dead
					dead.recuperate();
				}
			}
			let jobs: Optional<Job[]>;
			this.eachUnit(unit => {
				let job = unit.onTurnStart(this);
				if (job) {
					if (jobs) {
						jobs.push(job);
					} else {
						jobs = [job];
					}
				}
			});
			let enable = () => {
				this.enabled = true;
				this.controller.visible = true;
			};
			if (jobs) {
				join(jobs).then(enable);
			} else {
				enable();
			}
		}

		retire(): void {
			Dialog.confirm(this, _("Combat", "ConfirmRetire"),
				{
					label: _("Combat", "Retire"),
					click: () => {
						this.controller.visible = false;
						FadeOut.go(this, new Town.Home(this.data));
					},
					mnemonic: MNEMONIC_YES
				},
				{
					label: _("Config", "Cancel"),
					mnemonic: MNEMONIC_NO
				}
			);
		}

		endTurn(): void {
			this.enabled = false;
			this.snapshots.length = 0;
			this.controller.visible = false;

			this.eachUnit(unit => { unit.onTurnEnd(this); });

			if (this.team === TEAM.ALLY) {
				let { numScrollsPerTurn } = this;
				if (numScrollsPerTurn > 0) {
					// kill units scrolled out.
					let edge = this.field.minXH + numScrollsPerTurn;
					this.eachUnit(unit => {
						let { hex } = unit;
						if (hex.xH < edge) {
							unit.state = new UnitStagger(unit, unit.HP);
							this.kill(unit);
						}
					});
					let { depth } = this.field;
					new Animation(FIELD_SCROLL_DURATION * numScrollsPerTurn, (progress) => {
						this.scrollTo(depth + numScrollsPerTurn * progress);
					}).attach(this);

					// Check game is over
					if (this.isGameOver) { return; }
				}
			}

			// Switch turn
			this.team = enemyOf(this.team);

			// Effect on switch
			let design = COMBAT_SWITCH[this.team];
			let { innerStyle, outerStyle, textStyle } = design;
			let message = _("Combat", design.messageID);

			new Animation(COMBAT_SWITCH_DURATION, (progress, g) => {
				g.save();
				g.globalAlpha = sin(PI * progress);
				fillRadialGradient(g, 0, 0, SCREEN_W, FIELD_H, innerStyle, outerStyle);
				drawText(g, message.localized, SCREEN_W / 2, FIELD_H / 2, textStyle);
				g.restore();
			}).then(() => {
				this.startTurn();
			}).attach(this);
		}

		dose(unit: Unit, skill: Skill): Job {
			assert(this.enabled);
			assert(unit.SP >= unit.costOf(skill));

			let finish = (): void => {
				this.enabled = true;
				if (unit.done(this)) {
					this.focus = undefined;
				}
			};

			this.focus = unit;
			// wait for skill animation
			this.enabled = false;

			this.snapshots.length = 0;
			this.invalidate();
			return unit.shoot(this, unit, skill).then(finish);
		}

		// Caller is responsible to check the action is valid.
		move(unit: Unit, hex: Hex): Job {
			assert(this.enabled);
			assert(!same(hex, unit.hex));

			let finish = (): void => {
				this.enabled = true;
				if (unit.done(this)) {
					this.focus = undefined;
				}
			};

			this.focus = unit;
			let { field } = this;
			let { skill } = unit;
			let map = this.mapFor(unit);
			let r = map.get(hex);
			if (r.effect) {
				assert(unit.SP >= unit.costOf(skill));

				// wait for skill animation
				this.enabled = false;

				let { target } = r.effect;
				assert(unit.isTarget(target, skill));

				let shoot = (): Job => {
					this.snapshots.length = 0;
					this.invalidate();
					return unit.shoot(this, target, skill).then(finish);
				};

				// fast path for shoot only
				if (same(r.shotFrom, unit.hex)) {
					return shoot();
				}

				// walk and shoot
				let path = assume(map.getPath(hex, field));
				assert(path.length > 1);
				let hexWalk = path[path.length - 1];
				assert(!same(hexWalk, hex));
				assert(!same(hexWalk, unit.hex));
				this.setUnit(unit, hexWalk);
				unit.SP = map.get(hexWalk).SP;
				let walk = unit.state = new UnitWalk(path);
				let job = delay(shoot);
				walk.then(job);
				return job;
			} else {
				assert(r.SP >= 0 && field.get(hex).empty);
				// walk only
				let path = assume(map.getPath(hex, field));
				assert(path.length > 1);
				this.setUnit(unit, hex);
				unit.SP = r.SP;
				let walk = unit.state = new UnitWalk(path);
				finish();
				return (config.wait.WALK ? walk : committed);
			}
		}

		// find units in valid cells; NOTE: eachUnit returns ones in all visible cells.
		findUnit(hex: Optional<Hex>, next: boolean, filter: (unit: Unit) => boolean): Optional<Unit> {
			let { field } = this;
			let { minXH, maxXH } = field;
			let dx = ((this.team === TEAM.ALLY ? next : !next) ? 1 : -1);
			let dy = (next ? 1 : -1);
			let xH: Coord;
			let yH: Coord;
			if (hex) {
				({ xH, yH } = hex);
			} else {
				xH = (dx < 0 ? minXH : maxXH - 1);
				yH = (dy < 0 ? 0 : MAP_H - 1);
			}
			for (let i = 1, limit = (maxXH - minXH + 1) * MAP_H; i < limit; ++i) {
				yH += dy;
				if (yH < 0 || MAP_H <= yH) {
					if (yH < 0) {
						yH = MAP_H - 1;
					} else {
						yH = 0;
					}
					xH += dx;
					if (xH < minXH) {
						xH = maxXH - 1;
					} else if (maxXH <= xH) {
						xH = minXH;
					}
				}

				let { unit } = field.get(xH, yH);
				if (unit && filter(unit)) { return unit; }
			}
			return undefined;	// not found
		}

		kill(unit: Unit): void {
			if (unit.alive) {
				unit.HP = 0;
				this.setUnit(undefined, unit.hex);
				this.dying.push(unit);
			}

			// Check any party unit remains.
			if (unit.team === TEAM.ALLY) {
				this.deads.push(unit);
				if (this.parent && this.isGameOver) {
					this.controller.visible = false;
					(unit.state || committed).then(() => {
						Dialog.confirm(this, _("Combat", "GameOver"), {
							label: _("Combat", "Retire"),
							click: () => FadeOut.go(this, new Town.Home(this.data)),
							mnemonic: MNEMONIC_OK
						});
					});
				}
			}
		}

		get isGameOver(): boolean {
			return !this.findUnit(undefined, true, u => u.team === TEAM.ALLY);
		}

		createPopup(text: string, color: CanvasStyle, hex: Hex): Animation {
			let x = this.toX(hex) + CELL_W / 2;
			let y = this.toY(hex) + CELL_H;
			return new Animation(POPUP_DURATION, (progress, g) =>
				drawText(g, text, x, y - progress * POPUP_DY, {
					fontSize: POPUP_FONT_SIZE,
					fillStyle: color,
					strokeStyle: "black",
					globalAlpha: sin(PI * progress),
					lineWidth: 4,
					textAlign: "center",
					textBaseline: "bottom"
				})
			);
		}

		// return an animation that damages or heals target and raises a popup on attach.
		promiseEffect(effect: SkillEffect, hex: Hex): Animation {
			let { target } = effect;
			let deltaHP = (effect.deltaHP || 0);
			let text = abs(deltaHP).toString();
			let color = (deltaHP > 0 ? POPUP_COLOR_HEAL : POPUP_COLOR_DAMAGE);
			let popup = this.createPopup(text, color, hex);
			let { attach } = popup;
			popup.attach = (parent: Composite) => {
				let deltaSP = (effect.deltaSP || 0);
				if (deltaHP < 0 || deltaSP < 0) {
					target.state = new UnitStagger(target, -deltaHP);
				}
				target.HP = clamp(0, target.maxHP, target.HP + deltaHP);
				if (deltaSP !== 0) {
					target.SP = clamp(0, target.maxSP, target.SP + deltaSP);
				}
				if (target.HP <= 0) {
					this.kill(target);
				} else {
					let { duration, deltaHPoT } = effect;
					if (duration != null && deltaHPoT !== 0) {
						target.effectsOverTime.push({
							spec: `HP: ${deltaHPoT > 0 ? "+" : ""} ${deltaHPoT}`,
							duration,
							deltaHPoT
						});
					}
				}
				return attach.call(popup, parent);
			};
			return popup;
		}

		// visit all visible units
		eachUnit(callback: (unit: Unit) => void): void {
			this.field.eachVisible(({ unit }) => {
				if (unit) {
					callback(unit);
				}
			});
		}

		// scene hex to X in view coordinate
		toX(xH: Coord, yH: Coord): Pixel;
		toX(hex: Hex): Pixel;
		toX(xH_or_hex: Coord | Hex, yH?: Coord): Pixel {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			return FIELD_X + CELL_W / 2 * (xH - 1 - this.field.depth);
		}

		// scene hex to Y in view coordinate
		toY(xH: Coord, yH: Coord): Pixel;
		toY(hex: Hex): Pixel;
		toY(xH_or_hex: Coord | Hex, yH?: Coord): Pixel {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			return FIELD_Y + SKY_H + CELL_H * (yH * 2 + xH % 2);
		}

		// view coordinate to scene valid hex, or null if invalid cell
		toHex(x: Pixel, y: Pixel): Optional<Hex> {
			let { field } = this;
			let dx = x - FIELD_X + field.depth * CELL_W / 2;
			let dy = y - FIELD_Y - SKY_H;

			let yH2 = floor(dy / CELL_H);
			if (0 <= yH2 && yH2 < MAP_H * 2) {
				let xH: Coord;
				if (yH2 % 2 === 0) {
					xH = 2 * floor((dx + CELL_W / 2) / CELL_W);
				} else {
					xH = 2 * floor(dx / CELL_W) + 1;
				}
				if (field.minXH <= xH && xH < field.maxXH) {
					let yH = floor(yH2 / 2);
					return { xH, yH };
				}
			}
			return undefined; // out of scene
		}

		// depth can be non-integer.
		scrollTo(depth: Coord): void {
			let { field } = this;
			if (depth > field.depth) {
				let minXH1 = field.minVisibleXH;
				let maxXH1 = field.maxVisibleXH;
				field.depth = depth;
				let minXH2 = field.minVisibleXH;
				let maxXH2 = field.maxVisibleXH;
				// remove lines scrolling out
				for (let xH = minXH1; xH < minXH2; ++xH) {
					field.deleteLine(xH);
				}
				// ensure lines in display
				for (let xH = max(minXH2, maxXH1); xH < maxXH2; ++xH) {
					field.setLine(xH, this.stage.generate(this, xH));
				}
			}
		}

		onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
			// Stage (Sky, Cells)
			this.stage.draw(g, when, this);

			// Markers
			let { focus } = this;
			if (focus && this.enabled) {
				this.drawMarkers(g, when, this.focusTime, this.mapFor(focus), focus);
			}

			// Other components
			super.onDraw(g, when);
		}

		// Markers
		private drawMarkers(g: CanvasRenderingContext2D, when: Timestamp, startTime: Optional<Timestamp>, map: ActionMap, unit: Unit) {
			let progress = Animation.clamp(when, startTime, MARKER_DURATION);
			if (progress <= 0) { return; }

			const cost = unit.costOf(unit.skill);
			const { DASH_OR_RANGE, RANGE, TARGET } = (unit.skill.hostile ? MARKER_HOSTILE : MARKER_FRIENDLY);

			g.save();
			if (progress < 1) {
				g.globalAlpha = progress;
			}
			map.eachVisible(({ effect, SP, shotFrom }, xH, yH) => {
				let markerStyle: Optional<MarkerStyle>;
				let inflateW = 0;
				let inflateH = 0;
				if (effect) {
					markerStyle = TARGET;
					// XXX: Should repeat inflate animation?
					inflateW = CELL_INFLATE_W * (1 - progress);
					inflateH = CELL_INFLATE_H * (1 - progress);
				} else if (SP >= cost) {
					markerStyle = MARKER_WALK;
				} else if (SP >= 0) {
					markerStyle = shotFrom ? DASH_OR_RANGE : MARKER_DASH;
				} else if (shotFrom) {
					markerStyle = RANGE;
				}
				if (markerStyle) {
					let x = this.toX(xH, yH) - inflateW;
					let y = this.toY(xH, yH) - inflateH;
					let w = CELL_W + inflateW * 2;
					let h = CELL_H + inflateH * 2;
					g.fillStyle = markerStyle.bkgnd;
					g.fillRect(x + 5, y + 5, w - 10, h - 10);
					g.strokeStyle = markerStyle.outer;
					g.lineWidth = 2;
					g.strokeRect(x + 2, y + 2, w - 4, h - 4);
					g.strokeStyle = markerStyle.inner;
					g.lineWidth = 1;
					g.strokeRect(x + 4, y + 4, w - 8, h - 8);
				}
			});
			g.restore();
		}

		// Units (Shadows, Characters, Status)
		private drawUnits(g: CanvasRenderingContext2D, when: Timestamp, startTime?: Timestamp): void {
			let { focus } = this;
			let zoc = (this.enabled ? this.zoc : undefined);

			interface UnitXY extends XY {
				unit: Unit;
			}
			let units: UnitXY[] = [];
			// Living units
			this.eachUnit(unit => {
				let pt = unit.getXY(this, when) as UnitXY;
				pt.unit = unit;
				units.push(pt);
			});
			// Dying units
			for (let i = 0; i < this.dying.length;) {
				let unit = this.dying[i];
				let pt = unit.getXY(this, when) as UnitXY;
				if (pt) {
					pt.unit = unit;
					units.push(pt);
					++i;
				} else {
					this.dying.splice(i, 1);
				}
			}
			// Sort all units by Y-order.
			units.sort(Unit.compare);

			let doneText = _("Combat", "Done").localized;
			let overlayAlpha = (1 - cos(2 * PI * Animation.cycle(when, startTime, UNIT_OVERLAY_CYCLE))) / 2 * UNIT_OVERLAY_ALPHA;
			let targetOverlay = UNIT_OVERLAY_FRIENDLY;
			let map: Optional<ActionMap>;
			if (focus) {
				if (focus.skill.hostile) {
					targetOverlay = UNIT_OVERLAY_HOSTILE;
				}
				if (this.enabled) {
					map = this.mapFor(focus);
				}
			}
			for (let {unit, x, y} of units) {
				let overlayStyle: Optional<CanvasStyle>;
				if (map) {
					if (focus === unit) {
						overlayStyle = UNIT_OVERLAY_FOCUS;
					} else if (unit.alive && map.get(unit.hex).effect) {
						overlayStyle = targetOverlay;
					}
				}
				unit.draw(g, when, x, y, overlayStyle, overlayAlpha);
				if (!unit.state && zoc && unit.alive) {
					let { SP, step, minCost, team } = unit;
					if (SP < minCost) {
						if (SP < step) {
							drawText(g, doneText, x, y, UNIT_DONE_STYLE);
						} else if (SP < step + zoc[team].get(unit.hex)) {
							drawText(g, doneText, x, y, UNIT_BOUND_STYLE);
						}
					}
				}
			}
		}

		private drawBarsOnView(g: CanvasRenderingContext2D, when: Timestamp) {
			this.eachUnit(unit => unit.drawBars(g, when, this));
		}

		private drawBarsOnFocus(g: CanvasRenderingContext2D, when: Timestamp, unit?: Unit, caret?: Hex) {
			if (!unit || !this.enabled) { return; }
			let map = this.mapFor(unit);
			let { field } = this;
			map.each(({ effect }) => {
				if (effect) {
					effect.target.drawBars(g, when, this, effect.deltaHP, effect.deltaSP);
				}
			});
			if (caret) {
				let r = map.get(caret);
				if (r.effect) {
					let shotFrom = assume(r.shotFrom);
					let cost = unit.costOf(unit.skill);
					if (same(shotFrom, unit.hex)) {
						unit.drawBars(g, when, this, undefined, -cost);
					} else {
						drawHP(g, when, this, unit, unit.hex);
						drawSP(g, when, this, unit, shotFrom, map.get(shotFrom).SP - cost);
					}
				} else {
					if (r.SP > 0 && field.get(caret).empty) {
						drawHP(g, when, this, unit, unit.hex);
						drawSP(g, when, this, unit, caret, r.SP);
					} else {
						unit.drawBars(g, when, this);
					}
				}
			} else {
				unit.drawBars(g, when, this);
			}
		}

		private drawPanel(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH, unit: Unit): void {
			drawRect(g, rect, PANEL_BKGND_STYLE[unit.team]);

			let { ch } = unit;
			let chRect = scaleProportionally(ch, UNIT_MAX_W, UNIT_MAX_H) as XYWH;
			chRect.x = rect.x + MARGIN + (CELL_W - chRect.w) / 2;
			chRect.y = rect.y + (rect.h - chRect.h) / 2;
			ch.draw(g, when, chRect);

			const PANEL_NAME_X: Pixel = UNIT_MAX_W + MARGIN * 2;
			const PANEL_NAME_Y: Pixel = MARGIN;
			let cost = unit.costOf(unit.skill);
			let MVW = (unit.SP >= cost ? floor((unit.SP - cost) / unit.step) : "-");
			drawText(g,
				`${unit.name} / Lv: ${toFixed(unit.level)}\n` +
				`HP: ${unit.HP} / SP: ${unit.SP}`,
				rect.x + PANEL_NAME_X, rect.y + PANEL_NAME_Y, PANEL_TEXT_STYLE
			);

			let { effectsOverTime } = unit;
			for (let i = 0, len = effectsOverTime.length; i < len; ++i) {
				let effect = effectsOverTime[i];
				drawText(g,
					`[${effect.duration}] ${effect.spec}`,
					rect.x + PANEL_NAME_X, rect.y + PANEL_NAME_Y + getStride(g, PANEL_TEXT_STYLE.fontSize) * (i + 2), PANEL_TEXT_STYLE
				);
			}

			function toFixed(n?: number): string {
				return n != null ? n.toFixed(1) : "-";
			}
		}
	}

	//================================================================================
	// Human
	//================================================================================

	const enum Caret {
		Unlocked,	// focus tracks units on caret.
		Locked,		// assume focus is valid. focus won't be changed on caret's move.
		Dragged,	// assume focus is valid. dragging newly focused unit, and locked on up.
		ReDragged	// assume focus is valid. dragging already focused unit, and unlocked on up.
	}

	class Human extends Component implements Controller {
		private mode: Caret = Caret.Unlocked;

		private _caret?: Hex;
		get caret(): Optional<Hex> { return this._caret; }
		set caret(value: Optional<Hex>) {
			this._caret = value;
			if (this.mode === Caret.Unlocked) {
				let scene = this.parent as Scene;
				scene.focus = (value ? scene.field.get(value).unit : undefined);
			}
		}

		private finish(job: Job): void {
			let scene = this.parent as Scene;
			let checkFocus = () => {
				if (!scene.focus) {
					this.mode = Caret.Unlocked;
				}
			};
			if (scene.enabled) {
				checkFocus();
			} else {
				job.then(checkFocus);
			}
		}

		dose(unit: Unit, skill: Skill): void {
			let scene = this.parent as Scene;
			this.mode = Caret.Locked;
			this.finish(scene.dose(unit, skill));
		}

		get canUndo(): boolean {
			let scene = this.parent as Scene;
			return scene.snapshots.length > 0 || this.mode >= Caret.Locked;
		}

		undo(): void {
			let scene = this.parent as Scene;
			let { snapshots } = scene;
			let { length } = snapshots;
			let unit = (length > 0 ? snapshots[length - 1].unit : undefined);
			if (this.mode >= Caret.Locked && unit !== scene.focus) {
				this.mode = Caret.Unlocked;
			} else if (unit) {
				scene.rollback();
			} else {
				logger.error(_("Combat", "CannotUndo"));
			}
			this.caret = this._caret;
		}

		onHover(x: Pixel, y: Pixel): void {
			this.caret = (this.parent as Scene).toHex(x, y);
		}

		onDrag(x: Pixel, y: Pixel): void {
			this.caret = (this.parent as Scene).toHex(x, y);
		}

		downCaret(hex?: Hex): void {
			this.caret = hex;
			if (!hex) { return; }

			let scene = this.parent as Scene;
			let { mode } = this;
			let { focus } = scene;
			if (focus) {
				if (focus.team === scene.team && !focus.done(scene)) {
					if (mode === Caret.Locked && same(hex, focus.hex)) {
						this.mode = Caret.ReDragged;
					} else {
						this.mode = Caret.Dragged;
					}
					return;
				}
			} else {
				let { unit } = scene.field.get(hex);
				scene.focus = unit;
				if (unit) {
					this.mode = Caret.Dragged;
					return;
				}
			}
			this.mode = Caret.Unlocked;
		}

		onDown(x: Pixel, y: Pixel): void {
			this.downCaret((this.parent as Scene).toHex(x, y));
		}

		upCaret(hex?: Hex): void {
			this.caret = hex;
			if (!hex) { return; }

			let scene = this.parent as Scene;
			let { mode } = this;

			if (!scene.enabled || mode < Caret.Dragged) {
				return;	// keep Hover or Locked
			}

			let { focus } = scene;
			if (!focus || scene.team !== focus.team) {
				this.mode = Caret.Unlocked;	// click on enemy
				return;
			}

			if (same(hex, focus.hex)) {
				this.mode = (mode === Caret.Dragged ? Caret.Locked : Caret.Unlocked);
				return;
			}

			let r = scene.mapFor(focus).get(hex);
			if (r.effect) {
				// shoot
			} else if (r.SP >= 0 && scene.field.get(hex).empty) {
				// walk only, so take a snapshot to undo.
				scene.savepoint(focus);
			} else {
				// cannot shoot nor walk.
				scene.focus = undefined;
				this.mode = Caret.Unlocked;
				return;
			}

			this.mode = Caret.Locked;
			this.finish(scene.move(focus, hex));
		}

		onUp(x: Pixel, y: Pixel): void {
			this.upCaret((this.parent as Scene).toHex(x, y));
		}

		onPress(key: KEY): void {
			switch (key) {
				case KEY.BACKSPACE:
				case KEY.TAB:
				case KEY.DELETE:
				case KEY.Q:
					// NOTE: We cannot use mnemonic of system buttons because they are not visible if an unit is locked.
					this.undo();
					break;
				case KEY.PAGE_DOWN:
				case KEY.C:
					seek.call(this, true);
					break;
				case KEY.PAGE_UP:
					seek.call(this, false);
					break;
				case KEY.SPACE:
				case KEY.ENTER:
					this.click(this.caret);
					break;
				case KEY.E:
					moveCaretFor.call(this, DIR.NE);
					break;
				case KEY.RIGHT:
				case KEY.D:
					moveCaretFor.call(this, DIR.E);
					break;
				case KEY.DOWN:
				case KEY.X:
				case KEY.S:
					moveCaretFor.call(this, DIR.SE);
					break;
				case KEY.Z:
					moveCaretFor.call(this, DIR.SW);
					break;
				case KEY.LEFT:
				case KEY.A:
					moveCaretFor.call(this, DIR.W);
					break;
				case KEY.UP:
				case KEY.W:
					moveCaretFor.call(this, DIR.NW);
					break;
			}

			function moveCaretFor(this: Human, dir: DIR) {
				let { field } = this.parent as Scene;
				let { caret } = this;
				if (caret) {
					let hex = shift(caret, dir);
					if (field.contains(hex)) {
						this.caret = hex;
					}
				} else {
					this.caret = { xH: field.minXH, yH: 0 };
				}
			}

			function seek(this: Human, next: boolean) {
				let scene = this.parent as Scene;
				let { caret } = this;
				let { team, focus } = scene;
				let hex = (focus ? focus.hex : caret);
				let unit = scene.findUnit(hex, next, u => u.team === team && !u.done(scene));
				if (unit) {
					scene.focus = unit;
					if (!caret) {
						this.caret = unit.hex;
					}
					if (this.mode === Caret.Unlocked) {
						this.mode = Caret.Locked;
					}
				} else {
					logger.error(_("Combat", "UnitNotAvailable"));
				}
			}
		}

		click(hex?: Hex): void {
			if (!hex) { return; }
			let scene = this.parent as Scene;
			if (scene.field.contains(hex)) {
				this.downCaret(hex);
				this.upCaret(hex);
			}
		}

		onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
			let { caret } = this;
			if (caret) {
				let scene = this.parent as Scene;
				let { focus, field } = scene;
				if (this.mode === Caret.Unlocked) {
					drawCaret(g, when, scene, caret, CARET_SELECT);
				} else if (focus && scene.enabled) {
					let map = scene.mapFor(focus);
					// Path to walk
					let path = map.getPath(caret, field);
					if (path && path.length >= 2) {
						drawPath(g, scene, path);
					}
					// Caret(s)
					let r = map.get(caret);
					if (r.effect) {
						let { skill } = focus;
						switch (skill.usage) {
							case USAGE.SINGLE_HOSTILE:
								drawCaret(g, when, scene, caret, CARET_HOSTILE);
								break;
							case USAGE.SINGLE_FRIENDLY:
								drawCaret(g, when, scene, caret, CARET_FRIENDLY);
								break;
							case USAGE.STRAIGHT_HOSTILE:
								field.straight(r.shotFrom!, caret, focus.rangeOf(skill) !, hex => drawCaret(g, when, scene, hex, CARET_HOSTILE));
								break;
							case USAGE.STRAIGHT_FRIENDLY:
								field.straight(r.shotFrom!, caret, focus.rangeOf(skill) !, hex => drawCaret(g, when, scene, hex, CARET_FRIENDLY));
								break;
							case USAGE.SURROUND_HOSTILE:
								field.surround(r.shotFrom!, focus.rangeOf(skill) !, hex => drawCaret(g, when, scene, hex, CARET_HOSTILE));
								break;
							case USAGE.SURROUND_FRIENDLY:
								field.surround(r.shotFrom!, focus.rangeOf(skill) !, hex => drawCaret(g, when, scene, hex, CARET_FRIENDLY));
								break;
						}
					} else if (r.SP >= 0) {
						drawCaret(g, when, scene, caret, CARET_WALK);
					} else {
						drawCaret(g, when, scene, caret, CARET_SELECT);
					}
				}
			}

			function drawCaret(g: CanvasRenderingContext2D, _when: Timestamp, scene: Scene, hex: Hex, caretStyle: CaretStyle): void {
				let width = CARET_LINE_INNER + CARET_LINE_OUTER / 2;
				let x = scene.toX(hex) + width;
				let y = scene.toY(hex) + width;
				let w = CELL_W - width * 2;
				let h = CELL_H - width * 2;
				let ww = CELL_W / 4;
				let hh = CELL_H / 4;
				g.save();
				g.lineCap = "round";
				g.lineJoin = "round";
				g.beginPath();
				// NW
				g.moveTo(x + ww, y);
				g.lineTo(x, y);
				g.lineTo(x, y + hh);
				// NE
				g.moveTo(x + w - ww, y);
				g.lineTo(x + w, y);
				g.lineTo(x + w, y + hh);
				// SE
				g.moveTo(x + w - ww, y + h);
				g.lineTo(x + w, y + h);
				g.lineTo(x + w, y + h - hh);
				// SW
				g.moveTo(x + ww, y + h);
				g.lineTo(x, y + h);
				g.lineTo(x, y + h - hh);
				// done
				g.lineWidth = CARET_LINE_OUTER;
				g.strokeStyle = caretStyle.outer;
				g.stroke();
				g.lineWidth = CARET_LINE_INNER;
				g.strokeStyle = caretStyle.inner;
				g.stroke();
				g.restore();
			}

			function drawPath(g: CanvasRenderingContext2D, scene: Scene, path: Hex[]) {
				assert(path.length >= 2);

				g.save();
				g.lineCap = "butt";
				g.lineJoin = "round";

				let prev = path[path.length - 2];
				let last = path[path.length - 1];
				let xPrev = scene.toX(prev) + CELL_W / 2;
				let yPrev = scene.toY(prev) + CELL_H / 2;
				let xLast = scene.toX(last) + CELL_W / 2;
				let yLast = scene.toY(last) + CELL_H / 2;
				let angle = atan2(yLast - yPrev, xLast - xPrev);

				g.beginPath();
				g.moveTo(xLast + PATH_RADIUS * cos(angle), yLast + PATH_RADIUS * sin(angle));
				g.lineTo(xLast + PATH_RADIUS * cos(angle + PI * 2 / 3), yLast + PATH_RADIUS * sin(angle + PI * 2 / 3));
				g.lineTo(xLast + PATH_RADIUS * cos(angle - PI * 2 / 3), yLast + PATH_RADIUS * sin(angle - PI * 2 / 3));
				g.fillStyle = PATH_STYLE;
				g.fill();

				g.beginPath();
				g.moveTo(xLast - PATH_RADIUS / 2 * cos(angle), yLast - PATH_RADIUS / 2 * sin(angle));
				for (let i = path.length - 2; i >= 0; --i) {
					let hex = path[i];
					g.lineTo(scene.toX(hex) + CELL_W / 2, scene.toY(hex) + CELL_H / 2);
				}
				g.strokeStyle = PATH_STYLE;
				g.lineWidth = PATH_WIDTH;
				g.stroke();

				g.restore();
			}
		}
	}

	//================================================================================
	// CPU
	//================================================================================
	const CPU_X_BONUS = 10;			// positional bonus for X-axis per cell X (max<200)
	const CPU_Y_BONUS = 10;			// positional bonus for Y-axis per cell X (max=20)
	const CPU_SP_BONUS = 40;		// bonus for remaining SP.
	const CPU_SKILL_BONUS = 1000;	// bonus on effective use of skill.
	const CPU_FAVOR_EDGE = 0.1;		// factor for edge of map (<1 means avoid edge)
	const CPU_SEARCH_SP = 999;		// enough SP to search far units.

	// TODO: Support units with multiple skills.
	// TODO: Improve scoring of skills with multiple-targets.
	class CPU extends Component implements Controller {
		private running = false;
		get visible() { return this.running; }
		set visible(value: boolean) {
			this.running = value;
			if (value) { committed.then(() => this.run([])); }
		}

		caret?: Hex;

		dose(_unit: Unit, _skill: Skill): void {
			throw new Error("not implemented");	// TODO: allow CPU to dose.
		}

		private run(ignored: Unit[]): void {
			let scene = this.parent as Scene;
			let job: Optional<Job>;
			while (this.running) {
				if (!scene.enabled) {
					job = committed;	// should not happen, but...
				}
				if (job) {
					job.then(() => this.run(ignored));
					break;
				}
				this.caret = undefined;
				let unit = pick(scene, ignored);
				if (!unit) {
					scene.endTurn();	// no more actions in this turn.
					break;
				}
				job = move.call(this, scene, unit, ignored);
			}

			interface Score {
				hex: Hex;
				score: number;
			}

			function pick(scene: Scene, ignored: Unit[]): Optional<Unit> {
				let { focus } = scene;
				if (focus) { return focus; }
				let { team } = scene;
				let { length } = ignored;
				if (length > 0) {
					focus = scene.findUnit(ignored[length - 1].hex,
						false,
						u => u.team === team && !u.done(scene) && ignored.indexOf(u) < 0
					);
				} else {
					focus = scene.findUnit(undefined, false, u => u.team === team && !u.done(scene));
				}
				scene.focus = focus;
				return focus;
			}

			function move(this: CPU, scene: Scene, unit: Unit, ignored: Unit[]): Optional<Job> {
				let map = scene.mapFor(unit);
				let best = getBestMovement(scene, unit, map);
				let { hex } = best;

				// If unit cannot shoot, enter search-mode.
				if (!map.get(hex).effect && unit.SP >= unit.availSP) {
					let search = new ActionMap(scene, unit, CPU_SEARCH_SP);
					hex = getBestMovement(scene, unit, search, best).hex;
					let r = search.get(hex);
					if (r.effect) {
						hex = assume(r.shotFrom);
					}
					let { field } = scene;
					let comeFrom: Optional<Hex> = hex;
					while (comeFrom && (map.get(comeFrom).SP < 0 || !field.get(comeFrom).empty)) {
						comeFrom = search.get(comeFrom).comeFrom;
					}
					hex = (comeFrom ? comeFrom : unit.hex);
				}

				// Ignore units that don't want further actions to avoid infinite loops.
				if (same(hex, unit.hex)) {
					ignored.push(unit);
					scene.focus = undefined;
					return undefined;
				}

				// Reset ignored list.
				ignored.length = 0;
				this.caret = hex;
				let { PICK } = config.wait;
				if (PICK > 0) {
					let job = delay(() => scene.move(unit, hex));
					new Animation(PICK).then(job).attach(scene);	// just delay
					return job;
				} else {
					return scene.move(unit, hex);
				}
			}

			function getBestMovement(scene: Scene, unit: Unit, map: ActionMap, baseline?: Score): Score {
				let { field, numScrollsPerTurn } = scene;
				let { minXH, maxXH } = field;
				let hex = unit.hex;
				let { maxSP } = unit;
				let cost = unit.costOf(unit.skill) || maxSP;
				let edge = minXH + numScrollsPerTurn;

				// Baseline is "noop".
				let best = (baseline ? baseline : {
					hex: hex,
					score: scorePosition(unit, hex.xH, hex.yH, minXH, maxXH, edge) + scoreSP(unit.SP, maxSP)
				});
				map.each(({ SP, effect, shotFrom }, xH, yH) => {
					let score: number;
					if (effect && shotFrom) {
						// Walk and use skill; Score the position shot from.
						score = scorePosition(unit, shotFrom.xH, shotFrom.yH, minXH, maxXH, edge);
						// Score the shot at destionation.
						score += scoreSkill(scene, unit, effect);
						// Calc remaining SP.
						SP = map.get(shotFrom).SP - cost;
					} else if (SP >= 0 && field.get(xH, yH).empty) {
						// Walk only; Score the position walking to.
						score = scorePosition(unit, xH, yH, minXH, maxXH, edge);
					} else {
						return;	// Cannot pick it. "noop" also comes here.
					}
					assert(SP >= 0);

					// Bonus for remaining SP.
					score += scoreSP(SP, maxSP);

					if (best.score < score) {
						best.score = score;
						best.hex = { xH, yH };
					}
				});
				return best;
			}

			function scorePosition(unit: Unit, xH: Coord, yH: Coord, minXH: Coord, maxXH: Coord, edgeXH: Coord): number {
				let score = 0;
				if (unit.team === TEAM.ENEMY) {
					// Enemy: X left is better.
					score += (maxXH - xH) * CPU_X_BONUS;
				} else {
					// Party: X right is better.
					score += (xH - minXH) * CPU_X_BONUS;
				}

				// Y-center is better.
				let y2 = yH * 2 + xH % 2;
				if (y2 < MAP_H) {
					score += (y2) * CPU_Y_BONUS;
				} else {
					score += (MAP_H * 2 - 1 - y2) * CPU_Y_BONUS;
				}

				// Penalty in left edge to avoid scrolled out.
				if (xH < edgeXH) {
					score *= CPU_FAVOR_EDGE;
				}
				return score;
			}

			function scoreSP(SP: number, maxSP: number): number {
				return CPU_SP_BONUS * SP / maxSP;
			}

			function valueOfUnit(scene: Scene, me: Unit, you: Unit): number {
				let { ch } = me;
				let best = 0;
				for (let skill of ch.skills) {
					if (ch.rangeOf(skill) > 0) {
						let value: number;
						if (skill.hostile) {
							value = calcDamage(scene, me, skill, you) / you.HP;
						} else {
							value = calcHeal(scene, me, skill) / me.maxHP;
						}
						best = max(value, value);
					}
				}
				return min(1, best);
			}

			function scoreSkill(scene: Scene, me: Unit, effect: SkillEffect): number {
				let you = effect.target;
				let yourValue = valueOfUnit(scene, you, me);
				let deltaHP = (effect.deltaHP || 0);
				let effectiveHP = (deltaHP < 0
					? -deltaHP
					: min(deltaHP, you.maxHP - you.HP)
				);
				let myValue = min(1, effectiveHP / you.HP);
				return CPU_SKILL_BONUS * yourValue * myValue;
			}
		}
	}

	//================================================================================
	// Effects for Skills
	//================================================================================

	function calcDamage(_scene: Scene, unit: Unit, skill: Skill, target: Unit): number {
		let { tagbits } = skill;
		let power = unit.powerOf(skill);
		let diff = unit.level + unit.getOffenceLevel(tagbits) - target.level - target.getDefenceLevel(tagbits);
		return ceil(power * (100 - target.DEF) / 100 * pow(BASE_FOR_LEVEL, diff));
	}

	function calcHeal(scene: Scene, unit: Unit, skill: Skill): number {
		let { tagbits } = skill;
		let power = unit.powerOf(skill);
		let diff = unit.level + unit.getOffenceLevel(tagbits) - scene.getLevel(tagbits);
		return ceil(power * pow(BASE_FOR_LEVEL, diff));
	}

	const EFFECTS: { [id: string]: Effect } = {
		Damage: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): SkillEffect {
			return {
				target,
				deltaHP: -calcDamage(scene, unit, skill, target)
			};
		},
		// Damage to HP, and also the half to SP.
		DamageHPandSP: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): SkillEffect {
			let deltaHP = -calcDamage(scene, unit, skill, target);
			return {
				target,
				deltaHP: deltaHP,
				deltaSP: floor(deltaHP / 2)
			};
		},
		DamageOverTime: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): SkillEffect {
			let deltaHP = -calcDamage(scene, unit, skill, target);
			let duration = 2;	// TODO: skill.duration
			return {
				target,
				deltaHP: deltaHP,
				duration: duration,
				deltaHPoT: floor(deltaHP / duration)
			};
		},
		Heal: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): SkillEffect {
			return {
				target,
				deltaHP: calcHeal(scene, unit, skill)
			};
		},
		HealOverTime: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): SkillEffect {
			let deltaHP = calcHeal(scene, unit, skill);
			let duration = 2;	// TODO: skill.duration
			return {
				target,
				deltaHP: deltaHP,
				duration: duration,
				deltaHPoT: ceil(deltaHP / duration)
			};
		}
	};

	function getEffect(id: string): Effect {
		let effect = EFFECTS[id];
		if (!effect) {
			throw new RangeError(`Effect not found: "${id}"`);
		}
		return effect;
	}

	//================================================================================
	// Actions for Skills
	//================================================================================

	function colorOf(skill: Skill): RGB {
		let { tagbits } = skill;
		if (match(tagbits, TAG.Fire)) {
			return { r: 255, g: 128, b: 0 };
		} else if (match(tagbits, TAG.Cold)) {
			return { r: 0, g: 128, b: 255 };
		} else if (match(tagbits, TAG.Lightning)) {
			return { r: 255, g: 255, b: 0 };
		} else if (match(tagbits, TAG.Life)) {
			if (skill.hostile) {
				return { r: 255, g: 0, b: 128 };
			} else {
				return { r: 0, g: 255, b: 128 };
			}
		} else {
			return { r: 255, g: 255, b: 255 };
		}

		function match(bits: number, tag: TAG): boolean {
			return (bits & (1 << tag)) !== 0;
		}
	}

	function rearHexOf(field: Field, from: Hex, to: Hex): Optional<Hex> {
		let rearHex: Optional<Hex>;
		let rearStep = distance(from, to) + 1;
		field.straight(from, to, rearStep, (hex, steps) => {
			if (steps === rearStep && field.get(hex).empty) {
				rearHex = hex;
			}
		});
		return rearHex;
	}

	function standardCharge(scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
		let hexFrom = unit.hex;
		let hexTo = target.hex;
		let effect = unit.estimate(scene, target, skill);
		let popup = scene.promiseEffect(effect, hexTo);
		let action = new UnitCharge(scene, hexFrom, hexTo);
		unit.state = action;
		action.hit(() => popup.attach(scene));
		return (config.wait.POPUP ? join([popup, action]) : action);
	}

	function shootProjectile(scene: Scene, hexFrom: Hex, hexTo: Hex, skill: Skill): Animation {
		let color = colorOf(skill);
		let innerStyle = RGBtoString(color);
		let outerStyle = RGBtoString(color, 0);
		let dx = scene.toX(hexFrom) - scene.toX(hexTo);
		let dy = scene.toY(hexFrom) - scene.toY(hexTo);
		let duration = 100 + pow(dx * dx + dy * dy, 0.5) / SCREEN_W * 400;
		let action = new Animation(duration, (progress, g) => {
			let xFrom = scene.toX(hexFrom);
			let yFrom = scene.toY(hexFrom);
			let xTo = scene.toX(hexTo);
			let yTo = scene.toY(hexTo);
			let x = xFrom * (1.0 - progress) + xTo * progress + CELL_W / 2;
			let y = yFrom * (1.0 - progress) + yTo * progress + CELL_H / 2;
			let r = CELL_H / 4;
			fillRadialGradient(g, x - r, y - r, r * 2, r * 2, innerStyle, outerStyle, 0.5);
		});
		action.attach(scene);
		return action;
	}

	function standardNova(
		scene: Scene,
		unit: Unit,
		skill: Skill,
		center: Hex,
		range: number,
		factor?: (deltaHP: number, steps: number) => number
	): Job {
		let { field } = scene;

		let effects: Job[] = [];
		function trySkill(hex: Hex, steps: number) {
			let target = unit.getTarget(field, hex);
			if (target) {
				let effect = unit.estimate(scene, target, skill);
				if (factor) {
					if (effect.deltaHP != null) {
						effect.deltaHP = factor(effect.deltaHP, steps);
					}
					if (effect.deltaHPoT != null) {
						effect.deltaHPoT = factor(effect.deltaHPoT, steps);
					}
					if (effect.deltaSP != null) {
						effect.deltaSP = factor(effect.deltaSP, steps);
					}
				}
				let popup = scene.promiseEffect(effect, hex);
				popup.attach(scene);
				effects.push(popup);
			}
		}

		trySkill(center, 0);
		field.surround(center, range, trySkill);

		let color = colorOf(skill);
		let outerStyle = RGBtoString(color, 0);
		let action = new Animation(400, (progress, g) => {
			let x = scene.toX(center) + CELL_W / 2;
			let y = scene.toY(center) + CELL_H / 2;
			let w = range * CELL_W * progress;
			let h = range * CELL_H * progress;
			let innerStyle = RGBtoString(color, 1 - progress);
			fillRadialGradient(g, x - w, y - h, w * 2, h * 2, innerStyle, outerStyle, progress);
		});
		action.attach(scene);

		if (config.wait.POPUP) {
			effects.push(action);
			return join(effects);
		} else {
			return action;
		}
	}

	const ACTIONS: { [id: string]: Action } = {
		// Charge tha target and come back.
		Charge: standardCharge,
		// Knockback the target.
		Knockback: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let hexFrom = unit.hex;
			let hexTo = target.hex;
			const hexRear = rearHexOf(scene.field, hexFrom, hexTo);
			if (!hexRear) {
				return standardCharge(scene, unit, target, skill);	// no space; just charge
			}

			let effect = unit.estimate(scene, target, skill);
			let popup = scene.promiseEffect(effect, hexRear);
			let action = new UnitCharge(scene, hexFrom, hexTo);
			let knockback = new UnitWalk([hexTo, hexRear]);

			unit.state = action;
			action.hit(() => {
				scene.setUnit(target, hexRear);
				target.state = knockback;
			});
			knockback.then(() => popup.attach(scene));
			return (config.wait.POPUP ? join([popup, action]) : action);
		},
		// Go to behind of the target
		GoBehind: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let hexFrom = unit.hex;
			let hexTo = target.hex;
			let hexRear = rearHexOf(scene.field, hexFrom, hexTo);
			if (!hexRear) {
				return standardCharge(scene, unit, target, skill);	// no space; just charge
			}
			let effect = unit.estimate(scene, target, skill);
			let popup = scene.promiseEffect(effect, hexTo);
			let action = new UnitWalk([hexFrom, hexTo]);
			scene.setUnit(unit, hexRear);
			unit.state = action;
			action.then(() => popup.attach(scene));
			return (config.wait.POPUP ? popup : action);
		},
		// Charge and Knockback the target.
		Trample: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let hexFrom = unit.hex;
			let hexTo = target.hex;
			let hexRear = rearHexOf(scene.field, hexFrom, hexTo);
			if (!hexRear) {
				return standardCharge(scene, unit, target, skill);	// no space; just charge
			}
			let effect = unit.estimate(scene, target, skill);
			let popup = scene.promiseEffect(effect, hexRear);
			let action = new UnitWalk([hexFrom, hexTo]);
			let knockback = new UnitWalk([hexTo, hexTo, hexRear]);	// HACK: use the first hex twice to delay animation
			scene.setUnit(target, hexRear);
			target.state = knockback;
			scene.setUnit(unit, hexTo);
			unit.state = action;
			knockback.then(() => popup.attach(scene));
			return (config.wait.POPUP ? popup : knockback);
		},
		// Shoot a projectile.
		Shoot: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let hexFrom = unit.hex;
			let hexTo = target.hex;
			let effect = unit.estimate(scene, target, skill);
			let popup = scene.promiseEffect(effect, hexTo);
			let action = shootProjectile(scene, hexFrom, hexTo, skill);
			action.then(() => popup.attach(scene));
			return (config.wait.POPUP ? popup : action);
		},
		// Damage to HP, and heal the caster.
		Drain: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let hexFrom = target.hex;
			let hexTo = unit.hex;
			let effect = unit.estimate(scene, target, skill);
			let damage = scene.promiseEffect(effect, hexFrom);
			let heal = scene.promiseEffect({ target: unit, deltaHP: -effect.deltaHP }, hexTo);
			let action = shootProjectile(scene, hexFrom, hexTo, skill);
			action.then(() => heal.attach(scene));
			damage.attach(scene);
			return (config.wait.POPUP ? heal : action);
		},
		// Damage target, and also ones near of it.
		Explode: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let hexFrom = unit.hex;
			let hexTo = target.hex;
			let radius = 1;
			let action = shootProjectile(scene, hexFrom, hexTo, skill);
			let nova = delay(() => standardNova(scene, unit, skill, hexTo, radius, (deltaHP, steps) => floor(deltaHP / (1 + steps))));
			action.then(nova);
			return nova;
		},
		// Action for STRAIGHT
		Laser: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let { field } = scene;
			let range = unit.rangeOf(skill) || 0;

			let hexFrom = unit.hex;
			let hexTo: Hex;
			let effects: Job[] = [];
			field.straight(hexFrom, target.hex, range, hex => {
				let target = unit.getTarget(field, hex);
				if (target) {
					let effect = unit.estimate(scene, target, skill);
					let popup = scene.promiseEffect(effect, hex);
					popup.attach(scene);
					effects.push(popup);
				}
				hexTo = hex;
			});

			let color = colorOf(skill);
			let action = new Animation(400, (progress, g) => {
				let xFrom = scene.toX(hexFrom) + CELL_W / 2;
				let yFrom = scene.toY(hexFrom) + CELL_H / 2;
				let xTo = scene.toX(hexTo) + CELL_W / 2;
				let yTo = scene.toY(hexTo) + CELL_H / 2;
				let angle = atan2(yTo - yFrom, xTo - xFrom);
				let xShift = (CELL_W / 2) * cos(angle);
				let yShift = (CELL_H / 2) * sin(angle);

				g.save();
				g.beginPath();
				g.moveTo(xFrom + xShift, yFrom + yShift);
				g.lineTo(xTo + xShift, yTo + yShift);
				g.lineCap = "round";
				g.lineWidth = progress * CELL_H / 4;
				g.strokeStyle = RGBtoString(color, 1 - progress);
				g.stroke();
				g.restore();
			});
			action.attach(scene);

			if (config.wait.POPUP) {
				effects.push(action);
				return join(effects);
			} else {
				return action;
			}
		},
		// Action for SURROUND
		Nova: function (scene: Scene, unit: Unit, _target: Unit, skill: Skill): Job {
			return standardNova(scene, unit, skill, unit.hex, unit.rangeOf(skill) || 0);
		},
		// Just popup the effect.
		Dose: function (scene: Scene, unit: Unit, target: Unit, skill: Skill): Job {
			let effect = unit.estimate(scene, target, skill);
			let popup = scene.promiseEffect(effect, target.hex);
			popup.attach(scene);
			return (config.wait.POPUP ? popup : committed);
		}
	};

	function getAction(id: string): Action {
		let action = ACTIONS[id];
		if (!action) {
			throw new RangeError(`Action not found: "${id}"`);
		}
		return action;
	}

	// Check we have all actions and effects.
	if (DEBUG) {
		for (let SID in SKILLS) {
			let { action, effect } = SKILLS[SID];
			if (effect === "Aura") { continue; }
			assert(ACTIONS[action]);
			assert(EFFECTS[effect]);
		}
	}
}
