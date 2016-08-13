interface ConfigArchive {
	language: string;
	magnifyCanvas: boolean;
	refineCanvas: boolean;
	volume: number;
	effects: number;
}

let reset: Slot;

config = new class implements Config {
	volume: Integer;
	effects: Integer;

	constructor() {
		this.volume = new Integer(50, 0, 100);
		this.effects = new Integer(CPU_WAIT.length - 1, 0, CPU_WAIT.length - 1);
	}

	private _magnifyCanvas: boolean = false;
	get magnifyCanvas() { return this._magnifyCanvas; }
	set magnifyCanvas(value: boolean) {
		if (this._magnifyCanvas !== value) {
			this._magnifyCanvas = value;
			window.dispatchEvent(new CustomEvent("resize"));
		}
	}

	private _refineCanvas: boolean = false;
	get refineCanvas() { return this._refineCanvas; }
	set refineCanvas(value: boolean) {
		if (this._refineCanvas !== value) {
			this._refineCanvas = value;
			window.dispatchEvent(new CustomEvent("resize"));
		}
	}

	get wait(): EfeectConfig { return CPU_WAIT[this.effects.value]; }
};

//================================================================================

function addConfigButton(parent: Composite): Button {
	const CONFIG_ICON_PATH = URL_ASSETS + "config.png";
	const CONFIG_ICON_OVERLAY: CanvasStyle = "white";
	const CONFIG_ICON_X = 4;
	const CONFIG_ICON_Y = 4;
	const CONFIG_ICON_W = 32;
	const CONFIG_ICON_H = 32;

	const CONFIG_CAPTION_STYLE: TextStyle = {
		fillStyle: "white",
		strokeStyle: "black",
		fontSize: 44,
		textAlign: "center",
		textBaseline: "middle"
	};
	const CONFIG_CAPTION_Y = 20;
	const CONFIG_CAPTION_H = 80;

	const CONFIG_LABEL_X = SCREEN_W / 2;
	const CONFIG_LABEL_Y = 100;
	const CONFIG_LABEL_W = 160;
	const CONFIG_LABEL_H = 60;
	const CONFIG_LABEL_STYLE: TextStyle = {
		textAlign: "right",
		textBaseline: "middle"
	};

	const CONFIG_CONTROL_X = CONFIG_LABEL_X + CONFIG_LABEL_W + MARGIN;

	const CONFIG_SLIDER_W = 300;
	const CONFIG_SLIDER_H = 30;
	const CONFIG_SLIDER_VALUE_W = 50;
	const CONFIG_SLIDER_STYLE: TextStyle = {
		textAlign: "right",
		textBaseline: "middle"
	};

	const CONFIG_BUTTON_W = 100;
	const CONFIG_BUTTON_H = CONFIG_LABEL_H;

	let button = new Button(CONFIG_ICON_X, CONFIG_ICON_Y, CONFIG_ICON_W, CONFIG_ICON_H,
		new Picture(CONFIG_ICON_PATH),
		dialog,
		MNEMONIC_CONFIG,
		new Button.IconDesign(CONFIG_ICON_OVERLAY)
	);
	button.attach(parent);
	return button;

	function dialog() {
		let self = new Dialog();

		new Gallery(0, 0, SCREEN_W, SCREEN_H, new Box(DLG_BKGND_STYLE)).attach(self);
		new Gallery(0, CONFIG_CAPTION_Y, SCREEN_W, CONFIG_CAPTION_H, new Label(_("Config", "Caption"), CONFIG_CAPTION_STYLE)).attach(self);

		let MODAL_BUTTON_W = SCREEN_W / 4;
		let MODAL_BUTTON_X = (SCREEN_W - MODAL_BUTTON_W) / 2;
		new Button(MODAL_BUTTON_X, CONFIRM_BUTTON_Y, MODAL_BUTTON_W, CONFIRM_BUTTON_H,
			new Label(_("Config", "OK")), () => self.detach(),
			MNEMONIC_OK
		).attach(self);

		let languages = keys(Word.languages).sort().map(lang => _("Language", lang));
		let lang = new ListView<Word>(10, 10, 160, ListView.heightOf(min(10, languages.length)), [
			{
				name: _("Config", "LanguageID"),
				extract: row => row.src[1],
				width: 40,
				align: "center"
			},
			{
				name: _("Config", "LanguageName"),
				extract: row => row.localized
			}
		],
			languages,
			row => {
				lang.selected = row;
				Word.language = row.src[1];
			}
		);
		lang.selected = lang.rows.find(o => o.src[1] === Word.language);
		lang.attach(self);

		addSlider(0, _("Config", "Volume"), config.volume);
		addSlider(1, _("Config", "CPUEffects"), config.effects);

		let on = _("Config", "On");
		let off = _("Config", "Off");

		addToggleButton(2, _("Config", "MagnifyCanvas"), on, off,
			() => config.magnifyCanvas,
			() => { config.magnifyCanvas = !config.magnifyCanvas; }
		);
		addToggleButton(3, _("Config", "RefineCanvas"), on, off,
			() => config.refineCanvas,
			() => { config.refineCanvas = !config.refineCanvas; }
		);

		addButton(4, _("Config", "BackToTitle"),
			() => {
				self.detach();
				reset();
			}
		);

		self.attach(parent);

		function addLabel(index: number, label: Word): number {
			let y = CONFIG_LABEL_Y + (CONFIG_LABEL_H + MARGIN) * index;
			new Gallery(CONFIG_LABEL_X, y, CONFIG_LABEL_W, CONFIG_LABEL_H, new Label(label, CONFIG_LABEL_STYLE)).attach(self);
			return y;
		}

		function addSlider(index: number, label: Word, value: Integer): Slider {
			let y = addLabel(index, label);
			let slider = new Slider(CONFIG_CONTROL_X, y + (CONFIG_LABEL_H - CONFIG_SLIDER_H) / 2, CONFIG_SLIDER_W, CONFIG_SLIDER_H, value);
			slider.attach(self);
			new Gallery(CONFIG_CONTROL_X + CONFIG_SLIDER_W + MARGIN, y, CONFIG_SLIDER_VALUE_W, CONFIG_LABEL_H, new Label(value, CONFIG_SLIDER_STYLE)).attach(self);
			return slider;
		}

		function addToggleButton(index: number, label: Word, on: Word, off: Word, value: () => boolean, click: Slot): Button {
			let y = addLabel(index, label);
			let button = new Button(CONFIG_CONTROL_X, y + (CONFIG_LABEL_H - CONFIG_BUTTON_H) / 2, CONFIG_BUTTON_W, CONFIG_BUTTON_H,
				new Label(() => {
					let b = value();
					if (button.pressed && button.hover) { b = !b; }
					return (b ? on : off).localized;
				}),
				click
			);
			button.attach(self);
			return button;
		}

		function addButton(index: number, label: Word, click: Slot): Button {
			let y = CONFIG_LABEL_Y + (CONFIG_LABEL_H + MARGIN) * index;
			let button = new Button(CONFIG_CONTROL_X, y + (CONFIG_LABEL_H - CONFIG_BUTTON_H) / 2, CONFIG_SLIDER_W, CONFIG_BUTTON_H,
				new Label(label),
				click
			);
			button.attach(self);
			return button;
		}
	}
}

//================================================================================

System.main = function(canvas: HTMLCanvasElement, _resume: boolean): void {
	let dummy = new Image();
	dummy.src = URL_ASSETS + "dummy.png";
	Picture.DUMMY = dummy;

	let root = new Composite();

	// TODO: If resume === true, should restore components. It requires deserialize from class name.
	//root.children = fromJSON(Component, parse(System.getLocalStorage(CHECKPOINT_KEY)));

	let scene = new Composite();
	scene.attach(root);
	let log = new ScreenLogger(LOG_X, LOG_Y, LOG_W, LOG_H, LOG_DURATION, LOG_STYLE);
	log.attach(root);
	logger = log;

	reset = function() {
		for (;;) {
			let { children } = scene;
			let { length } = children;
			if (length === 0) { break; }
			children[length - 1].detach();
		}
		new FadeIn(new Title.Scene()).attach(scene);
	};

	loadConfig();

	reset();
	run(canvas, root, config);

	System.checkpoint = function(): void {
		saveConfig();
		// TODO: This should save components. It requires serialize with class name.
		//System.setLocalStorage(CHECKPOINT_KEY, stringify( { root: toJSON(root.children) } ));
	};
};

//================================================================================

function newData(): Data {
	let shop: IID2Stock = {};
	for (let IID in ITEMS) {
		let stock = rand(4);
		if (stock > 0) {
			shop[IID] = stock;
		}
	}
	let data: Data = {
		shop: shop,
		warehouse: [],
		reservers: [
		],
		party: [
			Character.adventurer("Knight"),
			Character.adventurer("Warrior"),
			Character.adventurer("Samurai"),
			Character.adventurer("Mage"),
			Character.adventurer("Healer"),
			Character.adventurer("Thief")
		],
		gold: 1000
	};
	data.party[0]!.equipments[0].enchants.push(Enchant.from("AddedFire"));
	return data;
}

function loadData(): Optional<Data> {
	try {
		let value = System.getRoamingStorage(STORAGE_KEY);
		if (!value) { return undefined; }
		let json = parse(value) as DataArchive;
		return {
			shop: json.shop || {},
			warehouse: fromJSON(Item, json.warehouse),
			reservers: fromJSON(Character, json.reservers),
			party: fromJSON(Character, json.party),
			gold: json.gold || 0
		};
	} catch (e) {
		logger.error(e);
		return undefined;
	}
}

function saveData(data: Data): void {
	try {
		System.setRoamingStorage(STORAGE_KEY, stringify(data));
	} catch (e) {
		logger.error(e);
	}
	saveConfig();
}

function deleteData(): void {
	try {
		System.setRoamingStorage(STORAGE_KEY, undefined);
	} catch (e) {
		logger.error(e);
	}
}

function loadConfig(): void {
	try {
		let value = System.getLocalStorage(STORAGE_KEY);
		if (value) {
			let sys = parse(value) as ConfigArchive;
			if (sys) {
				Word.language = overwrite(Word.language, sys.language);
				config.magnifyCanvas = overwrite(config.magnifyCanvas, sys.magnifyCanvas);
				config.refineCanvas = overwrite(config.refineCanvas, sys.refineCanvas);
				config.volume.value = overwrite(config.volume.value, sys.volume);
				config.effects.value = overwrite(config.effects.value, sys.effects);
			}
		}
	} catch (e) {
		logger.error(e);
	}

	function overwrite<T>(defaultValue: T, newValue: any): T {
		return (typeof defaultValue === typeof newValue) ? newValue : defaultValue;
	}
}

function saveConfig(): void {
	try {
		let sys: ConfigArchive = {
			language: Word.language,
			magnifyCanvas: config.magnifyCanvas,
			refineCanvas: config.refineCanvas,
			volume: config.volume.value,
			effects: config.effects.value
		};
		System.setLocalStorage(STORAGE_KEY, stringify(sys));
	} catch (e) {
		logger.error(e);
	}
}
