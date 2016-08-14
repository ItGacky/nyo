interface ItemDef {
	readonly tags: Tags;	// supported skill tag
	readonly weight: Weight;
	readonly price: Gold;
	readonly ATK?: number;	// damage
	readonly DEF?: Percentage;	// defence 1-100
	readonly enchants?: EnchantID[];
}

const ITEMS: { [IID: string/*ItemID*/]: ItemDef } = {
	// MELLE
	Dagger: {
		tags: tags(TAG.Melee, TAG.Slash),
		weight: 13,
		price: 100,
		ATK: 30
	},
	ShortSword: {
		tags: tags(TAG.Melee, TAG.Slash),
		weight: 15,
		price: 100,
		ATK: 40
	},
	LongSword: {
		tags: tags(TAG.Melee, TAG.Slash),
		weight: 16,
		price: 100,
		ATK: 50
	},
	Katana: {
		tags: tags(TAG.Melee, TAG.Slash),
		weight: 15,
		price: 100,
		ATK: 45
	},
	Axe: {
		tags: tags(TAG.Melee, TAG.Slash, TAG.Blunt),
		weight: 18,
		price: 100,
		ATK: 45
	},
	Mace: {
		tags: tags(TAG.Melee, TAG.Blunt),
		weight: 16,
		price: 100,
		ATK: 40
	},
	Spear: {
		tags: tags(TAG.Melee, TAG.Pierce),
		weight: 20,
		price: 100,
		ATK: 50
	},
	Halberd: {
		tags: tags(TAG.Melee, TAG.Slash, TAG.Blunt, TAG.Pierce),
		weight: 30,
		price: 100,
		ATK: 50
	},
	// SHOOT
	ShortBow: {
		tags: tags(TAG.Shoot, TAG.Pierce),
		weight: 18,
		price: 100,
		ATK: 30
	},
	LongBow: {
		tags: tags(TAG.Shoot, TAG.Pierce),
		weight: 20,
		price: 100,
		ATK: 40
	},
	// MAGIC
	Staff: {
		tags: tags(TAG.Melee, TAG.Blunt, TAG.Magic),
		weight: 20,
		price: 100,
		ATK: 20
	},
	Wand: {
		tags: tags(TAG.Magic),
		weight: 16,
		price: 100,
		ATK: 25
	},
	// ALCHEMY
	FirstAidKit: {
		tags: tags(TAG.Alchemy),
		weight: 10,
		price: 100,
		ATK: 20
	},
	// SHIELD
	Buckler: {
		tags: tags(TAG.Shield),
		weight: 20,
		price: 100,
		ATK: 10,
		DEF: 10
	},
	RoundShield: {
		tags: tags(TAG.Shield),
		weight: 25,
		price: 100,
		ATK: 15,
		DEF: 15
	},
	SpikedShield: {
		tags: tags(TAG.Shield),
		weight: 30,
		price: 100,
		ATK: 30,
		DEF: 15
	},
	KiteShield: {
		tags: tags(TAG.Shield),
		weight: 35,
		price: 100,
		ATK: 20,
		DEF: 20
	},
	TowerShield: {
		tags: tags(TAG.Shield),
		weight: 40,
		price: 100,
		ATK: 30,
		DEF: 20
	},
	// HEAD
	Circlet: {
		tags: tags(TAG.Head),
		weight: 5,
		price: 100,
		DEF: 2
	},
	LeatherHood: {
		tags: tags(TAG.Head),
		weight: 10,
		price: 100,
		DEF: 4
	},
	Mask: {
		tags: tags(TAG.Head),
		weight: 15,
		price: 100,
		DEF: 6
	},
	Sallet: {
		tags: tags(TAG.Head),
		weight: 20,
		price: 100,
		DEF: 8
	},
	Bascinet: {
		tags: tags(TAG.Head),
		weight: 25,
		price: 100,
		DEF: 10
	},
	Helmet: {
		tags: tags(TAG.Head),
		weight: 30,
		price: 100,
		DEF: 12
	},
	// BODY
	Robe: {
		tags: tags(TAG.Body),
		weight: 20,
		price: 100,
		DEF: 10
	},
	LetherArmor: {
		tags: tags(TAG.Body),
		weight: 25,
		price: 100,
		DEF: 15
	},
	ScaleArmor: {
		tags: tags(TAG.Body),
		weight: 30,
		price: 100,
		DEF: 20
	},
	Chainmail: {
		tags: tags(TAG.Body),
		weight: 35,
		price: 100,
		DEF: 22
	},
	LamellarArmor: {
		tags: tags(TAG.Body),
		weight: 40,
		price: 100,
		DEF: 25
	},
	PlateArmor: {
		tags: tags(TAG.Body),
		weight: 45,
		price: 100,
		DEF: 30
	},
	//Vest Jerkin Tunic Garb Vestment Hauberk Coat Jacket
	// ARMS
	Gloves: {
		tags: tags(TAG.Arms),
		weight: 10,
		price: 100,
		DEF: 4
	},
	Mittens: {
		tags: tags(TAG.Arms),
		weight: 20,
		price: 100,
		DEF: 6
	},
	Gauntlets: {
		tags: tags(TAG.Arms),
		weight: 30,
		price: 100,
		DEF: 8
	},
	// LEGS
	Slippers: {
		tags: tags(TAG.Legs),
		weight: 5,
		price: 100,
		DEF: 2
	},
	Sandals: {
		tags: tags(TAG.Legs),
		weight: 10,
		price: 100,
		DEF: 4
	},
	Shoes: {
		tags: tags(TAG.Legs),
		weight: 15,
		price: 100,
		DEF: 6
	},
	Boots: {
		tags: tags(TAG.Legs),
		weight: 20,
		price: 100,
		DEF: 8
	},
	Greaves: {
		tags: tags(TAG.Legs),
		weight: 25,
		price: 100,
		DEF: 10
	}
};
