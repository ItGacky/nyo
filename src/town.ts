namespace Town {
	const TOWN_BUTTON_W: Pixel = SCREEN_W / 8;	// width of system button for town scenes
	const TOWN_BUTTON_H: Pixel = SCREEN_H / 16;	// height of of system button for town scenes
	const TOWN_SPOT_W: Pixel = SCREEN_W / 4;	// width of spot button for town home scene
	const TOWN_SPOT_H: Pixel = SCREEN_H / 8;	// height of spot button for town home scene

	const PORTRAIT_MARGIN: Pixel = MARGIN;
	const PORTRAIT_X: Pixel = MARGIN;
	const PORTRAIT_Y: Pixel = MARGIN;
	const PORTRAIT_W: Pixel = 160;
	const PORTRAIT_H: Pixel = ((SCREEN_H - PORTRAIT_Y * 2 - PORTRAIT_MARGIN * 2) / 10) * 3;

	const PORTRAIT_CHAR_W: Pixel = PORTRAIT_W - MARGIN * 2;
	const PORTRAIT_CHAR_H: Pixel = PORTRAIT_H - MARGIN * 2;

	const TOWN_LISTVIEW_X: Pixel = PORTRAIT_W * 2 + MARGIN * 3;
	const TOWN_LISTVIEW_Y: Pixel = MARGIN;
	const TOWN_LISTVIEW_W: Pixel = SCREEN_W - TOWN_LISTVIEW_X - MARGIN;

	const ROW_W_FOR_NAME: Pixel = 200;
	const ROW_W_FOR_NUBMER: Pixel = 60;

	function createColumnsForCharacters(): ListViewColumn<Character>[] {
		return [
			{
				name: _("Character", "Name"),
				extract: row => row.name,
				width: ROW_W_FOR_NAME
			},
			{
				name: _("Character", "INT"),
				extract: row => row.INT,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Character", "DEX"),
				extract: row => row.DEX,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Character", "STR"),
				extract: row => row.STR,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			}
		];
	}

	function createColumnsForItems(label: Word): ListViewColumn<Item>[] {
		return [
			{
				name: label,
				extract: row => row.name,
				width: ROW_W_FOR_NAME
			},
			{
				name: _("Town", "Tags"),
				extract: row => tags2str(row.tags)
			},
			{
				name: _("Town", "Weight"),
				extract: row => row.weight,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "ATK"),
				extract: row => row.ATK,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "DEF"),
				extract: row => row.DEF,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			}
		];
	}

	function createColumnsToSell(label: Word, data: Data): ListViewColumn<Item>[] {
		let { shop } = data;
		let columns = createColumnsForItems(label);
		columns.push({
			name: _("Town", "Stock"),
			extract: row => coalesce(shop[row.IID], _("Town", "New")),
			width: ROW_W_FOR_NUBMER,
			align: "right"
		});
		return columns;
	}

	function createColumnsToBuy(label: Word, data: Data): ListViewColumn<string>[] {
		let { shop, warehouse } = data;
		return [
			{
				name: label,
				extract: row => Item.nameOf(row).localized,
				width: ROW_W_FOR_NAME
			},
			{
				name: _("Town", "Tags"),
				extract: row => tags2str(ITEMS[row].tags)
			},
			{
				name: _("Town", "ATK"),
				extract: row => ITEMS[row].ATK,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "DEF"),
				extract: row => ITEMS[row].DEF,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "Weight"),
				extract: row => ITEMS[row].weight,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "Stock"),
				extract: row => shop[row],
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{	// TODO: warehouse でだけでなく装備中のものも数えるか？ だが、その場合、待機中のキャラクターの装備品は？
				name: _("Town", "Owned"),
				extract: row => warehouse.reduce((sum, item) => (item.IID === row ? sum + 1 : sum), 0),
				width: ROW_W_FOR_NUBMER,
				align: "right"
			}
		];
	}

	function createColumnsForSkills(label: Word): ListViewColumn<Skill>[] {
		return [
			{
				name: label,
				extract: row => row.name.localized,
				width: ROW_W_FOR_NAME
			},
			{
				name: _("Town", "Required"),
				extract: row => tags2str(row.tags)
			},
			{
				name: _("Town", "Cost"),
				extract: row => row.rawCost,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "Range"),
				extract: row => row.rawRange,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "Power"),
				extract: row => row.rawPower,
				width: ROW_W_FOR_NUBMER,
				align: "right"
			},
			{
				name: _("Town", "Spec"),
				extract: row => row.spec.localized
			}
		];
	}

	//================================================================================

	const PORTRAIT_STYLE_EMPTY: TextStyle = {
		fontSize: 64,
		fillStyle: rgb(255, 255, 255),
		strokeStyle: rgb(0, 0, 0),
		textAlign: "center",
		textBaseline: "middle",
		lineWidth: 2
	};

	class Portrait implements Drawable {
		constructor(
			public party: Optional<Character>[],
			public index: number
		) {
		}

		draw(g: CanvasRenderingContext2D, when: Timestamp, rect: XYWH): void {
			let { x, y, w, h } = rect;
			let ch = this.party[this.index];
			g.save();
			if (ch) {
				// image
				let sz = scaleProportionally(ch, PORTRAIT_CHAR_W, PORTRAIT_CHAR_H);
				ch.draw(g, when, {
					x: x + w / 2 - sz.w / 2,
					y: y + PORTRAIT_CHAR_H / 2 - sz.h / 2,
					w: sz.w,
					h: sz.h
				});
				// HP bar
				let maxHP = this.party.reduce((value, ch) => (ch ? max(value, ch.HP) : value), 1);
				let { HP } = ch;
				let xBar = x + 10;
				let wBar = w - 20;
				let hBar = 6;
				let yHP = y + h - 30;
				let wHP = (wBar - 2) * HP / maxHP;
				g.strokeStyle = "black";
				g.fillStyle = BAR_STYLE_HP.full;
				g.fillRect(xBar, yHP, wHP, hBar);
				g.strokeRect(xBar, yHP, wHP, hBar);
				// HP value
				drawTextBox(g, HP.toString(), xBar + 4, yHP - 20, wBar, 20, {
					fontSize: 20,
					fillStyle: rgb(255, 255, 255),
					strokeStyle: rgb(0, 0, 0),
					textAlign: "left",
					textBaseline: "bottom",
					lineWidth: 2
				});
				// name
				drawTextBox(g, ch.name, x, y + h - 24, w, 24, {
					fontSize: 24,
					fillStyle: rgb(255, 255, 255),
					strokeStyle: rgb(0, 0, 0),
					textAlign: "center",
					textBaseline: "bottom",
					lineWidth: 2
				});
			} else {
				drawTextBox(g, (this.index + 1).toString(), x, y, w, h, PORTRAIT_STYLE_EMPTY);
			}
			g.restore();
		}
	}

	//================================================================================

	class SceneWithSystemButtons extends Composite {
		constructor(public readonly data: Data) {
			super();
		}

		addButton(nth: number, mnemonic: KEY[], label: Word, click: Slot): Button {
			let x = SCREEN_W - (TOWN_BUTTON_W + MARGIN) * nth;
			let y = SCREEN_H - TOWN_BUTTON_H - MARGIN;
			let btn = new Button(x, y, TOWN_BUTTON_W, TOWN_BUTTON_H, new Label(label), click, mnemonic);
			btn.attach(this);
			return btn;
		}

		goTo(sceneClass: new (data: Data) => Composite): void {
			FadeOut.go(this, new sceneClass(this.data));
		}
	}

	//================================================================================

	abstract class SceneWithPortraits extends SceneWithSystemButtons {
		constructor(data: Data, bkgnd: string) {
			super(data);
			new Gallery(0, 0, SCREEN_W, SCREEN_H, new Picture(URL_SCENE + bkgnd)).attach(this);
			addConfigButton(this);

			const DH = SCREEN_H - PORTRAIT_Y - (PORTRAIT_H + PORTRAIT_MARGIN) * (PARTY_MAX / 2);
			let { party } = data;
			assert(party);
			let scene = this;
			let portraits: SwappableButton[] = [];
			for (let i = 0; i < PARTY_MAX; ++i) {
				let c = floor(i / (PARTY_MAX / 2));
				let r = i % (PARTY_MAX / 2);
				let x = PORTRAIT_X + (PORTRAIT_W + PORTRAIT_MARGIN) * (1 - c);
				let y = PORTRAIT_Y + (PORTRAIT_H + PORTRAIT_MARGIN) * r + DH * c;
				new SwappableButton(x, y, PORTRAIT_W, PORTRAIT_H, portraits,
					new Portrait(party, i),
					function(this: SwappableButton) {
						scene.onPortraitClick((this.drawable as Portrait).index);
					},
					function(this: SwappableButton, that: SwappableButton) {
						let L = this.drawable as Portrait;
						let R = that.drawable as Portrait;
						// swap index and character
						[party[L.index], party[R.index]] = [party[R.index], party[L.index]];
						[L.index, R.index] = [R.index, L.index];
					},
					[KEY.$1 + i]
				).attach(this);
			}
		}

		abstract onPortraitClick(index: number): void;
	}

	//================================================================================

	export class Home extends SceneWithPortraits {
		constructor(data: Data) {
			super(data, "town.jpg");

			const SKINS = ["grass", "moss"];
			let skin = rand(SKINS.length);

			this.addSpot(5, KEY.A, "Guild", () => { }).enabled = false;	// TODO: Training Grounds? 新しいキャラクターの作成
			this.addSpot(4, KEY.B, "Tavern", () => this.goTo(Tavern));
			this.addSpot(3, KEY.C, "Shop", () => this.goTo(Shop));		// TODO: Shop or Trading Post?
			this.addSpot(2, KEY.D, "Smith", () => { }).enabled = false;	// TODO: 武器や防具に Enchant を追加できる。
			this.addSpot(1, KEY.E, "Dungeon", () => {
				FadeOut.go(this, new Combat.Scene(data, new Combat.EndressStage(SKINS[skin], 0)));
			}).enabled = data.party.some(ch => !!ch);

			this.addButton(2, [KEY.L], _("Town", "Load"), () => {
				Dialog.confirm(this, _("Town", "ConfirmLoad"),
					{
						label: _("Town", "Load"),
						click: () => {
							let loaded = loadData();
							if (loaded) {
								FadeOut.go(this, new Home(loaded));
								logger.log(_("Town", "NotifyLoad"));
							}
						},
						mnemonic: MNEMONIC_YES
					},
					{
						label: _("Config", "Cancel"),
						mnemonic: MNEMONIC_NO
					}
				);
			});
			this.addButton(1, [KEY.S], _("Town", "Save"), () => {
				saveData(this.data);
				logger.log(_("Town", "NotifySave"));
			});
		}

		onPortraitClick(index: number) {
			let ch = this.data.party[index];
			if (ch) {
				FadeOut.go(this, new CharacterDetails(this.data, index));
			}
		}

		addSpot(nth: number, mnemonic: KEY, label: string, click: Slot): Button {
			let x = SCREEN_W - TOWN_SPOT_W - MARGIN;
			let y = SCREEN_H - TOWN_BUTTON_H - MARGIN - (TOWN_SPOT_H + MARGIN) * nth;
			let btn = new Button(x, y, TOWN_SPOT_W, TOWN_SPOT_H, new Label(_("Town", label)), click, [mnemonic]);
			btn.attach(this);
			return btn;
		}
	}

	//================================================================================

	class Tavern extends SceneWithPortraits {
		constructor(data: Data) {
			super(data, "tavern.jpg");

			function Array_overwrite<T>(lhs: T[], rhs: T[]): void {
				Array.prototype.splice.call(lhs, 0, lhs.length, ...rhs);
			}

			let savedParty = data.party.concat();
			let savedReservers = data.reservers.concat();

			this.addButton(3, [KEY.C], _("Town", "Clear"), () => {
				for (let i = 0; i < PARTY_MAX; ++i) {
					let ch = data.party[i];
					if (ch) {
						data.reservers.push(ch);
						data.party[i] = undefined;
					}
				}
			});
			this.addButton(2, [KEY.R], _("Town", "Revert"), () => {
				// NOTE: keep identities of arrays in data so that ListView and data have the same arrays.
				Array_overwrite(data.party, savedParty);
				Array_overwrite(data.reservers, savedReservers);
			});
			this.addButton(1, MNEMONIC_BACK, _("Town", "Back"), () => this.goTo(Home));

			new ListView<Character>(TOWN_LISTVIEW_X, TOWN_LISTVIEW_Y, TOWN_LISTVIEW_W, ListView.heightOf(10),
				createColumnsForCharacters(),
				data.reservers,
				(row, rowIndex) => this.onReserverClick(row, rowIndex)
			).attach(this);
		}

		onPortraitClick(index: number): void {
			let ch = this.data.party[index];
			if (ch) {
				this.data.party[index] = undefined;
				this.data.reservers.push(ch);
			}
		}

		onReserverClick(reserver: Character, index: number): void {
			for (let i = 0; i < PARTY_MAX; ++i) {
				if (!this.data.party[i]) {
					this.data.party[i] = reserver;
					this.data.reservers.splice(index, 1);
					return;
				}
			}
			logger.error(_("Town", "PartyFull"));
		}
	}

	//================================================================================

	class Shop extends SceneWithPortraits {
		constructor(data: Data) {
			super(data, "shop.jpg");
			let { shop, warehouse } = data;

			let buy = new ListView<string>(TOWN_LISTVIEW_X, TOWN_LISTVIEW_Y, TOWN_LISTVIEW_W, ListView.heightOf(10),
				createColumnsToBuy(_("Town", "Buy"), data),
				keys(shop),	// TODO: sort by default IID, or (tag, name)
				IID => {	// Buy an item
					let stock = shop[IID];
					if (stock <= 0) {
						// TODO: draw rows sold-out in gray.
						logger.error(_("Town", "SoldOut"));
						return;
					}
					let price = ITEMS[IID].price;
					if (data.gold < price) {
						logger.error(_("Town", "NoMoney"));
						return;
					}
					let item = new Item(IID);
					--shop[IID];
					warehouse.push(item);
					data.gold -= price;
					logger.log(format(_("Town", "NotifyBuy").localized, item.name, price));
				}
			);
			buy.attach(this);

			let sell = new ListView<Item>(TOWN_LISTVIEW_X, TOWN_LISTVIEW_Y, TOWN_LISTVIEW_W, ListView.heightOf(10),
				createColumnsToSell(_("Town", "Sell"), data),
				warehouse,
				(item, index) => {	// Sell an item
					let { IID } = item;
					let price = item.priceToSell;
					warehouse.splice(index, 1);
					let stock = shop[IID];
					if (stock == null) {
						// new item
						shop[IID] = 1;
						buy.rows.push(IID);
					} else {
						// known item
						shop[IID] = 1 + stock;
					}
					data.gold += price;
					logger.log(format(_("Town", "NotifySell").localized, item.name, price));
				}
			);
			sell.attach(this);

			let btnBuy: Button, btnSell: Button;
			btnBuy = this.addButton(3, [KEY.B], _("Town", "Buy"), () => {
				buy.visible = true;
				sell.visible = false;
				btnBuy.enabled = false;
				btnSell.enabled = true;
			});
			btnSell = this.addButton(2, [KEY.S], _("Town", "Sell"), () => {
				buy.visible = false;
				sell.visible = true;
				btnBuy.enabled = true;
				btnSell.enabled = false;
			});
			this.addButton(1, MNEMONIC_BACK, _("Town", "Back"), () => this.goTo(Home));

			btnBuy.onClick();
		}

		onPortraitClick(index: number): void {
			logger.log("TODO: Shop.onPortraitClick: " + index);
		}
	}

	//================================================================================

	function removeConflictedItems(items: Item[], tagbits: number): Item[] {
		let conflicted: Item[] = [];
		tagbits &= TAGBITS_ARMORS;
		if (tagbits !== 0) {
			for (let i = 0; i < items.length;) {
				if ((items[i].tagbits & tagbits) !== 0) {
					conflicted.push(items[i]);
					items.splice(i, 1);
				} else {
					++i;	// not conflicted
				}
			}
		}
		return conflicted;
	}

	class CharacterDetails extends SceneWithSystemButtons {
		constructor(data: Data, index: number) {
			super(data);
			let { warehouse, party } = data;

			let ch = party[index]!;
			assert(ch);

			let sz = scaleProportionally(ch, SCREEN_W, SCREEN_H, true);
			new Gallery(0, 0, sz.w, sz.h, ch).attach(this);	// character large image
			new Gallery(0, 0, 200, 40, new Label(`${ch.name} / Lv: ${ch.level}`)).attach(this);
			new Gallery(0, 40, 200, 40, new Label("INT: " + ch.INT)).attach(this);
			new Gallery(100, 40, 200, 40, new Label("DEX: " + ch.DEX)).attach(this);
			new Gallery(200, 40, 200, 40, new Label("STR: " + ch.STR)).attach(this);

			new Gallery(0, 80, 200, 40, new Label(() => `HP: ${ch.HP}`)).attach(this);
			new Gallery(0, 120, 200, 40, new Label(() => `SP: ${ch.SP}`)).attach(this);
			new Gallery(0, 160, 200, 40, new Label(() => `WT: ${ch.weight}/${ch.maxWeight}`)).attach(this);
			new Gallery(0, 200, 200, 40, new Label(() => `DEF: ${ch.DEF.toFixed(1)}`)).attach(this);

			let equipments = new Composite([
				new ListView<Item>(TOWN_LISTVIEW_X, TOWN_LISTVIEW_Y, TOWN_LISTVIEW_W, ListView.heightOf(10),
					createColumnsForItems(_("Town", "Equipments")),
					ch.equipments,
					(item: Item, index: number) => {	// Unequip an item
						ch.equipments.splice(index, 1);
						warehouse.push(item);
					}
				),
				new ListView<Item>(TOWN_LISTVIEW_X, SCREEN_H / 2, TOWN_LISTVIEW_W, ListView.heightOf(10),
					createColumnsForItems(_("Town", "Warehouse")),
					warehouse,
					(item: Item, index: number) => {	// Equip an item
						warehouse.splice(index, 1);
						let conflicted = removeConflictedItems(ch.equipments, item.tagbits);
						ch.equipments.push(item);
						warehouse.push.call(warehouse, ...conflicted);
					}
				)
			]);
			equipments.attach(this);

			let skills = new Composite([
				new ListView<Skill>(TOWN_LISTVIEW_X, TOWN_LISTVIEW_Y, TOWN_LISTVIEW_W, ListView.heightOf(10),
					createColumnsForSkills(_("Town", "Skills")),
					ch.skills,
					(skill, index) => {	// Unimplement a skill
						ch.skills.splice(index, 1);
						ch.known.push(skill);
					}
				),
				new ListView<Skill>(TOWN_LISTVIEW_X, SCREEN_H / 2, TOWN_LISTVIEW_W, ListView.heightOf(10),
					createColumnsForSkills(_("Town", "Knowns")),
					ch.known,
					(skill, index) => {	// Implement a skill
						ch.known.splice(index, 1);
						ch.skills.push(skill);
					}
				)
			]);
			skills.attach(this);

			let { length } = party;
			for (let i = 1; i < length; ++i) {
				let prev = (index + length - i) % length;
				if (party[prev]) {
					this.addButton(5, MNEMONIC_PREV, _("Town", "Prev"),
						() => FadeOut.go(this, new CharacterDetails(this.data, prev))
					);
					break;
				}
			}
			for (let i = 1; i < length; ++i) {
				let next = (index + i) % length;
				if (party[next]) {
					this.addButton(4, MNEMONIC_NEXT, _("Town", "Next"),
						() => FadeOut.go(this, new CharacterDetails(this.data, next))
					);
					break;
				}
			}

			let btnEquip: Button, btnSkills: Button;
			btnEquip = this.addButton(3, [KEY.E], _("Town", "Equipments"), () => {
				equipments.visible = true;
				skills.visible = false;
				btnSkills.enabled = true;
				btnEquip.enabled = false;
			});
			btnSkills = this.addButton(2, [KEY.S], _("Town", "Skills"), () => {
				equipments.visible = false;
				skills.visible = true;
				btnSkills.enabled = false;
				btnEquip.enabled = true;
			});
			this.addButton(1, MNEMONIC_BACK, _("Town", "Back"), () => this.goTo(Home));

			btnEquip.onClick();
		}
	}
}
