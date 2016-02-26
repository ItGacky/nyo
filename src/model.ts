const PARTY_MAX = 6;	// maximum number of active party members.
const SKILL_MAX = 6;	// maximum number of active skills per character.
const ITEM_DISCOUNT_TO_SELL = 0.5;

//================================================================================
// Tag
//================================================================================

let TAG2NAME: Word[];

function tags2str(tags: TAG[]): string {
	if (TAG2NAME == null) {
		TAG2NAME = [
			_("Tag", "Melee"),
			_("Tag", "Throw"),
			_("Tag", "Shoot"),
			_("Tag", "Shield"),
			_("Tag", "Head"),
			_("Tag", "Body"),
			_("Tag", "Arms"),
			_("Tag", "Legs"),
			_("Tag", "Slash"),
			_("Tag", "Blunt"),
			_("Tag", "Pierce"),
			_("Tag", "Magic"),
			_("Tag", "Alchemy")
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

//================================================================================
// Target
//================================================================================

const TAGBITS_CONFLICT = tags2bits([TAG.SHIELD, TAG.HEAD, TAG.BODY, TAG.ARMS, TAG.LEGS]);

function isHostile(target: TARGET): boolean {
	switch (target) {
		case TARGET.SINGLE_FRIENDLY:
		case TARGET.STRAIGHT_FRIENDLY:
		case TARGET.SURROUND_FRIENDLY:
			return false;
		default:
			return true;
	}
}

//================================================================================
// Enchant
//================================================================================

interface EnchantArchive {
	EID: string;
	value: number;
}

class Enchant implements ToJSON<EnchantArchive> {
	private def: EnchantDef;
	private value: number;
	public name: Word;
	public spec: Word;

	constructor(public EID: string) {
		this.def = ENCHANTS[this.EID];
		if (this.def == null) {
			throw new RangeError(`Enchantment not found: "${this.EID}"`);
		}
		this.name = Enchant.nameOf(this.EID);
		this.spec = Enchant.specOf(this.EID);
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

	static nameOf(EID: string): Word {
		return _("Enchant", EID, "Name");
	}

	static specOf(EID: string): Word {
		return _("Enchant", EID, "Spec");
	}

	static from(EID: string): Enchant {
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

interface ItemArchive {
	IID: string;
	enchants: EnchantArchive[];
}

class Item implements ToJSON<ItemArchive> {
	private def: ItemDef;
	public baseName: Word;
	public spec: Word;
	public tagbits: number;

	constructor(
		public IID: string,
		public enchants?: Enchant[]
	) {
		this.def = ITEMS[this.IID];
		if (this.def == null) {
			throw new RangeError(`Item not found: "${this.IID}"`);
		}
		this.baseName = Item.nameOf(this.IID);
		this.spec = Item.specOf(this.IID);
		this.tagbits = tags2bits(this.def.tags);
		if (this.enchants == null) {
			let { enchants } = this.def;
			this.enchants = (enchants || []).map(Enchant.from);
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

	get priceToSell(): number {
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

	static nameOf(IID: string): Word {
		return _("Item", IID, "Name");
	}

	static specOf(IID: string): Word {
		return _("Item", IID, "Spec");
	}

	static from(IID: string): Item {
		return new Item(IID);
	}

	static fromJSON(o: ItemArchive): Item {
		return new Item(
			o.IID,
			fromJSON(Enchant, o.enchants)
		);
	}

	toJSON(): ItemArchive {
		return {
			IID: this.IID,
			enchants: toJSON(this.enchants)
		};
	}
}

//================================================================================
// Skill
//================================================================================

interface SkillArchive {
	SID: string;
	// TODO: skill levels and modifiers
}

class Skill implements ToJSON<SkillArchive> {
	private def: SkillDef;
	public name: Word;
	public spec: Word;
	public tagbits: number;

	constructor(public SID: string) {
		this.def = SKILLS[this.SID];
		if (this.def == null) {
			throw new RangeError(`Skill not found: "${this.SID}"`);
		}
		this.name = Skill.nameOf(this.SID);
		this.spec = Skill.specOf(this.SID);
		this.tagbits = tags2bits(this.def.tags);
	}

	get tags() { return this.def.tags; }
	get cost() { return this.def.cost; }
	get range() { return this.def.range; }
	get power() { return this.def.power; }
	get target() { return this.def.target; }
	get hostile() { return isHostile(this.def.target); }
	get action() { return this.def.aciton; }

	match(item: Item): boolean {
		return (this.tagbits & item.tagbits) === this.tagbits;
	}

	static nameOf(SID: string): Word {
		return _("Skill", SID, "Name");
	}

	static specOf(SID: string): Word {
		return _("Skill", SID, "Spec");
	}

	static from(SID: string): Skill {
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
const NUM_BLINKS = BLINK_SEQUENCE.reduce((prev, value) => max(prev, value), 0);

interface DrawableWithOverlay extends WH {
	src: string;
	draw(
		g: CanvasRenderingContext2D,
		when: Timestamp,
		rect: XYWH,
		overlayStyle?: CanvasStyle,
		overlayAlpha?: number
	): void;
}

class AnimatedPicture implements DrawableWithOverlay {
	private back: Picture;
	private eyes: Picture[];
	private fore: Picture;
	private cycle: Duration;
	private offset: Duration;

	constructor(public src: string, INT: number) {
		this.back = new Picture(src + "/back.png");
		let eyes: Picture[] = [new Picture(src + "/eye.png")];
		for (let i = 1; i <= NUM_BLINKS; ++i) {
			eyes.push(new Picture(src + `/eye${i}.png`));
		}
		this.eyes = eyes;
		this.fore = new Picture(src + "/fore.png");
		this.cycle = BLINK_CYCLE + BLINK_CYCLE_PER_INT * INT;
		this.offset = rand(this.cycle);
	}

	get w(): number { return this.back.w; }
	get h(): number { return this.back.h; }

	draw(
		g: CanvasRenderingContext2D,
		when: Timestamp,
		rect: XYWH,
		overlayStyle?: CanvasStyle,
		overlayAlpha?: number
	): void {
		this.back.draw(g, when, rect, overlayStyle, overlayAlpha);
		let eye: number;
		let cycle = ((when + this.offset) % this.cycle);
		if (cycle < BLINK_DURATION) {
			eye = BLINK_SEQUENCE[floor(cycle / BLINK_DURATION * BLINK_SEQUENCE.length)];
		} else {
			eye = 0;
		}
		this.eyes[eye].draw(g, when, rect, overlayStyle, overlayAlpha);
		this.fore.draw(g, when, rect, overlayStyle, overlayAlpha);
	}
}

function drawableFromPath(src: string, INT: number): DrawableWithOverlay {
	if (src.indexOf("/") < 0) {
		src = URL_CHAR + src;
	}
	if (src.endsWith(".png")) {
		return new Picture(src);
	} else {
		return new AnimatedPicture(src, INT);
	}
}

function pathFromDrawable(obj: DrawableWithOverlay): string {
	let src = obj.src;
	if (src.startsWith(URL_CHAR)) {
		return src.substr(URL_CHAR.length);
	} else {
		return src;
	}
}

// TODO: 装備変更までキャッシュ可能な値について、必要性を確認する。
class Character implements ToJSON<CharacterArchive> {
	constructor(
		public name: string,
		public INT: number,
		public DEX: number,
		public STR: number,
		public equipments: Item[],
		public skills: Skill[],
		public known: Skill[],
		public image: DrawableWithOverlay
	) {
	}

	get HP(): number { return (3 + this.STR) * 10; }

	get SP(): number {
		let penalty = max(0, this.weight - this.maxWeight);
		return max(0, (3 + this.STR) * 4 - penalty);
	}

	get step(): number { return (13 - this.DEX); }
	get ZoC(): number { return (3 + this.DEX); }
	get maxWeight(): number { return (3 + this.STR) * 10; }

	get weight(): number {
		return this.equipments.reduce((total, item) => total + item.weight, 0);
	}

	get DEF(): number {
		return 100 * (1 - this.equipments.reduce((total, item) => total * (1 - item.DEF / 100), 1));
	}

	costOf(skill: Skill): number {
		if (skill == null) { return undefined; }
		return skill.cost - this.INT;	// TODO: スキルコストの増減はここで。
	}

	rangeOf(skill: Skill): number {
		if (skill == null) { return undefined; }
		return skill.range;	// TODO: スキルの射程を伸ばすような装備やパッシブスキルがあればここで。
	}

	// TODO: 攻撃力算出式を考える。基礎パラメータ値も加味すべきか？それとも武器の装備時にすでにパラメータは要求されているので不要か？
	powerOf(skill: Skill): number {
		let item = this.itemFor(skill);
		return item ? (item.ATK * skill.power / 100) : undefined;
	}

	itemFor(skill: Skill): Item {
		let best: Item = undefined;
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
		if (def == null) {
			throw new RangeError(`Adventurer not found: "${key}"`);
		}
		return Character.from(_("Adventurer", key), def);
	}

	static monster(key: string): Character {
		let def = MONSTERS[key];
		if (def == null) {
			throw new RangeError(`Monster not found: "${key}"`);
		}
		return Character.from(_("Monster", key), def);
	}

	static from(name: Word, def: CharacterDef): Character {
		return new Character(
			name.localized,
			def.INT,
			def.DEX,
			def.STR,
			def.equipments.map(Item.from),
			def.skills.map(Skill.from),
			[],
			drawableFromPath(def.image, def.INT)
		);
	}

	static fromJSON(o: CharacterArchive): Character {
		return new Character(
			o.name,
			o.INT,
			o.DEX,
			o.STR,
			fromJSON(Item, o.equipments),
			fromJSON(Skill, o.skills),
			fromJSON(Skill, o.known),
			drawableFromPath(o.image, o.INT)
		);
	}

	toJSON(): CharacterArchive {
		return {
			name: this.name,
			INT: this.INT,
			DEX: this.DEX,
			STR: this.STR,
			equipments: toJSON(this.equipments),
			skills: toJSON(this.skills),
			known: toJSON(this.known),
			image: pathFromDrawable(this.image)
		};
	}
}

//================================================================================
// Data
//================================================================================

type IID2Stock = { [IID: string]: number };

interface Data {
	shop: IID2Stock;
	warehouse: Item[];
	reservers: Character[];
	party: Character[];
	gold: number;
}

interface DataArchive {
	shop: IID2Stock;
	warehouse: ItemArchive[];
	reservers: CharacterArchive[];
	party: CharacterArchive[];
	gold: number;
}
