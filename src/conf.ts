// Path
const STORAGE_KEY = "NYO";
const URL_ASSETS = "assets/";
const URL_CHAR = URL_ASSETS + "char/";
const URL_SCENE = URL_ASSETS + "scene/";
Word.path = URL_ASSETS + "lang/";
Word.languages["en"] = undefined;
Word.languages["ja"] = undefined;

const MNEMONIC_CONFIG = [KEY.ESCAPE];
const MNEMONIC_START = [KEY.ENTER, KEY.SPACE];
const MNEMONIC_BACK = [KEY.BACKSPACE, KEY.TAB, KEY.ESCAPE, KEY.DELETE];
const MNEMONIC_PREV = [KEY.PAGE_UP, KEY.HOME, KEY.LEFT, KEY.UP];
const MNEMONIC_NEXT = [KEY.PAGE_DOWN, KEY.END, KEY.RIGHT, KEY.DOWN];

const MNEMONIC_OK = MNEMONIC_START.concat(MNEMONIC_BACK);
const MNEMONIC_YES = MNEMONIC_START.concat(KEY.Y);
const MNEMONIC_NO = MNEMONIC_BACK.concat(KEY.N);

enum TAG {
	// Weapon Attributes
	Melee,
	Throw,
	Shoot,
	Magic,
	Alchemy,
	Slash,
	Blunt,
	Pierce,
	// Armor Parts
	Shield,
	Head,
	Body,
	Arms,
	Legs,
	// Effect Types
	Fire,
	Cold,
	Lightning,
	Life,
	//
	MAX
}

const enum USAGE {
	PASSIVE,
	DOSE,
	SINGLE_HOSTILE,
	SINGLE_FRIENDLY,
	STRAIGHT_HOSTILE,
	STRAIGHT_FRIENDLY,
	SURROUND_HOSTILE,
	SURROUND_FRIENDLY
}

interface UnitBarStyle {
	bkgnd: CanvasStyle;
	delta: CanvasStyle;
	normal: CanvasStyle;
	full: CanvasStyle;
}

const BAR_STYLE_HP: UnitBarStyle = {
	bkgnd: rgba(0, 0, 0, 0.6),
	delta: rgb(255, 51, 0),
	normal: rgb(153, 204, 0),
	full: rgb(0, 204, 51)
};

const BAR_STYLE_SP: UnitBarStyle = {
	bkgnd: rgba(0, 0, 0, 0.6),
	delta: rgb(0, 51, 102),
	normal: rgb(0, 153, 204),
	full: rgb(0, 153, 255)
};

interface EfeectConfig {
	readonly PICK: Duration;	// delay per pick
	readonly WALK: boolean;		// wait walking animation?
	readonly POPUP: boolean;	// wait damage popup?
}

const CPU_WAIT: EfeectConfig[] = [
	{
		PICK: 0,
		WALK: false,
		POPUP: false
	},
	{
		PICK: 0,
		WALK: false,
		POPUP: true
	},
	{
		PICK: 0,
		WALK: true,
		POPUP: true
	},
	{
		PICK: 300,	// NOTE: see also Combat.MARKER_DURATION
		WALK: true,
		POPUP: true
	}
];

interface Config extends CanvasConfig {
	readonly volume: Integer;
	readonly effects: Integer;
	readonly wait: EfeectConfig;
}

let config: Config;
let logger: Logger;
