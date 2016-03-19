namespace Combat {
	// Model
	const LEVEL_PER_DEPTH = 0.1;
	const BASE_FOR_LEVEL = pow(2, 0.1);	// twice power per 10 differece of levels.
	const UNIT_REGEN_ON_DEAD = 0.1;		// regenerated HP on dead.
	const UNIT_REVIVE_HP = 0.5;			// threshold to revive.

	//interface Coord extends Number { Coord; };
	type Coord = number;

	// Number of cells in field
	const MAP_W: Coord = 20;
	const MAP_H: Coord = 3;

	// Cell
	const CELL_W: Pixel = 128;
	const CELL_H: Pixel = 80;

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
	const UNIT_DYING_DURATION: Duration = 300;	// duration for dying animation.
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
		NE,
		E,
		SE,
		SW,
		W,
		NW
	}
	const DIR_BEGIN: DIR = DIR.NE;
	const DIR_END: DIR = DIR.NW + 1;

	const enum TEAM {
		ALLY,
		ENEMY
	}

	function enemyOf(team: TEAM): TEAM {
		return team === TEAM.ALLY ? TEAM.ENEMY : TEAM.ALLY;
	}

	interface SkillEffect {
		deltaHP?: number;	// changes to target's HP.
		deltaSP?: number;	// changes to target's SP.
		duration?: number;	// turns for effect over time.
		deltaHPoT?: number;	// changes over time to target's HP.
	}

	type Effect = (scene: Scene, unit: Unit, target: Unit) => SkillEffect;
	let EFFECTS: { [key: string]: Effect };

	type Action = (scene: Scene, unit: Unit, target: Unit) => Job;
	let ACTIONS: { [key: string]: Action };

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

	function same(lhs: Hex, rhs: Hex): boolean {
		return (lhs === rhs) || (!!lhs && !!rhs && lhs.xH === rhs.xH && lhs.yH === rhs.yH);
	}

	class HexMap<T> {
		private cells: { [xH: number/*Coord*/]: T[] };
		public depth: Coord;

		constructor(depth: Coord, public dummy?: T) {
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

		rawget(xH: Coord, yH: Coord): T;
		rawget(hex: Hex): T;
		rawget(xH_or_hex: Coord | Hex, yH?: Coord): T {
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
			return coalesce(this.rawget(xH, yH), this.dummy);
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
			if (line == null) {
				line = this.cells[xH] = [];
			}
			line[yH] = value;
		}

		// visit each valid cell
		each(callback: (cell: T, xH: Coord, yH: Coord) => void): void {
			let { minXH, maxXH } = this;
			for (let xH = minXH; xH < maxXH; ++xH) {
				for (let yH = 0; yH < MAP_H; ++yH) {
					callback.call(this, this.get(xH, yH), xH, yH);
				}
			}
		}

		// visit each visible cell
		eachVisible(callback: (cell: T, xH: Coord, yH: Coord) => void): void {
			let { minVisibleXH, maxVisibleXH } = this;
			for (let xH = minVisibleXH; xH < maxVisibleXH; ++xH) {
				for (let yH = 0; yH < MAP_H; ++yH) {
					callback.call(this, this.get(xH, yH), xH, yH);
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
				for (let dir = DIR_BEGIN; dir < DIR_END; ++dir) {
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
		public start: Timestamp;

		constructor(public duration: Duration) {
		}

		private sig: Signal;

		then(slot: Slot): this {
			if (this.duration == null) {
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

		getXY(unit: Unit, scene: Scene, when: Timestamp): XY {
			if (this.duration == null) {
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

		drawCharacter(unit: Unit, g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: CanvasStyle, overlayAlpha: Alpha): void {
			unit.drawCharacter(g, when, x, y, overlayStyle, overlayAlpha);
		}
	}

	class UnitEnter extends UnitState {
		constructor(DEX: number) {
			super(SCENE_TRANSIT * (13 - DEX) / 4);
		}

		onGetXY(unit: Unit, scene: Scene, progress: number): XY {
			let { hex } = unit;
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

		onGetXY(unit: Unit, scene: Scene, progress: number): XY {
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
		constructor(scene: Scene, private hexFrom: Hex, private hexTo: Hex) {
			super(duration(scene, hexFrom, hexTo));

			function duration(scene: Scene, hexFrom: Hex, hexTo: Hex): number {
				let dx = scene.toX(hexFrom) - scene.toX(hexTo);
				let dy = scene.toY(hexFrom) - scene.toY(hexTo);
				return 200 + pow(dx * dx + dy * dy, 0.3) / SCREEN_W * 1000;
			}
		}

		private hitsig: Signal;

		hit(slot: Slot): void {
			if (this.duration == null) {
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

		onGetXY(unit: Unit, scene: Scene, progress: number): XY {
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
				this.hitsig = null;
			}
			return {
				x: xFrom * (1.0 - progress) + xTo * progress + CELL_W / 2,
				y: yFrom * (1.0 - progress) + yTo * progress + CELL_H
			};
		}
	}

	class UnitStagger extends UnitState {
		radius: number;
		dying: Hex;

		constructor(unit: Unit, damage: number) {
			super(UNIT_DAMAGED_DURATION);
			assert(damage > 0);
			let { HP } = unit;
			this.dying = (damage >= HP ? unit.hex : null);
			if (damage >= HP / 2) {
				this.radius = 1;
			} else {
				this.radius = 0.5 + damage / HP;
			}
		}

		onGetXY(unit: Unit, scene: Scene, progress: number): XY {
			let radius = (1.0 - progress) * UNIT_DAMAGED_RADIUS * this.radius;
			let theta = progress * PI * this.duration / UNIT_DAMAGED_CYCLE * this.radius;
			let hex = (this.dying || unit.hex);
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
		duration: number;
		deltaHPoT?: number;
	}

	class Unit {
		public HP: number;
		public SP: number;
		public skill: Skill;	// selected active skill
		private idleOffset: number;	// 0..1
		private minCost: number;	// min cost in active skills
		effectsOverTime: EffectOverTime[];

		constructor(
			private ch: Character,
			public team: TEAM,
			public hex: Hex		// NOTICE: Do not set directly; Use Scene.setUnit instead.
		) {
			this.idleOffset = random();
			this.skill = (ch.skills.find(skill => ch.rangeOf(skill) > 0) || Skill.DUMMY);
			this.HP = this.maxHP;
			this.minCost = this.SP = this.availSP;
			for (let skill of ch.skills) {
				if (skill.isActive) {
					let cost = this.costOf(skill);
					if (cost < this.minCost) {
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

		costOf(skill: Skill): number { return this.ch.costOf(skill); }
		rangeOf(skill: Skill): number { return this.ch.rangeOf(skill); }
		powerOf(skill: Skill): number { return this.ch.powerOf(skill); }

		get cost(): number { return this.costOf(this.skill); }
		get range(): number { return this.rangeOf(this.skill); }

		getPassive(tagbits: number, action: string): number {
			let total = 0;
			for (let skill of this.ch.skills) {
				if (skill.isPassive && skill.action === action && (tagbits & skill.tagbits) !== 0) {
					total += skill.rawPower;	// TODO: Should use rawPower?
				}
			}
			return total;
		}

		getOffencePassive(tagbits: number): number { return this.getPassive(tagbits, "Offence"); }
		getDefencePassive(tagbits: number): number { return this.getPassive(tagbits, "Defence"); }

		isEnemy(other: Unit): boolean {
			return other != null && this.team !== other.team;
		}

		// Check: team
		isTarget(target: Unit): boolean {
			if (target == null) {
				return false;
			} else if (this.skill.hostile) {
				return this.isEnemy(target);
			} else {
				return this !== target && !this.isEnemy(target);
			}
		}

		done(scene: Scene): boolean {
			let { zoc } = scene;
			if (!zoc) { return false; }
			let { hex } = this;
			return !!hex && this.SP < this.minCost && this.SP < this.step + zoc[this.team].get(hex);
		}

		// Estimate effect of the current skill.
		estimate(scene: Scene, target: Unit): SkillEffect {
			assert(this.isTarget(target));
			let id = this.skill.effect;
			let effect = EFFECTS[id];
			if (effect == null) {
				throw new RangeError(`Effect not found: "${id}"`);
			}
			return effect(scene, this, target);
		}

		// Activate the current skill.
		shoot(scene: Scene, target: Unit): Job {
			assert(this.isTarget(target));
			assert(this.SP >= this.cost);
			let id = this.skill.action;
			let action = ACTIONS[id];
			if (action == null) {
				throw new RangeError(`Action not found: "${id}"`);
			}
			let job = action(scene, this, target);
			this.SP -= this.cost;
			return job;
		}

		onTurnEnd(scene: Scene): void {
			if (this.team === scene.team) {
				this.SP = this.availSP;
			}
		}

		onTurnStart(scene: Scene): Job {
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
					let popup = scene.promiseEffect(this, { deltaHP });
					popup.attach(scene);
					return popup;
				}
			}
			return null;
		}

		// screen position
		getXY(scene: Scene, when: Timestamp): XY {
			let pt: XY;
			if (this.state) {
				pt = this.state.getXY(this, scene, when);
				if (pt == null) {
					this.state = null;
				}
			}
			if (pt == null) {
				let { hex } = this;
				if (hex) {
					pt = {
						x: scene.toX(hex) + CELL_W / 2,
						y: scene.toY(hex) + CELL_H
					};
				}
			}
			return pt;
		}

		private _state: UnitState;

		get state(): UnitState {
			return this._state;
		}

		set state(value: UnitState) {
			let state = this._state;
			this._state = value;
			if (value) { value.start = now(); }
			if (state) { state.commit(); }
		}

		drawCharacter(g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: CanvasStyle, overlayAlpha: Alpha) {
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

		draw(g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlayStyle: CanvasStyle, overlayAlpha: Alpha) {
			if (this.state) {
				this.state.drawCharacter(this, g, when, x, y, overlayStyle, overlayAlpha);
			} else {
				this.drawCharacter(g, when, x, y, overlayStyle, overlayAlpha);
			}
		}

		drawBars(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene, deltaHP?: number, deltaSP?: number): void {
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
		delta: number,
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

	function drawHP(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene, unit: Unit, hex: Hex) {
		let x = scene.toX(hex) + UNIT_BAR_X;
		let y = scene.toY(hex) + UNIT_BAR_Y;
		drawBar(g, x, y, UNIT_BAR_W, UNIT_BAR_H, unit.HP, unit.maxHP, null, BAR_STYLE_HP);
	}

	function drawSP(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene, unit: Unit, hex: Hex, remainSP: number) {
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
			let { step, cost, hex } = unit;
			this.ensure(hex).SP = baseSP;
			// walk/dash
			if (baseSP >= step + zoc.get(hex)) {
				let deque: Hex[] = [];
				for (let from = hex; from; from = deque.shift()) {
					let remain = this.get(from).SP - (step + zoc.get(from));
					if (remain >= 0) {
						for (let dir = DIR_BEGIN; dir < DIR_END; ++dir) {
							let near = shift(from, dir);
							let cell = field.rawget(near);
							if (cell && cell.type === CELL.NORMAL && !unit.isEnemy(cell.unit)) {
								let r = this.ensure(near);
								if (r.SP < remain || (r.SP === remain && field.get(from).empty && !field.get(r.comeFrom).empty)) {
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
			if (baseSP >= cost) {
				expandRange.call(this, scene, unit, zoc, hex);
				this.each(({ SP }, xH, yH) => {
					if (SP >= cost && field.rawget(xH, yH).empty) {
						expandRange.call(this, scene, unit, zoc, { xH, yH });
					}
				});
			}

			function expandRange(scene: Scene, unit: Unit, zoc: ZoC, from: Hex): void {
				let { range } = unit;
				if (range >= 1) {
					let hexUnit = unit.hex;
					let { field, numScrollsPerTurn } = scene;

					function yScore(hex: Hex): number {
						return abs(hex.yH * 2 + hex.xH % 2 - MAP_H);
					}

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
							let cell = field.rawget(hex);
							let r = this.ensure(hex);
							if (r.shotFrom == null) {
								r.shotFrom = from;
								let target = cell.unit;
								if (unit.isTarget(target)) {
									r.effect = unit.estimate(scene, target);
								}
							} else if (better(r.shotFrom)) {
								r.shotFrom = from;
							}
						}
					});
				}
			}
		}

		ensure(hex: Hex): ActionResult {
			let value = this.rawget(hex);
			if (value == null) {
				value = { SP: -1 };
				this.set(value, hex);
			}
			return value;
		}

		// returns path of walking to the hex or to the shootable hex for it.
		getPath(hex: Hex, field: Field): Hex[] {
			let { effect, comeFrom, shotFrom } = this.get(hex);
			let path: Hex[];
			if (effect) {
				if (!field.get(shotFrom).empty) { return null; }
				path = [shotFrom];
				({ comeFrom } = this.get(shotFrom));
			} else if (comeFrom) {
				if (!field.get(hex).empty) { return null; }
				path = [hex];
			}
			while (comeFrom) {
				path.unshift(comeFrom);
				({ comeFrom } = this.get(comeFrom));
			}
			return path;
		}
	}

	//================================================================================

	class SkillButton extends Button {
		constructor(
			private scene: Scene,
			private index: number,
			x: Pixel, y: Pixel, w: Pixel, h: Pixel
		) {
			super(x, y, w, h, new Label(label, {
				fontSize: 20
			}), equip);

			function label(): string {
				let { focus } = scene;
				if (focus) {
					let skill = focus.skills[index];
					if (skill) {
						let range = focus.rangeOf(skill);
						if (range > 0) {
							// Active Skills
							let selected = (focus.skill === skill);
							let cost = focus.costOf(skill);
							let power = focus.powerOf(skill);
							return `${selected ? "E " : ""}${skill.name.localized}\n${cost} / ${range} / ${power > 0 ? power.toFixed(1) : "-"}`;
						} else {
							// Passive Skills
							return `${skill.name.localized}\n${skill.action === "Offence" ? "ATK" : "DEF"}: ${tags2str(skill.tags)}`;
						}
					}
				}
				return undefined;
			}

			function equip() {
				let { focus } = scene;
				if (focus) {
					let skill = focus.skills[index];
					if (skill && focus.rangeOf(skill) > 0) {
						focus.skill = skill;
						scene.onSkillChanged(focus);
					}
				}
			}
		}

		get visible(): boolean {
			let { focus } = this.scene;
			return focus != null && focus.skills[this.index] != null;
		}

		get enabled(): boolean {
			let { focus } = this.scene;
			return focus != null && focus.rangeOf(focus.skills[this.index]) > 0;
		}
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
				let unit: Unit;
				let type = CELL.NORMAL;
				if (xH > XH_ENEMY && random() < enemyRatio) {
					let name = monsters[rand(monsters.length)];
					let ch = Character.monster(name, scene.level);
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
		unit: Unit;
		hex: Hex;
		SP: number;
		maps: HexMap<ActionMap>;
		zoc: ZoC[];
	}

	interface Controller {
		visible: boolean;
		caret: Hex;
	}

	export class Scene extends Composite {
		team: TEAM = TEAM.ALLY;
		field: Field;
		dying: Unit[];
		deads: Unit[];
		snapshots: Snapshot[];
		enabled = false;

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
					field.rawget(hex).unit = unit;

					allyButtons.push(createAllyButton(this, i, unit));
				}
			}

			function createAllyButton(scene: Scene, index: number, unit: Unit): Button {
				function draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
					let { ch } = unit;
					let { x, y } = rect;
					let { w, h } = scaleProportionally(ch, rect.w, rect.h, true);
					x += (rect.w - w) / 2;
					y += (rect.h - h) / 2;
					if (unit.hex) {
						ch.draw(g, when, { x, y, w, h });
					} else {
						let ratio = unit.HP / unit.maxHP;
						if (ratio >= UNIT_REVIVE_HP) {
							ch.draw(g, when, { x, y, w, h });
						} else {
							let image = (ch.images[CharacterImage.CLOSED] || ch.images[CharacterImage.DEFAULT]);
							image.draw(g, when, { x, y, w, h });
						}
						drawTextBox(g, floor(ratio * 100).toFixed(0) + "%", rect.x, rect.y, rect.w, rect.h, {
							fillStyle: "white",
							strokeStyle: "black",
							textAlign: "center",
							textBaseline: "bottom"
						});
					}
				}
				function click() {
					if (unit.hex) {
						human.click(unit.hex);
					} else {
						if (unit.HP / unit.maxHP >= UNIT_REVIVE_HP) {
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
			defineGetSet(componentsForHuman, "visible", () => human.visible && this.focus == null);
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
			defineGetSet(componentsForFocus, "visible", () => this.focus != null);
			componentsForFocus.attach(this);

			let barsOnFocus = new Component();
			barsOnFocus.onDraw = (g, when) => this.drawBarsOnFocus(g, when, this.focus, this.controller.caret);
			barsOnFocus.attach(componentsForFocus);

			let panelForFocus = new Widget(PANEL_LX, PANEL_Y, PANEL_LW, PANEL_H);
			panelForFocus.onDraw = (g, when) => this.drawPanel(g, when, this.focus, panelForFocus);
			panelForFocus.attach(componentsForFocus);

			//========= Skills =========
			let componentsForSkills = new Composite();
			defineGetSet(componentsForSkills, "visible", () => human.visible && this.focus != null);
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
			let target = (): Unit => {
				let map = this.mapFor(this.focus);
				if (map) {
					let { caret } = this.controller;
					if (caret && map.get(caret).effect) {
						return field.get(caret).unit;
					}
				}
				return null;
			};

			let panelForTarget = new Widget(PANEL_RX, PANEL_Y, PANEL_RW, PANEL_H);
			defineGetSet(panelForTarget, "visible", () => target() != null);
			panelForTarget.onDraw = (g, when) => this.drawPanel(g, when, target(), panelForTarget);
			panelForTarget.attach(this);

			//========= Fades and Others =========
			let g = System.canvas.getContext("2d");
			new Gallery(FIELD_X, FIELD_Y, FADE_W, FIELD_H, new Box({
				fillStyle: createLinearGradient(g, FIELD_X, FIELD_Y, FIELD_X + FADE_W, FIELD_Y, FADE_FAR, FADE_NEAR)
			})).attach(this);
			new Gallery(FIELD_X + FIELD_W - FADE_W, FIELD_Y, FIELD_W, FIELD_H, new Box({
				fillStyle: createLinearGradient(g, FIELD_X + FIELD_W - FADE_W, FIELD_Y, FIELD_X + FIELD_W, FIELD_Y, FADE_NEAR, FADE_FAR)
			})).attach(this);

			addConfigButton(this);

			//========= start the combat =========
			this.startTurn();
		}

		get controller(): Controller { return this.children[this.team] as any; }
		get level(): number {
			let { level, numScrollsPerTurn } = this.stage;
			if (numScrollsPerTurn > 0) {
				level += (this.field.depth / numScrollsPerTurn) * LEVEL_PER_DEPTH;
			}
			return level;
		}
		get numScrollsPerTurn(): number { return this.stage.numScrollsPerTurn; }

		private _focus: Unit;
		private focusTime: Timestamp;

		get focus(): Unit { return this._focus; }
		set focus(value: Unit) {
			if (value == null) {
				this._focus = null;
				this.focusTime = undefined;
			} else if (this._focus !== value) {
				this._focus = value;
				this.focusTime = now();
			}
		}

		private _zoc: ZoC[];
		get zoc(): ZoC[] {
			if (!this.enabled) { return undefined; }

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

		private maps: HexMap<ActionMap>;
		mapFor(unit: Unit): ActionMap {
			if (!unit || !this.enabled) { return undefined; }

			let { maps } = this;
			if (!maps) {
				this.maps = maps = new HexMap<ActionMap>(this.field.depth);
			}
			let { hex } = unit;
			let map = maps.rawget(hex);
			if (map == null) {
				map = new ActionMap(this, unit, unit.SP);
				maps.set(map, hex);
			}
			return map;
		}

		onSkillChanged(unit: Unit): void {
			let { maps, snapshots } = this;
			if (maps) {
				maps.set(undefined, unit.hex);
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
				maps: this.maps,
				zoc: this.zoc
			});
		}

		rollback(): void {
			let snapshot = this.snapshots.pop();
			assert(snapshot != null);
			let { unit } = snapshot;
			this.setUnit(unit, snapshot.hex);
			unit.SP = snapshot.SP;
			this._zoc = snapshot.zoc;
			this.maps = snapshot.maps;
			this.focus = unit;
		}

		setUnit(unit: Unit, hex: Hex): void {
			let { field } = this;
			let cell = field.rawget(hex);
			assert(cell != null);
			let occupied = cell.unit;
			if (unit) {
				if (occupied === unit) {
					return;	// not moved at all
				}
				assert(occupied == null);
				if (unit.hex) {
					field.rawget(unit.hex).unit = null;
				}
				unit.hex = hex;
			} else if (occupied) {
				occupied.hex = null;
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
					let regen = floor(dead.maxHP * UNIT_REGEN_ON_DEAD);
					dead.HP = min(dead.maxHP, dead.HP + regen);
				}
			}
			let jobs: Job[];
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
						new FadeOut(this, new Town.Home(this.data)).attach(this.parent);
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
						if (unit.hex.xH < edge) {
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

		// Caller is responsible to check the action is valid.
		move(unit: Unit, hex: Hex): Job {
			assert(this.enabled);
			assert(!same(hex, unit.hex));

			let finish = (): void => {
				this.enabled = true;
				if (unit.done(this)) {
					this.focus = null;
				}
			};

			this.focus = unit;
			let { field } = this;
			let map = this.mapFor(unit);
			let r = map.get(hex);
			if (r.effect) {
				// wait for skill animation
				this.enabled = false;

				let target = field.get(hex).unit;
				assert(unit.SP >= unit.cost);
				assert(unit.isTarget(target));

				let shoot = (): Job => {
					this.snapshots.length = 0;
					this.invalidate();
					return unit.shoot(this, target).then(finish);
				};

				// fast path for shoot only
				if (same(r.shotFrom, unit.hex)) {
					return shoot();
				}

				// walk and shoot
				let path = map.getPath(hex, field);
				assert(path != null);
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
				assert(r.SP >= 0 && field.rawget(hex).empty);
				// walk only
				let path = map.getPath(hex, field);
				assert(path != null);
				assert(path.length > 1);
				this.setUnit(unit, hex);
				unit.SP = r.SP;
				let walk = unit.state = new UnitWalk(path);
				finish();
				return (config.wait.WALK ? walk : committed);
			}
		}

		// find units in valid cells; NOTE: eachUnit returns ones in all visible cells.
		findUnit(hex: Hex, next: boolean, filter: (unit: Unit) => boolean): Unit {
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

				let { unit } = field.rawget(xH, yH);
				if (unit && filter(unit)) { return unit; }
			}
			return null;	// not found
		}

		kill(unit: Unit): void {
			unit.HP = 0;
			this.setUnit(null, unit.hex);
			this.dying.push(unit);

			// Check any party unit remains.
			if (unit.team === TEAM.ALLY) {
				this.deads.push(unit);
				if (this.parent && this.isGameOver) {
					this.controller.visible = false;
					(unit.state || committed).then(() => {
						Dialog.confirm(this, _("Combat", "GameOver"),
							{
								label: _("Combat", "Retire"),
								click: () => {
									new FadeOut(this, new Town.Home(this.data)).attach(this.parent);
								},
								mnemonic: MNEMONIC_OK
							}
						);
					});
				}
			}
		}

		get isGameOver(): boolean {
			return this.findUnit(null, true, u => u.team === TEAM.ALLY) == null;
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

		// return an animation that deals or heals target and raises a popup on attach.
		promiseEffect(target: Unit, effect: SkillEffect, hex?: Hex): Animation {
			let deltaHP = (effect.deltaHP || 0);
			let text = abs(deltaHP).toString();
			let color = (deltaHP > 0 ? POPUP_COLOR_HEAL : POPUP_COLOR_DAMAGE);
			let popup = this.createPopup(text, color, hex || target.hex);
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
					let { duration } = effect;
					if (duration != null) {
						target.effectsOverTime.push({
							duration,
							deltaHPoT: effect.deltaHPoT
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
					callback.call(this, unit);
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
		toHex(x: Pixel, y: Pixel): Hex {
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
			return null; // out of scene
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
				// remove field scrolling out
				for (let xH = minXH1; xH < minXH2; ++xH) {
					field.deleteLine(xH);
				}
				// ensure field in display
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
			let map = this.mapFor(focus);
			if (map) {
				this.drawMarkers(g, when, this.focusTime, map, focus);
			}

			// Other components
			super.onDraw(g, when);
		}

		// Markers
		private drawMarkers(g: CanvasRenderingContext2D, when: Timestamp, startTime: Timestamp, map: ActionMap, unit: Unit) {
			let progress = Animation.clamp(when, startTime, MARKER_DURATION);
			if (progress <= 0) { return; }

			let { cost } = unit;
			const { DASH_OR_RANGE, RANGE, TARGET } = (unit.skill.hostile ? MARKER_HOSTILE : MARKER_FRIENDLY);

			g.save();
			if (progress < 1) {
				g.globalAlpha = progress;
			}
			map.eachVisible(({ effect, SP, shotFrom }, xH, yH) => {
				let markerStyle: MarkerStyle;
				let inflateW = 0;
				let inflateH = 0;
				if (effect) {
					markerStyle = TARGET;
					// XXX: change inflate animation to be repeated cycle?
					inflateW = CELL_W / 4 * (1 - progress);
					inflateH = CELL_H / 4 * (1 - progress);
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
		private drawUnits(g: CanvasRenderingContext2D, when: Timestamp, startTime: Timestamp): void {
			let { field, zoc, focus } = this;

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
			let map = this.mapFor(focus);
			let targetOverlay = ((map && focus.skill.hostile) ? UNIT_OVERLAY_HOSTILE : UNIT_OVERLAY_FRIENDLY);
			for (let {unit, x, y} of units) {
				let overlayStyle: CanvasStyle;
				if (map) {
					if (focus === unit) {
						overlayStyle = UNIT_OVERLAY_FOCUS;
					} else {
						let { hex } = unit;
						if (hex && map.get(hex).effect) {
							overlayStyle = targetOverlay;
						}
					}
				}
				unit.draw(g, when, x, y, overlayStyle, overlayAlpha);
				if (!unit.state && zoc) {
					let { hex, SP, step, cost, team } = unit;
					if (hex && SP < cost) {
						if (SP < step) {
							drawText(g, doneText, x, y, UNIT_DONE_STYLE);
						} else if (SP < step + zoc[team].get(hex)) {
							drawText(g, doneText, x, y, UNIT_BOUND_STYLE);
						}
					}
				}
			}
		}

		private drawBarsOnView(g: CanvasRenderingContext2D, when: Timestamp) {
			this.eachUnit(unit => unit.drawBars(g, when, this));
		}

		private drawBarsOnFocus(g: CanvasRenderingContext2D, when: Timestamp, unit: Unit, caret: Hex) {
			let map = this.mapFor(unit);
			if (map) {
				let { field } = this;
				map.each(({ effect }, xH, yH) => {
					if (effect) {
						field.get(xH, yH).unit.drawBars(g, when, this, effect.deltaHP, effect.deltaSP);
					}
				});
				if (caret) {
					let r = map.get(caret);
					if (r.effect) {
						let { shotFrom } = r;
						if (same(shotFrom, unit.hex)) {
							unit.drawBars(g, when, this, null, -unit.cost);
						} else {
							drawHP(g, when, this, unit, unit.hex);
							drawSP(g, when, this, unit, shotFrom, map.get(shotFrom).SP - unit.cost);
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
		}

		private drawPanel(g: CanvasRenderingContext2D, when: Timestamp, unit: Unit, rect: XYWH): void {
			if (unit) {
				drawRect(g, rect, PANEL_BKGND_STYLE[unit.team]);

				let { ch } = unit;
				let chRect = scaleProportionally(ch, UNIT_MAX_W, UNIT_MAX_H) as XYWH;
				chRect.x = rect.x + MARGIN + (CELL_W - chRect.w) / 2;
				chRect.y = rect.y + (rect.h - chRect.h) / 2;
				ch.draw(g, when, chRect);

				function toFixed(n: number): string {
					return n != null ? n.toFixed(1) : "-";
				}

				const PANEL_NAME_X: Pixel = UNIT_MAX_W + MARGIN * 2;
				const PANAL_NAME_Y: Pixel = MARGIN;
				let MVW = (unit.SP >= unit.cost ? floor((unit.SP - unit.cost) / unit.step) : "-");
				let ATK = unit.powerOf(unit.skill);
				drawText(g,
					`${unit.name} / Lv: ${toFixed(unit.level)}\n` +
					`HP: ${unit.HP} / ${unit.maxHP}\n` +
					`SP: ${unit.SP} / ${unit.maxSP}\n` +
					`MOVE: ${MVW}/${floor(unit.SP / unit.step)}\n` +
					`ATK/DEF: ${toFixed(ATK)} / ${unit.DEF.toFixed(1)}`,
					rect.x + PANEL_NAME_X, rect.y + PANAL_NAME_Y, PANEL_TEXT_STYLE
				);
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

		private _caret: Hex;
		get caret(): Hex { return this._caret; }
		set caret(value: Hex) {
			this._caret = value;
			if (this.mode === Caret.Unlocked) {
				let scene = this.parent as Scene;
				scene.focus = (value ? scene.field.get(value).unit : null);
			}
		}

		get canUndo(): boolean {
			let scene = this.parent as Scene;
			return scene.snapshots.length > 0 || this.mode >= Caret.Locked;
		}

		undo(): void {
			let scene = this.parent as Scene;
			let { snapshots } = scene;
			let { length } = snapshots;
			let unit = (length > 0 ? snapshots[length - 1].unit : null);
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

		downCaret(hex: Hex): void {
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

		upCaret(hex: Hex): void {
			this.caret = hex;
			if (!hex) { return; }

			let scene = this.parent as Scene;
			let { mode } = this;

			if (!scene.enabled || mode < Caret.Dragged) {
				return;	// keep Hover or Locked
			}

			let { focus } = scene;
			if (focus == null || scene.team !== focus.team) {
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
			} else if (r.SP >= 0 && scene.field.rawget(hex).empty) {
				// walk only, so take a snapshot to undo.
				scene.savepoint(focus);
			} else {
				// cannot shoot nor walk.
				scene.focus = null;
				this.mode = Caret.Unlocked;
				return;
			}

			this.mode = Caret.Locked;
			let job = scene.move(focus, hex);
			let checkFocus = () => {
				if (scene.focus == null) {
					this.mode = Caret.Unlocked;
				}
			};
			if (scene.enabled) {
				checkFocus();
			} else {
				job.then(checkFocus);
			}
		}

		onUp(x: Pixel, y: Pixel): void {
			this.upCaret((this.parent as Scene).toHex(x, y));
		}

		onPress(key: KEY): void {
			let scene = this.parent as Scene;
			switch (key) {
				case KEY.TAB:
				case KEY.DELETE:
				case KEY.Q:
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

			function moveCaretFor(dir: DIR) {
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

			function seek(next: boolean) {
				let scene = this.parent as Scene;
				let { caret } = this;
				let { team, focus } = scene;
				let hex = (focus ? focus.hex : caret);
				let unit = scene.findUnit(hex, next, u => u.team === team && !u.done(scene));
				if (unit) {
					scene.focus = unit;
					if (caret == null) {
						this.caret = unit.hex;
					}
					if (this._mode === Caret.Unlocked) {
						this.mode = Caret.Locked;
					}
				} else {
					logger.error(_("Combat", "UnitNotAvailable"));
				}
			}
		}

		click(hex: Hex): void {
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
					drawCaret(g, scene, caret, CARET_SELECT);
				} else if (focus) {
					let map = scene.mapFor(focus);
					if (map) {
						let r = map.get(caret);
						// Path to walk
						let path = map.getPath(caret, field);
						if (path && path.length >= 2) {
							drawPath(g, scene, path);
						}
						// Caret(s)
						if (r.effect) {
							let { skill } = focus;
							switch (skill.target) {
								case USAGE.SINGLE_HOSTILE:
									drawCaret(g, scene, caret, CARET_HOSTILE);
									break;
								case USAGE.SINGLE_FRIENDLY:
									drawCaret(g, scene, caret, CARET_FRIENDLY);
									break;
								case USAGE.STRAIGHT_HOSTILE:
									field.straight(r.shotFrom, caret, focus.range, hex => drawCaret(g, scene, hex, CARET_HOSTILE));
									break;
								case USAGE.STRAIGHT_FRIENDLY:
									field.straight(r.shotFrom, caret, focus.range, hex => drawCaret(g, scene, hex, CARET_FRIENDLY));
									break;
								case USAGE.SURROUND_HOSTILE:
									field.surround(r.shotFrom, focus.range, hex => drawCaret(g, scene, hex, CARET_HOSTILE));
									break;
								case USAGE.SURROUND_FRIENDLY:
									field.surround(r.shotFrom, focus.range, hex => drawCaret(g, scene, hex, CARET_FRIENDLY));
									break;
							}
						} else if (r.SP >= 0) {
							drawCaret(g, scene, caret, CARET_WALK);
						} else {
							drawCaret(g, scene, caret, CARET_SELECT);
						}
					}
				}
			}

			function drawCaret(g: CanvasRenderingContext2D, scene: Scene, hex: Hex, caretStyle: CaretStyle): void {
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

		caret: Hex;

		private run(ignored: Unit[]): void {
			let scene = this.parent as Scene;
			let job: Job = null;
			while (this.running) {
				if (!scene.enabled) {
					job = committed;	// should not happen, but...
				}
				if (job) {
					job.then(() => this.run(ignored));
					break;
				}
				this.caret = null;
				let unit = pick(scene, ignored);
				if (unit == null) {
					scene.endTurn();	// no more actions in this turn.
					break;
				}
				job = move.call(this, scene, unit, ignored);
			}

			interface Score {
				hex: Hex;
				score: number;
			}

			function pick(scene: Scene, ignored: Unit[]): Unit {
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
					focus = scene.findUnit(null, false, u => u.team === team && !u.done(scene));
				}
				scene.focus = focus;
				return focus;
			}

			function move(scene: Scene, unit: Unit, ignored: Unit[]): Job {
				let map = scene.mapFor(unit);
				let best = getBestMovement(scene, unit, map);
				let { hex } = best;

				// If unit cannot shoot, enter search-mode.
				if (!map.get(hex).effect && unit.SP >= unit.availSP) {
					let search = new ActionMap(scene, unit, CPU_SEARCH_SP);
					hex = getBestMovement(scene, unit, search, best).hex;
					let r = search.get(hex);
					if (r.effect) {
						hex = r.shotFrom;
					}
					let { field } = scene;
					while (hex && (map.get(hex).SP < 0 || !field.get(hex).empty)) {
						hex = search.get(hex).comeFrom;
					}
					if (hex == null) {
						hex = unit.hex;
					}
				}

				// Ignore units that don't want further actions to avoid infinite loops.
				if (same(hex, unit.hex)) {
					ignored.push(unit);
					scene.focus = null;
					return null;
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

			function getBestMovement(scene: Scene, unit: Unit, map: ActionMap, best?: Score): Score {
				let { field, numScrollsPerTurn } = scene;
				let { minXH, maxXH } = field;
				let { maxSP, hex, cost } = unit;
				let edge = minXH + numScrollsPerTurn;

				// Baseline is "noop".
				if (!best) {
					best = {
						hex: hex,
						score: scorePosition(unit, hex.xH, hex.yH, minXH, maxXH, edge) + scoreSP(unit.SP, maxSP, cost)
					};
				}
				map.each(({ SP, effect, shotFrom }, xH, yH) => {
					let score: number;
					if (effect) {
						// Walk and use skill; Score the position shot from.
						score = scorePosition(unit, shotFrom.xH, shotFrom.yH, minXH, maxXH, edge);
						// Score the shot at destionation.
						score += scoreSkill(scene, unit, xH, yH, effect);
						// Calc remaining SP.
						SP = map.get(shotFrom).SP - cost;
					} else if (SP >= 0 && field.get(xH, yH).empty) {
						// Walk only; Score the position walking to.
						score = scorePosition(unit, xH, yH, minXH, maxXH, edge);
					} else {
						return;	// Cannot pick it. "noop" also comes here.
					}
					assert(SP >= 0);

					// Bonus for remaining cost.
					score += scoreSP(SP, maxSP, cost);

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

			function scoreSP(SP: number, maxSP: number, cost: number): number {
				return CPU_SP_BONUS * SP / maxSP;
			}

			function valueOfUnit(scene: Scene, me: Unit, you: Unit): number {
				let { ch } = me;
				let best = 0;
				for (let skill of ch.skills) {
					if (ch.rangeOf(skill) > 0) {
						let power = ch.powerOf(skill);
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

			function scoreSkill(scene: Scene, me: Unit, xH: Coord, yH: Coord, effect: SkillEffect): number {
				assert(me != null);
				let you = scene.field.rawget(xH, yH).unit;
				assert(you != null);

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

	function calcDamage(scene: Scene, unit: Unit, skill: Skill, target: Unit): number {
		let { tagbits } = skill;
		let power = unit.powerOf(skill);
		let diff = unit.level + unit.getOffencePassive(tagbits) - target.level - target.getDefencePassive(tagbits);
		return ceil(power * (100 - target.DEF) / 100 * pow(BASE_FOR_LEVEL, diff));
	}

	function calcHeal(scene: Scene, unit: Unit, skill: Skill): number {
		let { tagbits } = skill;
		let power = unit.powerOf(skill);
		let diff = unit.level + unit.getOffencePassive(tagbits) - scene.level;
		return ceil(power * pow(BASE_FOR_LEVEL, diff));
	}

	EFFECTS = {
		Damage: function(scene: Scene, unit: Unit, target: Unit): SkillEffect {
			let { skill } = unit;
			return {
				deltaHP: -calcDamage(scene, unit, skill, target)
			};
		},
		// Damage to HP, and also the half to SP.
		DamageHPandSP: function(scene: Scene, unit: Unit, target: Unit): SkillEffect {
			let { skill } = unit;
			let deltaHP = -calcDamage(scene, unit, skill, target);
			return {
				deltaHP: deltaHP,
				deltaSP: floor(deltaHP / 2)
			};
		},
		DamageOverTime: function(scene: Scene, unit: Unit, target: Unit): SkillEffect {
			let { skill } = unit;
			let deltaHP = -calcDamage(scene, unit, skill, target);
			let duration = 2;
			return {
				deltaHP: deltaHP,
				duration: duration,
				deltaHPoT: floor(deltaHP / duration)
			};
		},
		Heal: function(scene: Scene, unit: Unit, target: Unit): SkillEffect {
			let { skill } = unit;
			return {
				deltaHP: calcHeal(scene, unit, skill)
			};
		},
		HealOverTime: function(scene: Scene, unit: Unit, target: Unit): SkillEffect {
			let { skill } = unit;
			let deltaHP = calcHeal(scene, unit, skill);
			let duration = 2;
			return {
				deltaHP: deltaHP,
				duration: duration,
				deltaHPoT: ceil(deltaHP / duration)
			};
		}
	};

	//================================================================================
	// Actions for Skills
	//================================================================================

	function colorOf(skill: Skill): RGB {
		let { tagbits } = skill;
		if (match(tagbits, TAG.FIRE)) {
			return { r: 255, g: 128, b: 0 };
		} else if (match(tagbits, TAG.COLD)) {
			return { r: 0, g: 128, b: 255 };
		} else if (match(tagbits, TAG.LIGHTNING)) {
			return { r: 255, g: 255, b: 0 };
		} else if (match(tagbits, TAG.LIFE)) {
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

	function rearHexOf(field: Field, from: Hex, to: Hex): Hex {
		let rearHex: Hex = undefined;
		let rearStep = distance(from, to) + 1;
		field.straight(from, to, rearStep, (hex, steps) => {
			if (steps === rearStep && field.get(hex).empty) {
				rearHex = hex;
			}
		});
		return rearHex;
	}

	function standardCharge(scene: Scene, unit: Unit, target: Unit): Job {
		let effect = unit.estimate(scene, target);
		let popup = scene.promiseEffect(target, effect);
		let action = new UnitCharge(scene, unit.hex, target.hex);
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
		center: Hex,
		range: number,
		factor?: (deltaHP: number, steps: number) => number
	): Job {
		let { field } = scene;

		let effects: Job[] = [];
		function trySkill(hex: Hex, steps: number) {
			let target = field.get(hex).unit;
			if (unit.isTarget(target)) {
				let effect = unit.estimate(scene, target);
				if (factor) {
					effect.deltaHP = factor(effect.deltaHP, steps);
				}
				let popup = scene.promiseEffect(target, effect);
				popup.attach(scene);
				effects.push(popup);
			}
		}

		trySkill(center, 0);
		field.surround(center, range, trySkill);

		let color = colorOf(unit.skill);
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

	ACTIONS = {
		// Charge tha target and come back.
		Charge: standardCharge,
		// Knockback the target.
		Knockback: function(scene: Scene, unit: Unit, target: Unit): Job {
			let { hex } = target;
			let hexTo = rearHexOf(scene.field, unit.hex, hex);
			if (hexTo == null) {
				return standardCharge(scene, unit, target);	// no space; just charge
			}

			let effect = unit.estimate(scene, target);
			let popup = scene.promiseEffect(target, effect, hexTo);
			let action = new UnitCharge(scene, unit.hex, target.hex);
			let knockback = new UnitWalk([hex, hexTo]);

			unit.state = action;
			action.hit(() => {
				scene.setUnit(target, hexTo);
				target.state = knockback;
			});
			knockback.then(() => { popup.attach(scene); });
			return (config.wait.POPUP ? join([popup, action]) : action);
		},
		// Go to behind of the target
		GoBehind: function(scene: Scene, unit: Unit, target: Unit): Job {
			let { hex } = target;
			let hexTo = rearHexOf(scene.field, unit.hex, hex);
			if (hexTo == null) {
				return standardCharge(scene, unit, target);	// no space; just charge
			}
			let hexFrom = unit.hex;
			let effect = unit.estimate(scene, target);
			let popup = scene.promiseEffect(target, effect);
			let action = new UnitWalk([hexFrom, hex]);
			scene.setUnit(unit, hexTo);
			unit.state = action;
			action.then(() => { popup.attach(scene); });
			return (config.wait.POPUP ? popup : action);
		},
		// Charge and Knockback the target.
		Trample: function(scene: Scene, unit: Unit, target: Unit): Job {
			let { hex } = target;
			let hexTo = rearHexOf(scene.field, unit.hex, hex);
			if (hexTo == null) {
				return standardCharge(scene, unit, target);	// no space; just charge
			}
			let hexFrom = unit.hex;
			let effect = unit.estimate(scene, target);
			let popup = scene.promiseEffect(target, effect, hexTo);
			let action = new UnitWalk([hexFrom, hex]);
			let knockback = new UnitWalk([hex, hex, hexTo]);	// HACK: use the first hex twice to delay animation
			scene.setUnit(target, hexTo);
			target.state = knockback;
			scene.setUnit(unit, hex);
			unit.state = action;
			knockback.then(() => { popup.attach(scene); });
			return (config.wait.POPUP ? popup : knockback);
		},
		// Shoot a projectile.
		Shoot: function(scene: Scene, unit: Unit, target: Unit): Job {
			let effect = unit.estimate(scene, target);
			let popup = scene.promiseEffect(target, effect);
			let action = shootProjectile(scene, unit.hex, target.hex, unit.skill);
			action.then(() => popup.attach(scene));
			return (config.wait.POPUP ? popup : action);
		},
		// Damage to HP, and heal the caster.
		Drain: function(scene: Scene, unit: Unit, target: Unit): Job {
			let effect = unit.estimate(scene, target);
			let damage = scene.promiseEffect(target, effect);
			let heal = scene.promiseEffect(unit, { deltaHP: -effect.deltaHP });
			let action = shootProjectile(scene, target.hex, unit.hex, unit.skill);
			action.then(() => heal.attach(scene));
			damage.attach(scene);
			return (config.wait.POPUP ? heal : action);
		},
		// Damage target, and also ones near of it.
		Explode: function(scene: Scene, unit: Unit, target: Unit): Job {
			let effect = unit.estimate(scene, target);
			let radius = 1;
			let action = shootProjectile(scene, unit.hex, target.hex, unit.skill);
			let nova = delay(() => standardNova(scene, unit, target.hex, radius, (deltaHP, steps) => floor(deltaHP / (1 + steps))));
			action.then(nova);
			return nova;
		},
		// Action for STRAIGHT
		Laser: function(scene: Scene, unit: Unit, target: Unit): Job {
			let { field } = scene;
			let { range } = unit;

			let hexFrom = unit.hex;
			let hexTo: Hex;
			let effects: Job[] = [];
			field.straight(hexFrom, target.hex, range, hex => {
				let target = field.get(hex).unit;
				if (unit.isTarget(target)) {
					let effect = unit.estimate(scene, target);
					let popup = scene.promiseEffect(target, effect);
					popup.attach(scene);
					effects.push(popup);
				}
				hexTo = hex;
			});

			let color = colorOf(unit.skill);
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
		Nova: function(scene: Scene, unit: Unit, target: Unit): Job {
			return standardNova(scene, unit, unit.hex, unit.range);
		}
	};
}
