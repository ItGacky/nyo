// Path
const STORAGE_KEY = "NYO";
const URL_ASSETS = "assets/";
const URL_CHAR = URL_ASSETS + "char/";
const URL_SCENE = URL_ASSETS + "scene/";
const URL_LANG = URL_ASSETS + "lang/";
Word.languages["en"] = URL_LANG + "en.js";
Word.languages["ja"] = URL_LANG + "ja.js";

const enum TAG {
	MELEE,
	THROW,
	SHOOT,
	SHIELD,
	HEAD,
	BODY,
	ARMS,
	LEGS,
	SLASH,
	BLUNT,
	PIERCE,
	MAGIC,
	ALCHEMY
}

const enum TARGET {
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
	bkgnd: new Color(0, 0, 0, 0.6),
	delta: new Color(1, 0.2, 0),
	normal: new Color(0.6, 0.8, 0),
	full: new Color(0, 0.8, 0.2)
}

const BAR_STYLE_SP: UnitBarStyle = {
	bkgnd: new Color(0, 0, 0, 0.6),
	delta: new Color(0, 0.2, 0.4),
	normal: new Color(0, 0.6, 0.8),
	full: new Color(0, 0.6, 1)
}

// config.effects

interface CPU_WAIT {
	PICK: Duration;	// delay per pick
	WALK: boolean;	// wait walking animation?
	POPUP: boolean;	// wait damage popup?
}

const CPU_WAIT: CPU_WAIT[] = [
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

const MNEMONIC_OK = [KEY.TAB, KEY.ENTER, KEY.ESCAPE, KEY.SPACE];
const MNEMONIC_YES = [KEY.ENTER, KEY.SPACE, KEY.Y];
const MNEMONIC_NO = [KEY.TAB, KEY.ESCAPE, KEY.N];
const MNEMONIC_CONFIG = [KEY.ESCAPE];
const MNEMONIC_START = [KEY.ENTER, KEY.SPACE];
