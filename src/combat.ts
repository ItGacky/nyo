namespace Combat {
	// Number of cells in field
	const MAP_W = 20;	// (n)
	const MAP_H = 3;	// (n)

	// Cell
	const CELL_W = 128;	// (px)
	const CELL_H = 80;	// (px)

	// Panel: for unit panel
	const PANEL_W = SCREEN_W / 2;				// (px)
	const PANEL_H = CELL_H * 2;					// (px)
	const PANEL_Y = SCREEN_H - PANEL_H;			// (px)
	const PANEL_L = SCREEN_W / 2 - PANEL_W;		// (px)
	const PANEL_R = SCREEN_W / 2;				// (px)
	const PANEL_NAME_X = CELL_W;				// (px)
	const PANAL_NAME_Y = MARGIN;				// (px)

	// Buttons for system
	const COMBAT_BUTTON_W = PANEL_H - 2 * MARGIN;	// (px) width of system button for combat scene
	const COMBAT_BUTTON_H = PANEL_H - 2 * MARGIN;	// (px) height of of system button for combat scene

	// Buttons for members
	const PARTY_BUTTON_X = MARGIN;
	const PARTY_BUTTON_Y = PANEL_Y + MARGIN;
	const PARTY_BUTTON_W = 100;
	const PARTY_BUTTON_H = PANEL_H - MARGIN * 2;

	// Field: Sky + Cells + Fades
	const SKY_H = SCREEN_H - CELL_H * MAP_H * 2 - PANEL_H;	// (px)
	const FIELD_W = MAP_W * CELL_W / 2;			// (px)
	const FIELD_H = SKY_H + MAP_H * CELL_H * 2;	// (px)
	const FIELD_X = (SCREEN_W - FIELD_W) / 2;	// (px)
	const FIELD_Y = 0;							// (px)
	const FADE_W = CELL_W;						// (px)
	const FADE_NEAR = rgba(0, 0, 0, 0);			// (color string)
	const FADE_FAR = rgba(0, 0, 0, 0.75);		// (color string)
	const FIELD_SCROLL_DURATION: Duration = 400;	// duration for scroll per cell; usually takes x2 of the value.

	// Caret
	interface CaretStyle {
		inner: CanvasStyle;
		outer: CanvasStyle;
	}
	const CARET_LINE_OUTER = 7;	// (px)
	const CARET_LINE_INNER = 3;	// (px)

	const CARET /* : { [name: string]: CaretStyle } */ = {
		SELECT: {
			inner: new Color(0.9, 1, 0.7),
			outer: new Color(0.2, 0.9, 0.2)
		},
		WALK: {
			inner: new Color(0.9, 0.7, 1),
			outer: new Color(0.2, 0.2, 0.9)
		},
		HOSTILE: {
			inner: new Color(1, 0.7, 0.9),
			outer: new Color(0.9, 0.2, 0.2)
		},
		FRIENDLY: {
			inner: new Color(0.9, 0.7, 1),
			outer: new Color(0.2, 0.2, 0.9)
		}
	}

	// Marker
	const MARKER_DURATION: Duration = 300;		// duration for marker's fade-in.

	interface MarkerStyle {
		inner: Color;
		outer: Color;
		bkgnd: Color;
	}

	interface MarkerTargetStyle {
		DASH_OR_RANGE: MarkerStyle;
		RANGE: MarkerStyle;
		TARGET: MarkerStyle;
	}

	const MARKER_WALK: MarkerStyle = {
		outer: new Color(0.25, 0.75, 1),
		inner: new Color(0.7, 0.9, 1),
		bkgnd: new Color(0.25, 0.75, 1, 0.3)
	};

	const MARKER_DASH: MarkerStyle = {
		outer: new Color(1, 0.75, 0.25),
		inner: new Color(1, 0.9, 0.75),
		bkgnd: new Color(1, 0.75, 0.25, 0.3)
	};

	const MARKER_HOSTILE: MarkerTargetStyle = {
		DASH_OR_RANGE: {
			outer: new Color(1, 0.25, 0.25),
			inner: new Color(1, 0.7, 0.7),
			bkgnd: new Color(1, 0.75, 0.25, 0.3)
		},
		RANGE: {
			outer: new Color(1, 0.25, 0.25),
			inner: new Color(1, 0.7, 0.7),
			bkgnd: new Color(1, 0.5, 0.25, 0.3)
		},
		TARGET: {
			outer: new Color(1, 0.1, 0.1),
			inner: new Color(1, 0.25, 0.25),
			bkgnd: new Color(1, 0.1, 0.1, 0.3)
		}
	};

	const MARKER_FRIENDLY: MarkerTargetStyle = {
		DASH_OR_RANGE: {
			outer: new Color(0.25, 0.25, 1),
			inner: new Color(0.7, 0.7, 1),
			bkgnd: new Color(1, 0.75, 0.25, 0.3)
		},
		RANGE: {
			outer: new Color(0.25, 0.25, 1),
			inner: new Color(0.7, 0.7, 1),
			bkgnd: new Color(0.25, 0.5, 1, 0.3)
		},
		TARGET: {
			outer: new Color(0.1, 0.1, 1),
			inner: new Color(0.25, 0.25, 1),
			bkgnd: new Color(0.1, 0.1, 1, 0.3)
		}
	};

	// Unit
	const UNIT_MAX_W = CELL_W;			// (px) max width of unit image
	const UNIT_MAX_H = CELL_W;			// (px) max height of unit image
	const UNIT_IDLE_CYCLE: Duration = 200;		// cycle of unit idle animation per DEX.
	const UNIT_IDLE_LO = CELL_H / 8;	// (px)
	const UNIT_IDLE_UI = CELL_H / 4;	// (px)
	const UNIT_STEP_DURATION: Duration = 100;		// duration per step.
	const UNIT_STEP_POW = 0.75;			// duration will be reduced for many steps.
	const UNIT_DYING_DURATION: Duration = 300;	// duration for dying animation.
	const UNIT_OVERLAY_FOCUS = new Color(1, 1, 0, 0.5);	// (color)
	const UNIT_OVERLAY_HOSTILE = new Color(1, 0, 0, 0.5);	// (color)
	const UNIT_OVERLAY_FRIENDLY = new Color(0, 0, 1, 0.5);	// (color)
	const UNIT_OVERLAY_CYCLE: Duration = 1000;
	const UNIT_SHADOW_INNER = rgba(0, 0, 0, 0.65);	// (color string)
	const UNIT_SHADOW_OUTER = rgba(0, 0, 0, 0);	// (color string)
	const UNIT_SHADOW_INNER_R = 0.75;
	const UNIT_SHADOW_SCALE_Y = 0.2;
	const UNIT_DAMAGED_DURATION: Duration = 500;		// duration of stagger for damaged unit
	const UNIT_DAMAGED_CYCLE: Duration = 250;			// cycle of stagger for damaged unit
	const UNIT_DAMAGED_RADIUS = CELL_H / 4;	// (px) radius of stagger for damaged unit
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
	const PATH_RADIUS = 20;
	const PATH_WIDTH = 12;
	const PATH_STYLE = rgba(255, 0, 0, 0.8);

	// Unit.HP/SP
	const UNIT_BAR_W = CELL_W * 3 / 4;
	const UNIT_BAR_H = 6;		// (px)
	const UNIT_BAR_X = CELL_W / 2 - UNIT_BAR_W / 2;	// (px)
	const UNIT_BAR_Y = CELL_H * 3 / 4;	// (px)
	const UNIT_BAR_BORDER = 1;	// (px)

	// Popup
	const POPUP_DURATION: Duration = 600;	// duration for generic popup
	const POPUP_DY = CELL_H / 2;		// (px) Y-length of popup's run
	const POPUP_FONT_SIZE = 48;			// (px)
	const POPUP_COLOR_DAMAGE = new Color(1, 0.7, 0.7);	// (color)
	const POPUP_COLOR_HEAL = new Color(0.7, 1, 0.7);	// (color)

	// Switch
	const COMBAT_SWITCH_DURATION: Duration = 800;	// turn switch animation
	interface CombatSwitchStyle {
		messageID: string;
		bkgnd: Color;
		textStyle: TextStyle;
	}
	const COMBAT_SWITCH: CombatSwitchStyle[] = [
		{
			messageID: "PartyTurn",
			bkgnd: Color.NAVY,
			textStyle: {
				fontSize: 64,
				fillStyle: "white",
				textAlign: "center",
				textBaseline: "middle"
			}

		},
		{
			messageID: "EnemyTurn",
			bkgnd: Color.MAROON,
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
	const SKILL_X = PANEL_L + 400;
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
		PARTY,
		ENEMY
	}

	function enemyOf(team: TEAM): TEAM {
		return team === TEAM.PARTY ? TEAM.ENEMY : TEAM.PARTY;
	}

	//================================================================================
	// Hex
	//================================================================================

	//interface Coord extends Number { Coord; };
	type Coord = number;

	// Dense hex-coordinate
	class Hex {
		constructor(public xH: Coord, public yH: Coord) {
		}

		near(dir: DIR): Hex {
			const Hex_shiftX = [[1, 2, 1, -1, -2, -1], [1, 2, 1, -1, -2, -1]];
			const Hex_shiftY = [[-1, 0, 0, 0, 0, -1], [0, 0, 1, 1, 0, 0]];
			let odd = (this.xH % 2 === 0 ? 0 : 1);	// avoid minus for nagative xH.
			return new Hex(this.xH + Hex_shiftX[odd][dir], this.yH + Hex_shiftY[odd][dir]);
		}

		static distance(xH1: Coord, yH1: Coord, xH2: Coord, yH2: Coord): number {
			// dense hex to sparse hex
			let x = xH2 - xH1;
			let y = (yH2 * 2 + xH2 % 2) - (yH1 * 2 + xH1 % 2);
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

		distance(xH: Coord, yH: Coord): number;
		distance(hex: Hex): number;
		distance(xH_or_hex: Coord | Hex, yH?: Coord): number {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			return Hex.distance(this.xH, this.yH, xH, yH);
		}

		toString(): string {
			return "(" + this.xH + "," + this.yH + ")";
		}

		equals(xH: Coord, yH: Coord): boolean;
		equals(hex: Hex): boolean;
		equals(xH_or_hex: Coord | Hex, yH?: Coord): boolean {
			if (xH_or_hex == null) { return false; }
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			return this.xH === xH && this.yH === yH;
		}

		static is(lhs: Hex, rhs: Hex): boolean {
			if (lhs === rhs) {
				return true;
			} else if (lhs == null || rhs == null) {
				return false;
			} else {
				return lhs.equals(rhs);
			}
		}
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

		// true if hex is in scene.
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
			return null;
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
			let value = this.rawget(xH, yH);
			return coalesce(value, this.dummy);
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

		// visit cells straight up to range, excluding the starting hex.
		straight(from: Hex, to: Hex, range: number, callback: (hex: Hex, distance: number) => void): void {
			if (from.equals(to)) { return; }

			let distance = from.distance(to);
			let xFrom = from.xH;
			let yFrom = 1 + 2 * (from.yH * 2 + from.xH % 2);
			let xTo = to.xH;
			let yTo = 1 + 2 * (to.yH * 2 + to.xH % 2);
			let xStep = (xTo - xFrom) / distance;
			let yStep = (yTo - yFrom) / distance;

			for (let distance = 1; distance <= range; ++distance) {
				let dx = xFrom + distance * xStep;
				let dy = yFrom + distance * yStep;
				let yH2 = floor(dy / 2);
				let xH: Coord;
				if (yH2 % 2 === 0) {
					xH = 2 * floor((dx + 1) / 2);
				} else {
					xH = 2 * floor(dx / 2) + 1;
				}
				let yH = floor(yH2 / 2);
				if (this.contains(xH, yH)) {
					callback(new Hex(xH, yH), distance);
				}
			}
		}

		// visit cells surround up to range, excluding the center hex.
		surround(center: Hex, range: number, callback: (hex: Hex, distance: number) => void): void {
			if (range === 1) {
				// fast path for near
				for (let dir = DIR_BEGIN; dir < DIR_END; ++dir) {
					let hex = center.near(dir);
					if (this.contains(hex)) {
						callback(hex, 1);
					}
				}
			} if (range > 1) {
				let NE = center.near(DIR.NE);
				for (let distance = 1; distance <= range; ++distance) {
					let hex = NE;
					for (let dir of [DIR.SE, DIR.SW, DIR.W, DIR.NW, DIR.NE, DIR.E]) {
						for (let step = 0; step < distance; ++step, hex = hex.near(dir)) {
							if (this.contains(hex)) {
								callback(hex, distance);
							}
						}
					}
					NE = NE.near(DIR.NE);
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

		drawCharacter(unit: Unit, g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlay?: Color): void {
			unit.drawCharacter(g, when, x, y, overlay);
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
		static durationOf(scene: Scene, hexFrom: Hex, hexTo: Hex): number {
			let dx = scene.toX(hexFrom) - scene.toX(hexTo);
			let dy = scene.toY(hexFrom) - scene.toY(hexTo);
			return 200 + pow(dx * dx + dy * dy, 0.3) / SCREEN_W * 1000;
		}

		constructor(scene: Scene, private hexFrom: Hex, private hexTo: Hex) {
			super(UnitCharge.durationOf(scene, hexFrom, hexTo));
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
			let xFrom = scene.toX(this.hexFrom);
			let yFrom = scene.toY(this.hexFrom);
			let xTo = scene.toX(this.hexTo);
			let yTo = scene.toY(this.hexTo);
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

		drawCharacter(unit: Unit, g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlay?: Color): void {
			if (this.dying) {
				let progress = Animation.clamp(when, this.start, this.duration);
				g.save();
				g.globalAlpha = (1 - progress);
				super.drawCharacter(unit, g, when, x, y, new Color(1, 0, 0, progress));
				g.restore();
			} else {
				super.drawCharacter(unit, g, when, x, y, overlay);
			}
		}
	}

	class Unit {
		HP: number;
		SP: number;
		// TODO: ch.skills と対応したキャッシュ構造を持たせる。スキルに最適な武器や攻撃力をキャッシュしておく。
		skill: Skill;	// selected active skill
		private idleOffset: number;	// 0..1

		constructor(
			public ch: Character,
			public team: TEAM,
			public hex: Hex		// NOTICE: Do not set directly; Use Scene.setUnit instead.
		) {
			this.idleOffset = random();
			this.HP = this.maxHP;
			this.SP = this.maxSP;
			this.skill = (ch.skills.find(skill => ch.powerOf(skill) != null) || Skill.DUMMY);
		}

		toString(): string {
			return `Unit(name=${this.name}, hex=${this.hex})`;
		}

		get name(): string { return this.ch.name; }
		get maxHP(): number { return this.ch.HP; }
		get maxSP(): number { return this.ch.SP; }
		get step(): number { return this.ch.step; }
		get ZoC(): number { return this.ch.ZoC; }
		get DEF(): number { return this.ch.DEF; }

		get cost(): number { return this.ch.costOf(this.skill); }
		get range(): number { return this.ch.rangeOf(this.skill); }
		get ATK(): number { return this.ch.powerOf(this.skill); }

		get minCost(): number {
			// TODO: この値はキャッシュ可能
			return this.ch.skills.reduce((min, skill) => {
				let cost = this.ch.costOf(skill);
				return cost < min ? cost : min;
			}, this.maxSP);
		}

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

		// Check: SP, range, team
		canTargetFrom(field: Field, fromXH: Coord, fromYH: Coord, toXH: Coord, toYH: Coord): boolean {
			return this.SP >= this.cost && this.isTarget(field.get(toXH, toYH).unit) && Hex.distance(fromXH, fromYH, toXH, toYH) <= this.range;
		}

		// Check: SP, range, team
		canTarget(field: Field, hex: Hex): boolean {
			if (hex == null) { return false; }
			let {xH, yH} = this.hex;
			return this.canTargetFrom(field, xH, yH, hex.xH, hex.yH);
		}

		done(scene: Scene): boolean {
			let { hex } = this;
			return hex && this.SP < this.minCost && this.SP < this.step + scene.zoc[this.team].get(hex);
		}

		// Check: team
		trySkill(target: Unit): number {
			// TODO: これらのHP変化量の計算は、スキルごとのメソッドに転送されるべきである。
			if (!this.isTarget(target)) {
				return null;
			} else if (this.skill.hostile) {
				return -ceil(this.ATK * (100 - target.DEF) / 100);
			} else {
				return this.ATK;
			}
		}

		// Activate the current skill.
		shoot(scene: Scene, hex: Hex): Job {
			let job = ACTIONS[this.skill.action](scene, this, hex);
			this.SP -= this.cost;
			return job;
		}

		onTurnEnd(scene: Scene) {
			if (this.team === scene.team) {
				this.SP = this.maxSP;
			}
		}

		onTurnStart(scene: Scene) {
			// NOTE: Heal/Damage over time are here.
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

		drawCharacter(g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlay?: Color) {
			let { image }  = this.ch;
			let rect = scaleProportionally(image, UNIT_MAX_W, UNIT_MAX_H) as XYWH;

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
				let cycle = UNIT_IDLE_CYCLE * (12 - this.ch.DEX);
				let theta = this.idleOffset + (when % cycle) / cycle;
				let progress = max(0, sin(2 * PI * theta));
				y -= (UNIT_IDLE_UI * progress + UNIT_IDLE_LO * (1 - progress));
			}
			rect.x = x - rect.w / 2;
			rect.y = y - rect.h;
			let overlayStyle = (overlay ? overlay.rgb : null);
			let overlayAlpha = (overlay ? overlay.a : null);
			image.draw(g, when, rect, overlayStyle, overlayAlpha);
		}

		draw(g: CanvasRenderingContext2D, when: Timestamp, x: Pixel, y: Pixel, overlay?: Color) {
			if (this.state) {
				this.state.drawCharacter(this, g, when, x, y, overlay);
			} else {
				this.drawCharacter(g, when, x, y, overlay);
			}
		}

		drawHP(g: CanvasRenderingContext2D, x: Pixel, y: Pixel, deltaHP?: number): void {
			drawBar(g, x, y, UNIT_BAR_W, UNIT_BAR_H, this.HP, this.maxHP, deltaHP, BAR_STYLE_HP);
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
			g.fillRect(x + remain, y, w * (ratio - after), h)
		} else {
			g.fillStyle = (ratio >= 1 ? style.full : style.normal);
			g.fillRect(x, y, w * ratio, h);
		}
		g.restore();
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
		deltaHP?: number;	// result of skill
		shotFrom?: Hex;		// where shot from (always exists if deltaHP != null)
	}

	// HexMap of ActionResult
	class ActionMap extends HexMap<ActionResult> {
		static DUMMY: ActionResult = { SP: -1 };

		constructor(scene: Scene, unit: Unit, zoc: ZoC) {
			let { field } = scene;
			super(field.depth, ActionMap.DUMMY);
			let { step, cost, hex } = unit;
			let baseSP = unit.SP;
			this.ensure(hex).SP = baseSP;
			// walk/dash
			if (baseSP >= step + zoc.get(hex)) {
				let deque = [hex];
				do {
					let from = deque.shift();
					let remain = this.get(from).SP;
					let stepCost = step + zoc.get(from);
					if (remain >= stepCost) {
						remain -= stepCost;
						for (let dir = DIR_BEGIN; dir < DIR_END; ++dir) {
							let near = from.near(dir);
							let cell = field.rawget(near);
							if (cell && cell.type === CELL.NORMAL && !unit.isEnemy(cell.unit)) {
								let r = this.ensure(near);
								if (r.SP < remain) {
									r.SP = remain;
									r.comeFrom = from;
									if (remain >= step + zoc.get(near)) {
										deque.push(near);
									}
								}
							}
						}
					}
				} while (deque.length > 0);
			}
			// skill
			if (baseSP >= cost) {
				this.each(({ SP }, xH, yH) => {
					if (SP >= cost && field.rawget(xH, yH).empty) {
						this.expandRange(scene, unit, zoc, new Hex(xH, yH));
					}
				});
				this.expandRange(scene, unit, zoc, unit.hex);
			}
		}

		private expandRange(scene: Scene, unit: Unit, zoc: ZoC, from: Hex): void {
			let { range } = unit;
			if (range >= 1) {
				let hexUnit = unit.hex;
				let { field, numScrollsPerTurn } = scene;

				// XXX: This evaluation function can be moved to CPU class.
				let L = this.get(from);
				let zL = zoc.get(from);
				let yL = abs(from.yH * 2 + from.xH % 2 - MAP_H);
				let edge = field.minXH + numScrollsPerTurn;
				let edgeL = (from.xH < edge);
				let better = (rhs: Hex): boolean => {
					let R = this.get(rhs);
					if (L.SP > R.SP) { return true; }
					if (L.SP < R.SP) { return false; }
					let edgeR = (rhs.xH < edge);
					if (!edgeL && edgeR) { return true; }
					if (edgeL && !edgeR) { return false; }
					let zR = zoc.get(rhs);
					if (zL < zR) { return true; }
					if (zL > zR) { return false; }
					if (from.xH < rhs.xH) { return true; }
					if (from.xH > rhs.xH) { return false; }
					return yL < abs(rhs.yH * 2 + rhs.xH % 2 - MAP_H);
				}

				field.surround(from, range, hex => {
					if (!hex.equals(hexUnit)) {
						let cell = field.rawget(hex);
						let r = this.ensure(hex);
						if (r.shotFrom == null || better(r.shotFrom)) {
							r.shotFrom = from;
							if (r.deltaHP == null) {
								r.deltaHP = unit.trySkill(cell.unit);
							}
						}
					}
				});
			}
		}

		ensure(xH: Coord, yH: Coord): ActionResult;
		ensure(hex: Hex): ActionResult;
		ensure(xH_or_hex: Coord | Hex, yH?: Coord): ActionResult {
			let xH: Coord;
			if (yH == null) {
				({ xH, yH } = (xH_or_hex as Hex));
			} else {
				xH = xH_or_hex as Coord;
			}
			let value = this.rawget(xH, yH);
			if (value == null) {
				value = { SP: -1 };
				this.set(value, xH, yH);
			}
			return value;
		}

		// returns path of walking to the hex or to the shootable hex for it.
		getPath(hex: Hex): Hex[] {
			let { deltaHP, comeFrom, shotFrom } = this.get(hex);
			if (!deltaHP && !comeFrom) { return null; }
			let path: Hex[];
			if (deltaHP != null) {
				path = [shotFrom];
				({ comeFrom } = this.get(shotFrom));
			} else {
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
	// Memento
	//================================================================================

	class Memento {
		private maps: HexMap<ActionMap>;
		startTime: Timestamp;

		constructor(
			public scene: Scene,
			public zoc: ZoC[],
			public previous?: Memento
		) {
			this.maps = new HexMap<ActionMap>(scene.field.depth);
		}

		private from: Hex;	// initial hex of focus
		private SP: number;	// initial SP of focus
		private _focus: Unit;
		get focus(): Unit { return this._focus; }
		set focus(value: Unit) {
			if (value == null) {
				this._focus = null;
				this.from = undefined;
				this.SP = undefined;
				this.startTime = undefined;
			} else if (this._focus !== value) {
				this._focus = value;
				this.from = value.hex;
				this.SP = value.SP;
				this.startTime = now();
				this.ensure(value);
			}
		}

		ensure(unit: Unit): ActionMap {
			let { hex } = unit;
			let map = this.maps.rawget(hex);
			if (map == null) {
				map = new ActionMap(this.scene, unit, this.zoc[unit.team]);
				this.maps.set(map, hex);
			}
			return map;
		}

		invalidate(): void {
			assert(this.from != null);
			this.maps.set(undefined, this.from);
			this.startTime = now();
		}

		undo(scene: Scene): Memento {
			let { previous } = this;
			if (previous) {
				// restore position and SP of the unit.
				let { focus } = previous;
				scene.setUnit(focus, previous.from);
				focus.SP = previous.SP;
				return previous;
			} else if (this.focus) {
				this.focus = null;
				return this;
			} else {
				return null;
			}
		}
	}

	//================================================================================

	class SkillButton extends SwappableButton {
		private index: number;
		private scene: Scene;
		constructor(scene: Scene, x: Pixel, y: Pixel, w: Pixel, h: Pixel, group: SwappableButton[]) {
			let label = (): string => {
				let { focus } = this;
				if (focus) {
					let skill = focus.ch.skills[this.index];
					if (skill) {
						let selected = (focus.skill === skill);
						let cost = focus.ch.costOf(skill);
						let range = focus.ch.rangeOf(skill);
						let power = focus.ch.powerOf(skill);
						return `${selected ? "E " : ""}${skill.name.localized}\n${cost} / ${range} / ${power > 0 ? power.toFixed(1) : "-"}`;
					}
				}
				return undefined;
			}

			super(x, y, w, h, group, new Label(label, SkillButton.textStyle), equip, exchange);
			this.scene = scene;
			this.index = group.length - 1;

			function equip() {
				let { focus } = this as SkillButton;
				if (focus) {
					let skill = focus.ch.skills[this.index];
					if (skill && focus.ch.powerOf(skill) > 0) {
						focus.skill = skill;
						let action = this.scene.stack as Memento;
						do {
							if (action.focus === focus) {
								action.invalidate();
							}
							action = action.previous;
						} while (action);
					}
				}
			}

			function exchange(that: SwappableButton) {
				let { focus } = this as SkillButton;
				if (focus) {
					let L = this;
					let R = that as SkillButton;
					[focus.ch.skills[L.index], focus.ch.skills[R.index]] = [focus.ch.skills[R.index], focus.ch.skills[L.index]];
					[L.index, R.index] = [R.index, L.index];
				}
			}
		}

		static textStyle: TextStyle = {
			fontSize: 20
		};

		get visible(): boolean { return this.skill != null; }

		get enabled(): boolean {
			let { focus } = this;
			return focus ? focus.ch.powerOf(focus.ch.skills[this.index]) != null : null;
		}

		get focus(): Unit { return this.scene.focus; }

		get skill(): Skill {
			let { focus } = this;
			return focus ? focus.ch.skills[this.index] : null;
		}
	}

	//================================================================================
	// Stage: field generator
	//================================================================================

	export interface Stage {
		numScrollsPerTurn: number;
		generate(field: Field, xH: Coord): Cell[];
		draw(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene): void;
	}

	const ENEMY_RATIO = 0.3;

	export class EndressStage implements Stage {
		private imgSky: Picture;
		private imgCells: Picture[];

		constructor(
			skin: string,
			public numScrollsPerTurn: number = 2
		) {
			let URL_TILESET = URL_ASSETS + `level/${skin}/`;
			this.imgSky = new Picture(URL_TILESET + "sky.png");
			this.imgCells = [
				new Picture(URL_TILESET + "tile.png"),
				new Picture(URL_TILESET + "hole.png")
			];
		}

		generate(field: Field, xH: Coord): Cell[] {
			const XH_ENEMY = MAP_W - 8;
			const XH_HOLE = 6;

			let numMembers = 0;
			let numEnemies = 0;
			field.each(({ unit }) => {
				if (unit) {
					if (unit.team === TEAM.PARTY) {
						++numMembers;
					} else {
						++numEnemies;
					}
				}
			});
			let enemyRatio = (numMembers === 0 ? ENEMY_RATIO : ENEMY_RATIO * pow(1.1, numMembers - numEnemies));

			let line: Cell[] = new Array(MAP_H);
			let enemies = keys(MONSTERS);
			for (let yH = 0; yH < MAP_H; ++yH) {
				let unit: Unit;
				let type = CELL.NORMAL;
				if (xH > XH_ENEMY && random() < enemyRatio) {
					let name = enemies[rand(enemies.length)];
					let ch = Character.monster(name);
					let team = TEAM.ENEMY;
					unit = new Unit(ch, team, new Hex(xH, yH));
				} else if (xH > XH_HOLE && random() < 0.1) {
					type = CELL.HOLE;
				}
				line[yH] = new Cell(type, unit);
			}
			return line;
		}

		draw(g: CanvasRenderingContext2D, when: Timestamp, scene: Scene): void {
			let { field } = scene;

			// Sky
			g.save();
			let offsetX = field.depth * CELL_W / 2;
			g.fillStyle = this.imgSky.createPattern(g, "repeat");
			g.translate(-offsetX, 0);
			g.fillRect(FIELD_X + offsetX, FIELD_Y, FIELD_W, SKY_H);
			g.restore();

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

	export class Scene extends Composite {
		team: TEAM = TEAM.PARTY;
		field: Field;
		dying: Unit[];
		stack: Memento;

		constructor(public data: Data, public stage: Stage) {
			super();

			// Controllers must be the 1st and 2nd children.
			let human = new Human();
			human.attach(this);
			human.visible = false;
			let cpu = new CPU();
			cpu.attach(this);
			cpu.visible = false;

			// Field
			let members = data.party;
			let field = new HexMap<Cell>(0, Cell.DUMMY);
			for (let xH = field.minVisibleXH, maxXH = field.maxVisibleXH; xH < maxXH; ++xH) {
				field.setLine(xH, this.stage.generate(field, xH));
			}
			let memberButtons: Button[] = [];
			let location = [new Hex(2, 0), new Hex(2, 1), new Hex(2, 2), new Hex(1, MAP_H - 3), new Hex(1, MAP_H - 2), new Hex(1, MAP_H - 1)];
			for (let i = 0, len = location.length; i < len; ++i) {
				let ch = members[i];
				if (ch) {
					let unit = new Unit(ch, TEAM.PARTY, location[i]);
					unit.state = new UnitEnter(ch.DEX);
					field.rawget(unit.hex).unit = unit;

					memberButtons.push(createMemberButton(i, unit));
				}
			}
			this.field = field;
			this.dying = [];
			this.startTurn();

			function createMemberButton(index: number, unit: Unit): Button {
				function draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
					let { x, y } = rect;
					let { w, h } = scaleProportionally(unit.ch.image, rect.w, rect.h, true);
					x += (rect.w - w) / 2;
					y += (rect.h - h) / 2;
					unit.ch.image.draw(g, when, { x, y, w, h });
				}
				return new Button(
					PARTY_BUTTON_X + index * (PARTY_BUTTON_W + MARGIN), PARTY_BUTTON_Y, PARTY_BUTTON_W, PARTY_BUTTON_H,
					{ draw },
					() => human.click(unit.hex),
					[KEY.$1 + index]	// TODO: アイドル時以外でも選択の切り替えができるよう、Human側に移すべきかもしれない
				);
			}

			//========= Units =========
			let drawUnits = new Component();
			drawUnits.onDraw = (g, when) => this.drawUnits(g, when, this.stack.startTime);
			drawUnits.attach(this);

			// TODO: TOUCH_ONLY環境用に、マウスの右クリックを使わないで一通りの操作ができるかのテストが必要。

			//========= Human =========
			let componentsForHuman = new Composite();
			defineGetSet(componentsForHuman, "visible", () => human.visible && this.focus == null);
			componentsForHuman.attach(this);

			function createButton(
				nth: number,
				label: any,
				click: Slot,
				enabled?: () => boolean
			): Button {
				let x = SCREEN_W - (COMBAT_BUTTON_W + MARGIN) * nth;
				let y = SCREEN_H - (COMBAT_BUTTON_H + MARGIN);
				let btn = new Button(x, y, COMBAT_BUTTON_W, COMBAT_BUTTON_H, new Label(label), click);
				if (enabled) {
					defineGetSet(btn, "enabled", enabled);
				}
				return btn;
			}

			createButton(1, _("Combat", "End"), () => this.endTurn()).attach(componentsForHuman);
			createButton(2, _("Combat", "Undo"), () => this.undo(), () => this.stack.previous != null).attach(componentsForHuman);
			createButton(3, _("Combat", "Retire"), () => this.retire()).attach(componentsForHuman);

			//========= Idle =========
			let componentsForIdle = new Composite(memberButtons);
			defineGetSet(componentsForIdle, "visible", () => this.team === TEAM.PARTY && this.focus == null);
			componentsForIdle.attach(this);

			let drawOnIdle = new Component();
			drawOnIdle.onDraw = (g) => this.drawBarsOnIdle(g);
			drawOnIdle.attach(componentsForIdle);

			//========= Focus =========
			let barsOnFocus = new Component();
			barsOnFocus.onDraw = (g) => {
				let { focus } = this;
				this.drawBarsOnFocus(g, focus, this.mapFor(focus));
			};
			defineGetSet(barsOnFocus, "visible", () => this.controller.visible && this.focus != null);
			barsOnFocus.attach(this);

			let panelOnFocus = new Widget(PANEL_L, PANEL_Y, PANEL_W * 2, PANEL_H);
			panelOnFocus.onDraw = (g) => this.drawPanel(g, this.focus, panelOnFocus);
			defineGetSet(barsOnFocus, "visible", () => this.focus != null);
			panelOnFocus.attach(this);

			//========= Skills =========
			let componentsForSkills = new Composite();
			defineGetSet(componentsForSkills, "visible", () => human.visible && this.focus != null);
			componentsForSkills.attach(this);

			let skills: SwappableButton[] = [];
			for (let i = 0; i < SKILL_MAX; ++i) {
				new SkillButton(
					this,
					SKILL_X + floor(i / SKILL_ROWS) * (SKILL_W + MARGIN),
					SKILL_Y + (i % SKILL_ROWS) * (SKILL_H + MARGIN),
					SKILL_W, SKILL_H,
					skills
				).attach(componentsForSkills);
			}

			//========= Action =========
			let componentsForAciton = new Composite();
			defineGetSet(componentsForAciton, "visible", () => human.visible && human.target != null);
			componentsForAciton.attach(this);

			let panelOnAciton = new Widget(PANEL_R, PANEL_Y, PANEL_W, PANEL_H);
			panelOnAciton.onDraw = (g) => this.drawPanel(g, (this.controller as Human).target, panelOnAciton);
			panelOnAciton.attach(componentsForAciton);

			//========= Fades and others =========
			let g = System.canvas.getContext("2d");

			let fadeL = g.createLinearGradient(FIELD_X, FIELD_Y, FIELD_X + FADE_W, FIELD_Y);
			fadeL.addColorStop(0, FADE_FAR);
			fadeL.addColorStop(1, FADE_NEAR);
			new Gallery(FIELD_X, FIELD_Y, FADE_W, FIELD_H, new Box({ fillStyle: fadeL })).attach(this);

			let fadeR = g.createLinearGradient(FIELD_X + FIELD_W - FADE_W, FIELD_Y, FIELD_X + FIELD_W, FIELD_Y);
			fadeR.addColorStop(0, FADE_NEAR);
			fadeR.addColorStop(1, FADE_FAR);
			new Gallery(FIELD_X + FIELD_W - FADE_W, FIELD_Y, FIELD_W, FIELD_H, new Box({ fillStyle: fadeR })).attach(this);

			addConfigButton(this);
		}

		get controller(): Component { return this.children[this.team]; }
		get numScrollsPerTurn(): number { return this.stage.numScrollsPerTurn; }
		get focus(): Unit { return this.stack.focus; }
		set focus(value: Unit) { this.stack.focus = value; }

		private _zoc: ZoC[];
		get zoc(): ZoC[] {
			if (this._zoc == null) {
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
				this._zoc = zocs;
			}
			return this._zoc;
		}

		mapFor(unit: Unit): ActionMap {
			return (unit ? this.stack.ensure(unit) : undefined);
		}

		setUnit(unit: Unit, hex: Hex): void {
			let { field } = this;
			let cell = field.rawget(hex);
			if (cell == null) {
				throw new Error(`Cannot set unit at ${hex}: out of range`);
			}
			let occupied = cell.unit;
			if (unit) {
				if (occupied === unit) {
					return;	// not moved at all
				} else if (occupied) {
					throw new Error(`Cannot set unit at ${hex}: already exists`);
				} else if (unit.hex) {
					field.rawget(unit.hex).unit = null;
				}
				unit.hex = hex;
			} else if (occupied) {
				occupied.hex = null;
			}
			cell.unit = unit;
			this._zoc = undefined;	// invalidate ZoC cache
		}

		startTurn(): void {
			this.eachUnit(unit => { unit.onTurnStart(this); });
			this.stack = new Memento(this, this.zoc);
			this.controller.visible = true;
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
			// wait for switching animation
			this.controller.visible = false;

			this.eachUnit(unit => { unit.onTurnEnd(this); });

			if (this.team === TEAM.PARTY) {
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
					let depth_base = this.field.depth;
					new Animation(FIELD_SCROLL_DURATION * numScrollsPerTurn, (progress) => {
						this.scrollTo(depth_base + numScrollsPerTurn * progress);
					}).attach(this);

					// Check game is over
					if (this.isGameOver) { return; }
				}
			}

			// Switch turn
			this.team = enemyOf(this.team);

			// Effect on switch
			let design = COMBAT_SWITCH[this.team];
			let color = design.bkgnd;
			let innerStyle = color.rgba;
			let outerStyle = new Color(color.r, color.g, color.b, 0).rgba;
			let { textStyle } = design;
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

		public enabled = true;	// TODO: better solusions?

		move(unit: Unit, hex: Hex): Job {
			if (!this.enabled) { return null; }
			assert(!hex.equals(unit.hex));

			let finish = (previous?: Memento): void => {
				let stack = this.stack = new Memento(this, this.zoc, previous);
				if (!unit.done(this)) {
					stack.focus = unit;
				}
				this.enabled = true;
			};

			this.focus = unit;
			let { field } = this;
			let map = this.mapFor(unit);
			let r = map.get(hex);
			if (r.deltaHP != null) {
				// wait for skill animation
				this.enabled = false;

				let shoot = (): Job => unit.shoot(this, hex).then(finish);

				// fast path for shoot only
				if (unit.canTarget(field, hex)) {
					return shoot();
				}

				// walk and shoot
				let map = this.mapFor(unit);
				let path = map.getPath(hex);
				assert(path.length > 1);
				let hexWalk = path[path.length - 1];
				assert(!hexWalk.equals(hex));
				assert(!hexWalk.equals(unit.hex));
				assert(unit.canTargetFrom(field, hexWalk.xH, hexWalk.yH, hex.xH, hex.yH));
				this.setUnit(unit, hexWalk);
				unit.SP = map.get(hexWalk).SP;
				let walk = unit.state = new UnitWalk(path);
				let job = asJob(shoot);
				walk.then(job);
				return job;
			} else if (r.SP >= 0 && field.rawget(hex).empty) {
				// walk only
				let path = map.getPath(hex);
				assert(path.length > 1);
				this.setUnit(unit, hex);
				unit.SP = r.SP;
				let walk = unit.state = new UnitWalk(path);
				finish(this.stack);
				return (config.wait.WALK ? walk : committed);
			} else {
				// cannot shoot nor walk.
				return undefined;
			}
		}

		// find units in valid cells; NOTE: eachUnit returns ones in all visible cells.
		findUnit(hex: Hex, next: boolean, filter: (unit: Unit) => boolean): Unit {
			let { field } = this;
			let { minXH, maxXH } = field;
			let dx = ((this.team === TEAM.PARTY ? next : !next) ? 1 : -1);
			let dy = (next ? 1 : -1);
			let xH: Coord;
			let yH: Coord;
			if (hex) {
				({ xH, yH } = hex);
			} else {
				xH = (dx < 0 ? minXH : maxXH - 1);
				yH = (dy < 0 ? 0 : MAP_H - 1);
			}
			for (let i = 1; i < (maxXH - minXH + 1) * MAP_H; ++i) {
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

				let unit = field.rawget(xH, yH).unit;
				if (unit && filter(unit)) { return unit; }
			}
			return null;	// not found
		}

		undo(): void {
			let previous = this.stack.undo(this);
			if (previous) {
				this.stack = previous;
			} else {
				logger.error(_("Combat", "CannotUndo"));
			}
		}

		kill(unit: Unit): void {
			unit.HP = 0;
			this.setUnit(null, unit.hex);
			this.dying.push(unit);

			// Check any party unit remains.
			if (unit.team === TEAM.PARTY && this.parent && this.isGameOver) {
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

		get isGameOver(): boolean {
			return this.findUnit(null, true, u => u.team === TEAM.PARTY) == null;
		}

		createPopup(text: string, color: Color, hex: Hex): Animation {
			let x = this.toX(hex) + CELL_W / 2;
			let y = this.toY(hex) + CELL_H;
			let popup = new Animation(POPUP_DURATION);
			popup.onAnimation = (progress, g) => {
				drawText(g, text, x, y - progress * POPUP_DY, {
					fontSize: POPUP_FONT_SIZE,
					fillStyle: color,
					strokeStyle: Color.BLACK,
					globalAlpha: sin(PI * progress),
					lineWidth: 4,
					textAlign: "center",
					textBaseline: "bottom"
				});
			};
			return popup;
		}

		prepareEffect(
			target: Unit,
			deltaHP: number,
			deltaSP?: number,
			hex?: Hex
		): Animation {
			let text = abs(deltaHP).toString();
			let color = (deltaHP > 0 ? POPUP_COLOR_HEAL : POPUP_COLOR_DAMAGE);
			let popup = this.createPopup(text, color, hex || target.hex);
			let { attach } = popup;
			popup.attach = (parent: Composite) => {
				if (deltaHP < 0 || deltaSP < 0) {
					target.state = new UnitStagger(target, -deltaHP);
				}
				let r = attach.call(popup, parent);
				target.HP = clamp(0, target.maxHP, target.HP + deltaHP);
				if (deltaSP != null) {
					target.SP = clamp(0, target.maxSP, target.SP + deltaSP);
				}
				if (target.HP <= 0) {
					this.kill(target);
				}
				return r;
			}
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
					return new Hex(xH, yH);
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
					field.setLine(xH, this.stage.generate(field, xH));
				}
			}
		}

		onDraw(g: CanvasRenderingContext2D, when: Timestamp): void {
			// Stage (Sky, Cells)
			this.stage.draw(g, when, this);

			// Markers
			let { focus } = this;
			if (focus) {
				this.drawMarkers(g, when, this.stack.startTime, this.mapFor(focus), focus);
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
			map.eachVisible(({ deltaHP, SP, shotFrom }, xH, yH) => {
				let markerStyle: MarkerStyle;
				let inflateW = 0;
				let inflateH = 0;
				if (deltaHP != null) {
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
			let map = this.mapFor(focus);

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
			let overlayFocus: Color;
			let overlayHostile: Color;
			let overlayFriendly: Color;
			for (let {unit, x, y} of units) {
				let overlay: Color;
				if (focus) {
					if (focus === unit) {
						overlay = overlayFocus = (overlayFocus ? overlayFocus : colorCycle(UNIT_OVERLAY_FOCUS, when, startTime, UNIT_OVERLAY_CYCLE));
					} else {
						let { hex } = unit;
						if (hex) {
							let { deltaHP } = map.get(hex);
							if (deltaHP < 0) {
								overlay = overlayHostile = (overlayHostile ? overlayHostile : colorCycle(UNIT_OVERLAY_HOSTILE, when, startTime, UNIT_OVERLAY_CYCLE));
							} else if (deltaHP > 0) {
								overlay = overlayFriendly = (overlayFriendly ? overlayFriendly : colorCycle(UNIT_OVERLAY_FRIENDLY, when, startTime, UNIT_OVERLAY_CYCLE));
							}
						}
					}
				}
				unit.draw(g, when, x, y, overlay);
				if (unit.state == null) {
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

			function colorCycle(color: Color, when: Timestamp, startTime: Timestamp, duration: Duration): Color {
				if (color == null) {
					return null;
				} else if (startTime == null) {
					return color;
				}
				let cycle = Animation.cycle(when, startTime, duration);
				let a = (1 - cos(2 * PI * cycle)) / 2;
				if (a <= 0) {
					return null;
				} else if (1 <= a) {
					return color;
				} else {
					return new Color(color.r, color.g, color.b, color.a * a);
				}
			}
		}

		private drawBarsOnIdle(g: CanvasRenderingContext2D) {
			this.eachUnit(unit => {
				let { hex, SP, maxSP } = unit;
				let xBar = this.toX(hex) + UNIT_BAR_X;
				let yBar = this.toY(hex) + UNIT_BAR_Y;
				unit.drawHP(g, xBar, yBar);
				drawBar(g, xBar, yBar + UNIT_BAR_H, UNIT_BAR_W, UNIT_BAR_H, unit.SP, unit.maxSP, null, BAR_STYLE_SP);
			});
		}

		private drawBarsOnFocus(g: CanvasRenderingContext2D, unit: Unit, map: ActionMap) {
			let { field } = this;
			map.each(({ deltaHP }, xH, yH) => {
				if (deltaHP != null) {
					let { unit } = field.get(xH, yH);
					// TODO: unit が null なら そもそも deltaHP も存在しないでほしい
					if (unit) {
						unit.drawHP(g, this.toX(xH, yH) + UNIT_BAR_X, this.toY(xH, yH) + UNIT_BAR_Y, deltaHP);
					}
				}
			});
		}

		private drawPanel(g: CanvasRenderingContext2D, unit: Unit, rect: XYWH): void {
			if (unit) {
				g.save();
				switch (unit.team) {
					case TEAM.PARTY:
						g.fillStyle = "#000044";
						g.strokeStyle = "#CCCCFF";
						break;
					case TEAM.ENEMY:
						g.fillStyle = "#440000";
						g.strokeStyle = "#FFCCCC";
						break;
					default:
						g.fillStyle = "#004400";
						g.strokeStyle = "#CCFFCC";
						break;
				}
				fillRect(g, rect);
				strokeRect(g, rect);
				g.restore();
				unit.drawCharacter(g, null, rect.x + CELL_W / 2, rect.y + rect.h - UNIT_IDLE_LO);

				function toFixed(n: number): string {
					return n != null ? n.toFixed(1) : "-";
				}

				g.save();
				g.fillStyle = "#FFFFFF";
				g.textAlign = "left";
				g.textBaseline = "top";
				g.fillText(unit.name, rect.x + PANEL_NAME_X, rect.y + PANAL_NAME_Y);
				g.fillText(`HP: ${unit.HP} / ${unit.maxHP}`, rect.x + PANEL_NAME_X, rect.y + PANAL_NAME_Y + 30);
				let MVW = (unit.SP >= unit.cost ? floor((unit.SP - unit.cost) / unit.step) : "-");
				g.fillText(`SP: ${unit.SP} / ${unit.maxSP}`, rect.x + PANEL_NAME_X, rect.y + PANAL_NAME_Y + 60);
				g.fillText(`MOVE: ${MVW}/${floor(unit.SP / unit.step)}`, rect.x + PANEL_NAME_X, rect.y + PANAL_NAME_Y + 90);
				g.fillText(`ATK/DEF: ${toFixed(unit.ATK)} / ${unit.DEF.toFixed(1)}`, rect.x + PANEL_NAME_X, rect.y + PANAL_NAME_Y + 120);
				g.restore();
			}
		}
	}

	//================================================================================
	// Human
	//================================================================================

	const enum Caret {
		Unlocked,	// focus tracks units on caret.
		Lock,		// assume focus is valid. focus won't change.
		Drag,		// assume focus is valid. drag newly focused unit, and lock on up.
		DragAgain	// assume focus is valid. drag already focused unit, and unlock on up.
	}

	class Human extends Component {
		private caret: Hex;

		private _mode: Caret = Caret.Unlocked;
		private get mode(): Caret {
			// need to check focus because focus could be lost on undo.
			if (this._mode !== Caret.Unlocked && (this.parent as Scene).focus == null) {
				this._mode = Caret.Unlocked;
			}
			return this._mode;
		}
		private set mode(value: Caret) {
			this._mode = value;
		}

		get target(): Unit {
			if (this.mode >= Caret.Lock) {
				let { caret } = this;
				if (caret) {
					let scene = this.parent as Scene;
					let { focus } = scene;
					let { unit } = scene.field.get(caret);
					if (focus && focus.isTarget(unit) && scene.mapFor(focus).get(caret).shotFrom) {
						return unit;
					}
				}
			}
			return null;
		}

		moveCaretTo(hex: Hex): void {
			this.caret = hex;
			if (this.mode === Caret.Unlocked) {
				let scene = this.parent as Scene;
				scene.focus = (hex ? scene.field.get(hex).unit : null);
			}
		}

		onHover(x: Pixel, y: Pixel): void {
			this.moveCaretTo((this.parent as Scene).toHex(x, y));
		}

		onDrag(x: Pixel, y: Pixel): void {
			this.moveCaretTo((this.parent as Scene).toHex(x, y));
		}

		downCaret(hex: Hex): void {
			this.caret = hex;
			if (hex) {
				this.mode = doDown(this.parent as Scene, this.mode, hex);
			}

			function doDown(scene: Scene, mode: Caret, hex: Hex): Caret {
				let { focus } = scene;
				if (focus) {
					if (focus.team === scene.team && !focus.done(scene)) {
						if (mode === Caret.Lock && hex.equals(focus.hex)) {
							return Caret.DragAgain;
						} else {
							return Caret.Drag;
						}
					}
				} else {
					let { unit } = scene.field.get(hex);
					scene.focus = unit;
					if (unit) {
						return Caret.Drag;
					}
				}
				return Caret.Unlocked;
			}
		}

		onDown(x: Pixel, y: Pixel): void {
			this.downCaret((this.parent as Scene).toHex(x, y));
		}

		upCaret(hex: Hex): void {
			this.caret = hex;
			if (hex) {
				this.mode = doUp(this.parent as Scene, this.mode, hex);
			}

			function doUp(scene: Scene, mode: Caret, hex: Hex): Caret {
				if (mode < Caret.Drag) {
					return mode;	// keep Hover or Locked
				}

				let { focus } = scene;
				if (focus == null || scene.team != focus.team) {
					return Caret.Unlocked;	// click on enemy
				}

				if (hex.equals(focus.hex)) {
					if (mode === Caret.Drag) {
						return Caret.Lock;
					} else { // enemy or DragAgain
						return Caret.Unlocked;
					}
				}

				if (!scene.move(focus, hex)) {
					scene.focus = null;
					return Caret.Unlocked;
				} else if (scene.focus) {
					return Caret.Lock;
				} else {
					return Caret.Unlocked;
				}
			}
		}

		onUp(x: Pixel, y: Pixel): void {
			this.upCaret((this.parent as Scene).toHex(x, y));
		}

		onPress(key: KEY): void {
			let scene = this.parent as Scene;
			switch (key) {
				case KEY.TAB:
				case KEY.Q:
					scene.undo();
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
					let hex = caret.near(dir);
					if (field.contains(hex)) {
						this.moveCaretTo(hex);
					}
				} else {
					this.moveCaretTo(new Hex(field.minXH, 0));
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
						this.mode = Caret.Lock;
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
					drawCaret(g, scene, caret, CARET.SELECT);
				} else if (focus && focus.team === scene.team) {
					let map = scene.mapFor(focus);
					let r = map.get(caret);
					// Path to walk
					let path = map.getPath(caret);
					if (path && path.length >= 2) {
						drawPath(g, scene, path);
					}
					// Caret(s)
					if (r.deltaHP != null) {
						let { skill } = focus;
						switch (skill.target) {
							case TARGET.SINGLE_HOSTILE:
								drawCaret(g, scene, caret, CARET.HOSTILE);
								break;
							case TARGET.SINGLE_FRIENDLY:
								drawCaret(g, scene, caret, CARET.FRIENDLY);
								break;
							case TARGET.STRAIGHT_HOSTILE:
								field.straight(r.shotFrom, caret, skill.range, hex => drawCaret(g, scene, hex, CARET.HOSTILE));
								break;
							case TARGET.STRAIGHT_FRIENDLY:
								field.straight(r.shotFrom, caret, skill.range, hex => drawCaret(g, scene, hex, CARET.FRIENDLY));
								break;
							case TARGET.SURROUND_HOSTILE:
								field.surround(r.shotFrom, skill.range, hex => drawCaret(g, scene, hex, CARET.HOSTILE));
								break;
							case TARGET.SURROUND_FRIENDLY:
								field.surround(r.shotFrom, skill.range, hex => drawCaret(g, scene, hex, CARET.FRIENDLY));
								break;
						}
					} else if (r.SP >= 0) {
						drawCaret(g, scene, caret, CARET.WALK);
					} else {
						drawCaret(g, scene, caret, CARET.SELECT);
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

				let xPrev = scene.toX(path[path.length - 2]) + CELL_W / 2;
				let yPrev = scene.toY(path[path.length - 2]) + CELL_H / 2;
				let xLast = scene.toX(path[path.length - 1]) + CELL_W / 2;
				let yLast = scene.toY(path[path.length - 1]) + CELL_H / 2;
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

	// TODO: Support units with multiple skills.
	// TODO: Support skills other than targeting hostile single.
	// TODO: 複数ターンに渡る最適化のサポート。障害物の回り込みや遠くの標的に近づくため、いったんスコアが下がる選択ができるように。

	const CPU_X_BONUS = 10;			// positional bonus for X-axis per cell X (max<200)
	const CPU_Y_BONUS = 10;			// positional bonus for Y-axis per cell X (max=20)
	const CPU_SP_BONUS = 40;		// bonus for remaining SP.
	const CPU_SKILL_BONUS = 400;	// bonus on using skill.
	const CPU_DAMAGE_BONUS = 600;	// bonus on dealing damage.
	const CPU_FAVOR_EDGE = 0.1;		// factor for edge of map (<1 means avoid edge)

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

	function scoreSkill(field: Field, unit: Unit, xH: Coord, yH: Coord, deltaHP: number): number {
		assert(unit != null);
		let score = CPU_SKILL_BONUS;
		let target = field.rawget(xH, yH).unit;
		let DMG = -target.trySkill(unit);
		let { HP } = target;
		let myDMG = -deltaHP;
		let myMHP = unit.maxHP;
		if (DMG > 0 && myDMG > 0) {
			if (HP <= myDMG) {
				// can kill this attack; bonus for dealt damage.
				score += CPU_DAMAGE_BONUS * max(1, DMG / myMHP);
			} else {
				// cannnot kill this attack; bonus for dealt damage and dealing damage.
				score += CPU_DAMAGE_BONUS * max(1, DMG / myMHP) * max(1, myDMG / HP);
			}
		}
		return score;
	}

	class CPU extends Component {
		private running = false;
		get visible() { return this.running; }
		set visible(value: boolean) {
			this.running = value;
			if (value) { committed.then(() => this.run([])); }
		}

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
				let unit = pick(scene, ignored);
				if (unit == null) {
					scene.endTurn();	// no more actions in this turn.
					break;
				}
				job = move(scene, unit, ignored);
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
				let { field, numScrollsPerTurn } = scene;
				let map = scene.mapFor(unit);
				let { minXH, maxXH } = field;
				let { maxSP, hex, cost } = unit;
				let edge = minXH + numScrollsPerTurn;

				// Baseline is "noop".
				let hexBest = hex;
				let scoreBest = scorePosition(unit, hex.xH, hex.yH, minXH, maxXH, edge) + scoreSP(unit.SP, maxSP, cost);

				map.each(({ SP, deltaHP, shotFrom }, xH, yH) => {
					let score: number;
					if (deltaHP != null) {
						// Walk and use skill; Score the position shot from.
						score = scorePosition(unit, shotFrom.xH, shotFrom.yH, minXH, maxXH, edge);
						// Score the shot at destionation.
						score += scoreSkill(field, unit, xH, yH, deltaHP);
						// Calc remaining SP.
						SP = map.get(shotFrom).SP - cost;
					} else if (SP >= 0 && field.rawget(xH, yH).empty) {
						// Walk only; Score the position walking to.
						score = scorePosition(unit, xH, yH, minXH, maxXH, edge);
					} else {
						return;	// Cannot pick it. "noop" also comes here.
					}
					assert(SP >= 0);

					// Bonus for remaining cost.
					score += scoreSP(SP, maxSP, cost);

					if (scoreBest < score) {
						scoreBest = score;
						hexBest = new Hex(xH, yH);
					}
				});

				// Ignore units don't want further more actions but still have SPs to avoid infinite loops.
				if (hexBest.equals(hex)) {
					ignored.push(unit);
					scene.focus = null;
					return null;
				}

				// Reset ignored list.
				ignored.length = 0;
				let { PICK } = config.wait;
				if (PICK > 0) {
					let job = asJob(() => scene.move(unit, hexBest));
					new Animation(PICK).then(job).attach(scene);	// just delay
					return job;
				} else {
					return scene.move(unit, hexBest);
				}
			}
		}
	}

	//================================================================================
	// Actions for Skills
	//================================================================================

	function rearHexOf(field: Field, from: Hex, to: Hex): Hex {
		let rearHex: Hex = undefined;
		let rearDistance = from.distance(to) + 1;
		field.straight(from, to, rearDistance, (hex, distance) => {
			if (distance === rearDistance && field.get(hex).empty) {
				rearHex = hex;
			}
		});
		return rearHex;
	}

	function shootProjectile(scene: Scene, hexFrom: Hex, hexTo: Hex, innerStyle: string, outerStyle: string) {
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

	function standardShoot(scene: Scene, unit: Unit, target: Unit, effect: Animation, innerStyle: string, outerStyle: string) {
		let action = shootProjectile(scene, unit.hex, target.hex, innerStyle, outerStyle);
		action.then(() => { effect.attach(scene) });

		return (config.wait.POPUP ? effect : action);
	}

	function standardNova(
		scene: Scene,
		unit: Unit,
		center: Hex,
		range: number,
		outerColor: Color,
		factor?: (deltaHP: number, distance: number) => number
	): Job {
		let { field } = scene;

		let effects: Job[] = [];
		function trySkill(hex: Hex, distance: number) {
			let target = field.get(hex).unit;
			if (unit.isTarget(target)) {
				let deltaHP = unit.trySkill(target);
				if (factor) {
					deltaHP = factor(deltaHP, distance);
				}
				let effect = scene.prepareEffect(target, deltaHP);
				effect.attach(scene);
				effects.push(effect);
			}
		}

		trySkill(center, 0);
		field.surround(center, range, trySkill);

		let action = new Animation(400, (progress, g) => {
			let x = scene.toX(center) + CELL_W / 2;
			let y = scene.toY(center) + CELL_H / 2;
			let w = range * CELL_W * progress;
			let h = range * CELL_H * progress;
			let innerStyle = new Color(outerColor.r, outerColor.g, outerColor.b, outerColor.a * (1 - progress)).rgba;
			let outerStyle = new Color(outerColor.r, outerColor.g, outerColor.b, 0).rgba;
			fillRadialGradient(g, x - w, y - h, w * 2, h * 2, innerStyle, outerStyle, progress);
		});
		action.attach(scene);

		if (config.wait.POPUP) {
			effects.push(action);
			return new ParallelJob(effects);
		} else {
			return action;
		}
	}

	type Action = (scene: Scene, unit: Unit, hex: Hex) => Job;

	const ACTIONS: { [key: string]: Action } = {
		// Charge tha target and come back.
		Charge: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);
			let effect = scene.prepareEffect(target, deltaHP);
			let action = new UnitCharge(scene, unit.hex, target.hex);

			unit.state = action;
			action.hit(() => { effect.attach(scene); });
			return (config.wait.POPUP ? new ParallelJob([effect, action]) : action);
		},
		// Knockback the target.
		Knockback: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;

			let hexTo: Hex = rearHexOf(field, unit.hex, hex);
			if (hexTo == null) {
				return ACTIONS["Charge"](scene, unit, hex);	// no space; just charge
			}

			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);
			let effect = scene.prepareEffect(target, deltaHP, null, hexTo);
			let action = new UnitCharge(scene, unit.hex, target.hex);
			let knockback = new UnitWalk([hex, hexTo]);

			unit.state = action;
			action.hit(() => {
				scene.setUnit(target, hexTo);
				target.state = knockback;
			});
			knockback.then(() => { effect.attach(scene); });
			return (config.wait.POPUP ? new ParallelJob([effect, action]) : action);
		},
		// Go to behind of the target
		GoBehind: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;

			let hexTo: Hex = rearHexOf(field, unit.hex, hex);
			if (hexTo == null) {
				return ACTIONS["Charge"](scene, unit, hex);	// no space; just charge
			}

			let hexFrom = unit.hex;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);

			let effect = scene.prepareEffect(target, deltaHP);
			let action = new UnitWalk([hexFrom, hex]);

			scene.setUnit(unit, hexTo);
			unit.state = action;
			action.then(() => { effect.attach(scene); });
			return (config.wait.POPUP ? effect : action);
		},
		// Charge and Knockback the target.
		Trample: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;

			let hexTo: Hex = rearHexOf(field, unit.hex, hex);
			if (hexTo == null) {
				return ACTIONS["Charge"](scene, unit, hex);	// no space; just charge
			}

			let hexFrom = unit.hex;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);

			let effect = scene.prepareEffect(target, deltaHP, null, hexTo);
			let action = new UnitWalk([hexFrom, hex]);
			let knockback = new UnitWalk([hex, hex, hexTo]);	// HACK: use the first hex twice to delay animation

			scene.setUnit(target, hexTo);
			target.state = knockback;
			scene.setUnit(unit, hex);
			unit.state = action;
			knockback.then(() => { effect.attach(scene); });
			return (config.wait.POPUP ? effect : knockback);
		},
		// Shoot a projectile.
		Shoot: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);
			return standardShoot(scene, unit, target, scene.prepareEffect(target, deltaHP), rgb(255, 128, 0), rgba(255, 128, 0, 0));
		},
		// Damage to HP, and also the half to SP.
		Freeze: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);
			let deltaSP = floor(deltaHP / 2);
			return standardShoot(scene, unit, target, scene.prepareEffect(target, deltaHP, deltaSP), rgb(0, 128, 255), rgba(0, 128, 255, 0));
		},
		// Damage to HP, and heal the caster.
		Drain: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);

			let damage = scene.prepareEffect(target, deltaHP);
			let heal = scene.prepareEffect(unit, -deltaHP)
			let action = shootProjectile(scene, target.hex, unit.hex, rgb(255, 0, 128), rgba(255, 0, 128, 0));
			action.then(() => { heal.attach(scene) });
			damage.attach(scene);

			return (config.wait.POPUP ? heal : action);
		},
		// Damage target, and also ones near of it.
		Explode: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;
			let target = field.get(hex).unit;
			let deltaHP = unit.trySkill(target);

			let action = shootProjectile(scene, unit.hex, target.hex, rgb(255, 128, 0), rgba(255, 128, 0, 0));
			let nova = asJob(() => standardNova(scene, unit, hex, 1, new Color(1, 0.5, 0), (deltaHP, distance) => floor(deltaHP / (1 + distance))));
			action.then(nova);

			return nova;
		},
		// Action for STRAIGHT
		Laser: function(scene: Scene, unit: Unit, hex: Hex): Job {
			let { field } = scene;
			let { range } = unit.skill;

			let hexFrom = unit.hex;
			let hexTo: Hex;
			let effects: Job[] = [];
			field.straight(hexFrom, hex, range, hex => {
				let target = field.get(hex).unit;
				if (unit.isTarget(target)) {
					let deltaHP = unit.trySkill(target);
					let effect = scene.prepareEffect(target, deltaHP);
					effect.attach(scene);
					effects.push(effect);
				}
				hexTo = hex;
			});

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
				g.strokeStyle = new Color(1, 0.5, 0, 1 - progress).rgba;
				g.stroke();
				g.restore();
			});
			action.attach(scene);

			if (config.wait.POPUP) {
				effects.push(action);
				return new ParallelJob(effects);
			} else {
				return action;
			}
		},
		// Aciton for SURROUND
		Nova: function(scene: Scene, unit: Unit, hex: Hex): Job {
			return standardNova(scene, unit, unit.hex, unit.skill.range, new Color(1, 0.5, 0), (deltaHP, distance) => floor(deltaHP / distance));
		}
	};
}
