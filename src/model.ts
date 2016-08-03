type Gold = number;
type Weight = number;

const PARTY_MAX = 6;	// maximum number of active party members.
const SKILL_MAX = 6;	// maximum number of active skills per character.
const ITEM_DISCOUNT_TO_SELL = 0.5;

//================================================================================
// Tag
//================================================================================

let TAG2NAME: Word[];

function tags2str(tags: TAG[]): string {
	if (!TAG2NAME) {
		// NOTE: Order of tag names must match with TAG.
		TAG2NAME = [
			_("Tag", "Melee"),
			_("Tag", "Throw"),
			_("Tag", "Shoot"),
			_("Tag", "Magic"),
			_("Tag", "Alchemy"),
			_("Tag", "Slash"),
			_("Tag", "Blunt"),
			_("Tag", "Pierce"),
			_("Tag", "Shield"),
			_("Tag", "Head"),
			_("Tag", "Body"),
			_("Tag", "Arms"),
			_("Tag", "Legs"),
			_("Tag", "Fire"),
			_("Tag", "Cold"),
			_("Tag", "Lightning"),
			_("Tag", "Life")
		];
	}
	return tags.map(tag => TAG2NAME[tag].localized).join(", ");
}

function tags2bits(tags: TAG[]): number {
	let bits = 0;
	for (let tag of tags) {
		bits |= (1 << tag);
	}
	return bits;
}

const TAGBITS_WEAPON = tags2bits([TAG.MELEE, TAG.THROW, TAG.SHOOT, TAG.MAGIC, TAG.ALCHEMY, TAG.SLASH, TAG.BLUNT, TAG.PIERCE]);
const TAGBITS_ARMORS = tags2bits([TAG.SHIELD, TAG.HEAD, TAG.BODY, TAG.ARMS, TAG.LEGS]);

//================================================================================
// Target
//================================================================================

function isHostile(target: USAGE): boolean {
	switch (target) {
		case USAGE.SINGLE_FRIENDLY:
		case USAGE.STRAIGHT_FRIENDLY:
		case USAGE.SURROUND_FRIENDLY:
			return false;
		default:
			return true;
	}
}

//================================================================================
// Enchant
//================================================================================

type EnchantID = string;

interface EnchantArchive {
	EID: EnchantID;
	value: number;
}

class Enchant implements ToJSON<EnchantArchive> {
	private def: EnchantDef;
	private value: number;
	public name: Word;
	public spec: Word;

	constructor(public EID: EnchantID) {
		this.def = ENCHANTS[EID];
		if (!this.def) {
			throw new RangeError(`Enchantment not found: "${EID}"`);
		}
		this.name = Enchant.nameOf(EID);
		this.spec = Enchant.specOf(EID);
		this.value = this.def.min + rand(this.def.max - this.def.min);
	}

	qualify(name: string): string {
		return format(this.name.localized, name);
	}

	modify(ATK: number): number {
		if (this.def.ATK) {
			ATK = this.def.ATK(this.value, ATK);
		}
		return ATK;
	}

	static nameOf(EID: EnchantID): Word {
		return _("Enchant", EID, "Name");
	}

	static specOf(EID: EnchantID): Word {
		return _("Enchant", EID, "Spec");
	}

	static from(EID: EnchantID): Enchant {
		return new Enchant(EID);
	}

	static fromJSON(o: EnchantArchive): Enchant {
		return new Enchant(o.EID);
	}

	toJSON(): EnchantArchive {
		return {
			EID: this.EID,
			value: this.value
		};
	}
}

//================================================================================
// Item
//================================================================================

type ItemID = string;

interface ItemArchive {
	IID: ItemID;
	enchants: EnchantArchive[];
}

class Item implements ToJSON<ItemArchive> {
	private def: ItemDef;
	public baseName: Word;
	public spec: Word;
	public tagbits: number;
	public enchants: Enchant[];

	constructor(
		public IID: ItemID,
		enchants?: Enchant[]
	) {
		this.def = ITEMS[IID];
		if (!this.def) {
			throw new RangeError(`Item not found: "${IID}"`);
		}
		this.baseName = Item.nameOf(IID);
		this.spec = Item.specOf(IID);
		this.tagbits = tags2bits(this.def.tags);
		if (enchants) {
			this.enchants = enchants;
		} else if (this.def.enchants) {
			this.enchants = this.def.enchants.map(Enchant.from);
		} else {
			this.enchants = [];
		}
	}

	// qualified name
	get name(): string {
		let value = this.baseName.localized;
		for (let e of this.enchants) {
			value = e.qualify(value);
		}
		return value;
	}

	get tags() { return this.def.tags; }
	get weight() { return this.def.weight; }

	get priceToSell(): Gold {
		let value = this.def.price;
		for (let e of this.enchants) {
			value = e.modify(value);
		}
		return floor(value);
	}

	get ATK() {
		let value = (this.def.ATK || 0);
		for (let e of this.enchants) {
			value = e.modify(value);
		}
		return value;
	}

	get DEF() {
		let value = (this.def.DEF || 0);
		for (let e of this.enchants) {
			value = e.modify(value);
		}
		return value;
	}

	static nameOf(IID: ItemID): Word {
		return _("Item", IID, "Name");
	}

	static specOf(IID: ItemID): Word {
		return _("Item", IID, "Spec");
	}

	static from(IID: ItemID): Item {
		return new Item(IID);
	}

	static fromJSON(o: ItemArchive): Item {
		return new Item(
			o.IID,
			fromJSON(Enchant, o.enchants, never)
		);
	}

	toJSON(): ItemArchive {
		return {
			IID: this.IID,
			enchants: toJSON(this.enchants, never)
		};
	}
}

//================================================================================
// Skill
//================================================================================

type SkillID = string;

interface SkillArchive {
	SID: SkillID;
	// TODO: skill levels and modifiers
}

class Skill implements ToJSON<SkillArchive> {
	private def: SkillDef;
	public name: Word;
	public spec: Word;
	public tagbits: number;

	constructor(public SID: SkillID) {
		this.def = SKILLS[SID];
		if (!this.def) {
			throw new RangeError(`Skill not found: "${SID}"`);
		}
		this.name = Skill.nameOf(SID);
		this.spec = Skill.specOf(SID);
		this.tagbits = tags2bits(this.def.tags);
	}

	get tags() { return this.def.tags; }
	get rawCost() { return this.def.cost; }
	get rawRange() { return this.def.range; }
	get rawPower() { return this.def.power; }
	get usage() { return this.def.usage; }
	get hostile() { return isHostile(this.def.usage); }
	get effect() { return this.def.effect; }
	get action() { return this.def.action; }

	get isActive(): boolean { return this.effect !== "Aura"; }
	get isPassive(): boolean { return this.effect === "Aura"; }

	match(item: Item): boolean {
		let required = (this.tagbits & TAGBITS_WEAPON);
		return (required & item.tagbits) === required;
	}

	static nameOf(SID: SkillID): Word {
		return _("Skill", SID, "Name");
	}

	static specOf(SID: SkillID): Word {
		return _("Skill", SID, "Spec");
	}

	static from(SID: SkillID): Skill {
		return new Skill(SID);
	}

	static fromJSON(o: SkillArchive): Skill {
		return new Skill(o.SID);
	}

	toJSON(): SkillArchive {
		return {
			SID: this.SID
		};
	}

	static DUMMY = new Skill("Dummy");
}

//================================================================================
// Character
//================================================================================

interface CharacterArchive {
	name: string;
	level: number;
	INT: number;
	DEX: number;
	STR: number;
	equipments: ItemArchive[];
	skills: SkillArchive[];
	known: SkillArchive[];
	image: string;
}

const BLINK_SEQUENCE = [1, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 1];
const BLINK_DURATION: Duration = 450;
const BLINK_CYCLE: Duration = 4500;
const BLINK_CYCLE_PER_INT: Duration = 100;

enum CharacterImage {
	DEFAULT,
	BLINK_1,
	BLINK_2,
	BLINK_3,
	BLINK_4,
	CLOSED,
	DEAD
}

// TODO: 装備変更までキャッシュ可能な値について、必要性を確認する。
class Character implements ToJSON<CharacterArchive>, WH {
	images: Picture[];
	private blinkCycle: Duration;
	private blinkOffset: Duration;

	constructor(
		public name: string,
		public level: number,
		public INT: number,
		public DEX: number,
		public STR: number,
		public equipments: Item[],
		public skills: Skill[],
		public known: Skill[],
		public src: string
	) {
		let images: Picture[] = [];
		let path = (src.indexOf("/") < 0 ? URL_CHAR + src : src);
		if (src.endsWith(".png")) {
			let image = new Picture(path);
			images[0] = image;
		} else {
			let parts = [
				new Picture(path + "/back.png"),
				new Picture(path + "/eye.png"),
				new Picture(path + "/eye1.png"),
				new Picture(path + "/eye2.png"),
				new Picture(path + "/eye3.png"),
				new Picture(path + "/eye4.png"),
				new Picture(path + "/eye5.png"),
				new Picture(path + "/fore.png")
			];

			join(parts).then(() => {
				images.push(
					compose(parts[0], parts[1], parts[7]),
					compose(parts[0], parts[2], parts[7]),
					compose(parts[0], parts[3], parts[7]),
					compose(parts[0], parts[4], parts[7]),
					compose(parts[0], parts[5], parts[7]),
					compose(parts[0], parts[6], parts[7])
				);
				images.push(
					grayscale(images[CharacterImage.CLOSED])
				);
			});
		}
		this.images = images;
		this.blinkCycle = BLINK_CYCLE + BLINK_CYCLE_PER_INT * INT;
		this.blinkOffset = rand(this.blinkCycle);

		function compose(...images: Picture[]): Picture {
			assert(images.length > 0);
			let { w, h } = images[0];
			let canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			let g = canvas.getContext("2d");
			if (g) {
				let rect = { x: 0, y: 0, w, h };
				for (let image of images) {
					image.draw(g, undefined, rect);
				}
			}
			return Picture.from(canvas);
		}

		function grayscale(image: Picture): Picture {
			assert(images.length > 0);
			let { w, h } = images[0];
			let canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			let g = canvas.getContext("2d");
			if (g) {
				let rect = { x: 0, y: 0, w, h };
				if (g.filter !== undefined) {
					// Fast path for Chrome and Firefox 49+.
					g.save();
					g.filter = "grayscale(100%)";
					image.draw(g, undefined, rect);
					g.restore();
				} else {
					// Slow path using pixel operations.
					image.draw(g, undefined, rect);
					let pixels = g.getImageData(0, 0, w, h);
					let { data, width, height } = pixels;
					for (let y = 0; y < height; ++y) {
						for (let x = 0; x < width; ++x) {
							let i = (y * 4) * width + x * 4;
							let c = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
							data[i] = c;
							data[i + 1] = c;
							data[i + 2] = c;
						}
					}
					g.putImageData(pixels, 0, 0, 0, 0, width, height);
				}
			}
			return Picture.from(canvas);
		}
	}

	get w(): Pixel {
		let image = this.images[0];
		return image ? image.w : 1;
	}

	get h(): Pixel {
		let image = this.images[0];
		return image ? image.h : 1;
	}

	draw(
		g: CanvasRenderingContext2D,
		when: Timestamp,
		rect: XYWH,
		overlayStyle?: CanvasStyle,
		overlayAlpha?: Alpha
	): void {
		let index: number;
		let cycle = ((when + this.blinkOffset) % this.blinkCycle);
		if (cycle < BLINK_DURATION) {
			index = BLINK_SEQUENCE[floor(cycle / BLINK_DURATION * BLINK_SEQUENCE.length)];
		} else {
			index = 0;
		}
		let { images } = this;
		let image = (images[index] || images[CharacterImage.DEFAULT]);
		if (image) {
			image.draw(g, when, rect, overlayStyle, overlayAlpha);
		}
	}

	get HP(): number { return (3 + this.STR) * 10; }

	get SP(): number {
		let penalty = max(0, this.weight - this.maxWeight);
		return max(0, (3 + this.STR) * 4 - penalty);
	}

	get reservedSP(): number {
		return this.skills.reduce((total, skill) => total + (skill.isPassive ? this.costOf(skill) : 0), 0);
	}

	get step(): number { return (13 - this.DEX); }
	get ZoC(): number { return (3 + this.DEX); }
	get maxWeight(): Weight { return (3 + this.STR) * 10; }

	get weight(): Weight {
		return this.equipments.reduce((total, item) => total + item.weight, 0);
	}

	get DEF(): number {
		return 100 * (1 - this.equipments.reduce((total, item) => total * (1 - item.DEF / 100), 1));
	}

	costOf(skill: Skill): Optional<number> {
		if (!skill) { return undefined; }
		return skill.rawCost - this.INT;	// XXX: Handle passive skills that increase or decrease cost of skills.
	}

	rangeOf(skill: Skill): Optional<number> {
		if (!skill) { return undefined; }
		return skill.rawRange;	// XXX: Handle passive skills and equipments that increase range of skills.
	}

	// TODO: 攻撃力算出式を考える。基礎パラメータ値も加味すべきか？それとも武器の装備時にすでにパラメータは要求されているので不要か？
	powerOf(skill: Skill): Optional<number> {
		let item = this.itemFor(skill);
		return item ? (item.ATK * skill.rawPower / 100) : undefined;
	}

	itemFor(skill: Skill): Optional<Item> {
		let best: Optional<Item> = undefined;
		if (skill) {
			let max: number = 0;
			for (let item of this.equipments) {
				if (skill.match(item)) {
					let { ATK } = item;
					if (max < ATK) {
						max = ATK;
						best = item;
					}
				}
			}
		}
		return best;
	}

	static adventurer(key: string): Character {
		let def = ADVENTURERS[key];
		if (!def) {
			throw new RangeError(`Adventurer not found: "${key}"`);
		}
		return Character.from(_("Adventurer", key), 0, def);
	}

	static monster(key: string, level: number): Character {
		let def = MONSTERS[key];
		if (!def) {
			throw new RangeError(`Monster not found: "${key}"`);
		}
		return Character.from(_("Monster", key), level, def);
	}

	static from(name: Word, level: number, def: CharacterDef): Character {
		return new Character(
			name.localized,
			level,
			def.INT,
			def.DEX,
			def.STR,
			def.equipments.map(Item.from),
			def.skills.map(Skill.from),
			[],
			def.image
		);
	}

	static fromJSON(o: CharacterArchive): Character {
		return new Character(
			o.name,
			o.level || 0,
			o.INT,
			o.DEX,
			o.STR,
			fromJSON(Item, o.equipments, never),
			fromJSON(Skill, o.skills, never),
			fromJSON(Skill, o.known, never),
			o.image
		);
	}

	toJSON(): CharacterArchive {
		return {
			name: this.name,
			level: this.level,
			INT: this.INT,
			DEX: this.DEX,
			STR: this.STR,
			equipments: toJSON(this.equipments, never),
			skills: toJSON(this.skills, never),
			known: toJSON(this.known, never),
			image: this.src
		};
	}
}

//================================================================================
// Data
//================================================================================

type IID2Stock = { [IID: string/*ItemID*/]: number };

interface Data {
	shop: IID2Stock;
	warehouse: Item[];
	reservers: Character[];
	party: Optional<Character>[];
	gold: Gold;
}

interface DataArchive {
	shop: IID2Stock;
	warehouse: ItemArchive[];
	reservers: CharacterArchive[];
	party: Optional<CharacterArchive>[];
	gold: Gold;
}
