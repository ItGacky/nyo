namespace Title {
	// Title
	const TITLE_START_W = SCREEN_W / 4;
	const TITLE_START_H = SCREEN_H / 10;
	const TITLE_START_X = SCREEN_W / 2 - TITLE_START_W / 2;
	const TITLE_START_Y = SCREEN_H - TITLE_START_H * 3;

	const TITLE_QUIT_W = SCREEN_W / 4;
	const TITLE_QUIT_H = SCREEN_H / 10;
	const TITLE_QUIT_X = SCREEN_W / 2 - TITLE_START_W / 2;
	const TITLE_QUIT_Y = SCREEN_H - TITLE_QUIT_H * 3 / 2;

	const TITLE_DELETE_W = 200;
	const TITLE_DELETE_H = 60;
	const TITLE_DELETE_X = SCREEN_W - TITLE_DELETE_W - MARGIN;
	const TITLE_DELETE_Y = SCREEN_H - TITLE_DELETE_H - MARGIN;

	export class Scene extends Composite {
		constructor() {
			super();
			new Gallery(0, 0, SCREEN_W, SCREEN_H, new Picture(URL_SCENE + "title.jpg")).attach(this);

			let loaded = loadData();
			let goTown = (data: Data) => FadeOut.go(this, new Town.Home(data));

			let label: Word;
			let click: Slot;
			if (loaded) {
				label = _("Title", "Continue");
				click = () => goTown(loaded!);		// FIXME: retandant ! for bug in strictNullChecks
				new Button(TITLE_DELETE_X, TITLE_DELETE_Y, TITLE_DELETE_W, TITLE_DELETE_H, new Label(_("Title", "Delete")), () => {
					Dialog.confirm(this, _("Title", "ConfirmDelete"),
						{
							label: _("Title", "Delete"),
							click: () => {
								deleteData();
								FadeOut.go(this, new Scene());
								logger.log(_("Title", "NotifyDelete"));
							},
							mnemonic: MNEMONIC_YES
						},
						{
							label: _("Config", "Cancel"),
							mnemonic: MNEMONIC_NO
						}
					);
				}).attach(this);
			} else {
				label = _("Title", "New");
				click = () => {
					let data = newData();
					saveData(data);
					goTown(data);
				};
			}
			new Button(TITLE_START_X, TITLE_START_Y, TITLE_START_W, TITLE_START_H, new Label(label), click, MNEMONIC_START).attach(this);
			new Button(TITLE_QUIT_X, TITLE_QUIT_Y, TITLE_QUIT_W, TITLE_QUIT_H, new Label(_("Title", "Quit")), System.exit).attach(this);
			addConfigButton(this);
		}
	}
}
