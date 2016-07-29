interface ItemDef {
	readonly tags: TAG[];	// supported skill tag
	readonly weight: Weight;
	readonly price: Gold;
	readonly ATK?: number;	// damage
	readonly DEF?: number;	// defence 1-100
	readonly enchants?: EnchantID[];
}

const ITEMS: { [IID: string/*ItemID*/]: ItemDef } = {
	// MELLE
	Dagger: {
		tags: [TAG.MELEE, TAG.SLASH],
		weight: 13,
		price: 100,
		ATK: 30
	},
	ShortSword: {
		tags: [TAG.MELEE, TAG.SLASH],
		weight: 15,
		price: 100,
		ATK: 40
	},
	LongSword: {
		tags: [TAG.MELEE, TAG.SLASH],
		weight: 16,
		price: 100,
		ATK: 50
	},
	Katana: {
		tags: [TAG.MELEE, TAG.SLASH],
		weight: 15,
		price: 100,
		ATK: 45
	},
	Axe: {
		tags: [TAG.MELEE, TAG.SLASH, TAG.BLUNT],
		weight: 18,
		price: 100,
		ATK: 45
	},
	Mace: {
		tags: [TAG.MELEE, TAG.BLUNT],
		weight: 16,
		price: 100,
		ATK: 40
	},
	Spear: {
		tags: [TAG.MELEE, TAG.PIERCE],
		weight: 20,
		price: 100,
		ATK: 50
	},
	Halberd: {
		tags: [TAG.MELEE, TAG.SLASH, TAG.BLUNT, TAG.PIERCE],
		weight: 30,
		price: 100,
		ATK: 50
	},
	// SHOOT
	ShortBow: {
		tags: [TAG.SHOOT, TAG.PIERCE],
		weight: 18,
		price: 100,
		ATK: 30
	},
	LongBow: {
		tags: [TAG.SHOOT, TAG.PIERCE],
		weight: 20,
		price: 100,
		ATK: 40
	},
	// MAGIC
	Staff: {
		tags: [TAG.MELEE, TAG.BLUNT, TAG.MAGIC],
		weight: 20,
		price: 100,
		ATK: 20
	},
	Wand: {
		tags: [TAG.MAGIC],
		weight: 16,
		price: 100,
		ATK: 25
	},
	// ALCHEMY
	FirstAidKit: {
		tags: [TAG.ALCHEMY],
		weight: 10,
		price: 100,
		ATK: 10
	},
	// SHIELD
	Buckler: {
		tags: [TAG.SHIELD],
		weight: 20,
		price: 100,
		ATK: 10,
		DEF: 10
	},
	RoundShield: {
		tags: [TAG.SHIELD],
		weight: 25,
		price: 100,
		ATK: 15,
		DEF: 15
	},
	SpikedShield: {
		tags: [TAG.SHIELD],
		weight: 30,
		price: 100,
		ATK: 30,
		DEF: 15
	},
	KiteShield: {
		tags: [TAG.SHIELD],
		weight: 35,
		price: 100,
		ATK: 20,
		DEF: 20
	},
	TowerShield: {
		tags: [TAG.SHIELD],
		weight: 40,
		price: 100,
		ATK: 30,
		DEF: 20
	},
	// HEAD
	Circlet: {
		tags: [TAG.HEAD],
		weight: 5,
		price: 100,
		DEF: 2
	},
	LeatherHood: {
		tags: [TAG.HEAD],
		weight: 10,
		price: 100,
		DEF: 4
	},
	Mask: {
		tags: [TAG.HEAD],
		weight: 15,
		price: 100,
		DEF: 6
	},
	Sallet: {
		tags: [TAG.HEAD],
		weight: 20,
		price: 100,
		DEF: 8
	},
	Bascinet: {
		tags: [TAG.HEAD],
		weight: 25,
		price: 100,
		DEF: 10
	},
	Helmet: {
		tags: [TAG.HEAD],
		weight: 30,
		price: 100,
		DEF: 12
	},
	// BODY
	Robe: {
		tags: [TAG.BODY],
		weight: 20,
		price: 100,
		DEF: 10
	},
	LetherArmor: {
		tags: [TAG.BODY],
		weight: 25,
		price: 100,
		DEF: 15
	},
	ScaleArmor: {
		tags: [TAG.BODY],
		weight: 30,
		price: 100,
		DEF: 20
	},
	Chainmail: {
		tags: [TAG.BODY],
		weight: 35,
		price: 100,
		DEF: 22
	},
	LamellarArmor: {
		tags: [TAG.BODY],
		weight: 40,
		price: 100,
		DEF: 25
	},
	PlateArmor: {
		tags: [TAG.BODY],
		weight: 45,
		price: 100,
		DEF: 30
	},
	//Vest Jerkin Tunic Garb Vestment Hauberk Coat Jacket
	// ARMS
	Gloves: {
		tags: [TAG.ARMS],
		weight: 10,
		price: 100,
		DEF: 4
	},
	Mittens: {
		tags: [TAG.ARMS],
		weight: 20,
		price: 100,
		DEF: 6
	},
	Gauntlets: {
		tags: [TAG.ARMS],
		weight: 30,
		price: 100,
		DEF: 8
	},
	// LEGS
	Slippers: {
		tags: [TAG.LEGS],
		weight: 5,
		price: 100,
		DEF: 2
	},
	Sandals: {
		tags: [TAG.LEGS],
		weight: 10,
		price: 100,
		DEF: 4
	},
	Shoes: {
		tags: [TAG.LEGS],
		weight: 15,
		price: 100,
		DEF: 6
	},
	Boots: {
		tags: [TAG.LEGS],
		weight: 20,
		price: 100,
		DEF: 8
	},
	Greaves: {
		tags: [TAG.LEGS],
		weight: 25,
		price: 100,
		DEF: 10
	}
};
