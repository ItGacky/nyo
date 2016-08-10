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
		tags: [TAG.Melee, TAG.Slash],
		weight: 13,
		price: 100,
		ATK: 30
	},
	ShortSword: {
		tags: [TAG.Melee, TAG.Slash],
		weight: 15,
		price: 100,
		ATK: 40
	},
	LongSword: {
		tags: [TAG.Melee, TAG.Slash],
		weight: 16,
		price: 100,
		ATK: 50
	},
	Katana: {
		tags: [TAG.Melee, TAG.Slash],
		weight: 15,
		price: 100,
		ATK: 45
	},
	Axe: {
		tags: [TAG.Melee, TAG.Slash, TAG.Blunt],
		weight: 18,
		price: 100,
		ATK: 45
	},
	Mace: {
		tags: [TAG.Melee, TAG.Blunt],
		weight: 16,
		price: 100,
		ATK: 40
	},
	Spear: {
		tags: [TAG.Melee, TAG.Pierce],
		weight: 20,
		price: 100,
		ATK: 50
	},
	Halberd: {
		tags: [TAG.Melee, TAG.Slash, TAG.Blunt, TAG.Pierce],
		weight: 30,
		price: 100,
		ATK: 50
	},
	// SHOOT
	ShortBow: {
		tags: [TAG.Shoot, TAG.Pierce],
		weight: 18,
		price: 100,
		ATK: 30
	},
	LongBow: {
		tags: [TAG.Shoot, TAG.Pierce],
		weight: 20,
		price: 100,
		ATK: 40
	},
	// MAGIC
	Staff: {
		tags: [TAG.Melee, TAG.Blunt, TAG.Magic],
		weight: 20,
		price: 100,
		ATK: 20
	},
	Wand: {
		tags: [TAG.Magic],
		weight: 16,
		price: 100,
		ATK: 25
	},
	// ALCHEMY
	FirstAidKit: {
		tags: [TAG.Alchemy],
		weight: 10,
		price: 100,
		ATK: 20
	},
	// SHIELD
	Buckler: {
		tags: [TAG.Shield],
		weight: 20,
		price: 100,
		ATK: 10,
		DEF: 10
	},
	RoundShield: {
		tags: [TAG.Shield],
		weight: 25,
		price: 100,
		ATK: 15,
		DEF: 15
	},
	SpikedShield: {
		tags: [TAG.Shield],
		weight: 30,
		price: 100,
		ATK: 30,
		DEF: 15
	},
	KiteShield: {
		tags: [TAG.Shield],
		weight: 35,
		price: 100,
		ATK: 20,
		DEF: 20
	},
	TowerShield: {
		tags: [TAG.Shield],
		weight: 40,
		price: 100,
		ATK: 30,
		DEF: 20
	},
	// HEAD
	Circlet: {
		tags: [TAG.Head],
		weight: 5,
		price: 100,
		DEF: 2
	},
	LeatherHood: {
		tags: [TAG.Head],
		weight: 10,
		price: 100,
		DEF: 4
	},
	Mask: {
		tags: [TAG.Head],
		weight: 15,
		price: 100,
		DEF: 6
	},
	Sallet: {
		tags: [TAG.Head],
		weight: 20,
		price: 100,
		DEF: 8
	},
	Bascinet: {
		tags: [TAG.Head],
		weight: 25,
		price: 100,
		DEF: 10
	},
	Helmet: {
		tags: [TAG.Head],
		weight: 30,
		price: 100,
		DEF: 12
	},
	// BODY
	Robe: {
		tags: [TAG.Body],
		weight: 20,
		price: 100,
		DEF: 10
	},
	LetherArmor: {
		tags: [TAG.Body],
		weight: 25,
		price: 100,
		DEF: 15
	},
	ScaleArmor: {
		tags: [TAG.Body],
		weight: 30,
		price: 100,
		DEF: 20
	},
	Chainmail: {
		tags: [TAG.Body],
		weight: 35,
		price: 100,
		DEF: 22
	},
	LamellarArmor: {
		tags: [TAG.Body],
		weight: 40,
		price: 100,
		DEF: 25
	},
	PlateArmor: {
		tags: [TAG.Body],
		weight: 45,
		price: 100,
		DEF: 30
	},
	//Vest Jerkin Tunic Garb Vestment Hauberk Coat Jacket
	// ARMS
	Gloves: {
		tags: [TAG.Arms],
		weight: 10,
		price: 100,
		DEF: 4
	},
	Mittens: {
		tags: [TAG.Arms],
		weight: 20,
		price: 100,
		DEF: 6
	},
	Gauntlets: {
		tags: [TAG.Arms],
		weight: 30,
		price: 100,
		DEF: 8
	},
	// LEGS
	Slippers: {
		tags: [TAG.Legs],
		weight: 5,
		price: 100,
		DEF: 2
	},
	Sandals: {
		tags: [TAG.Legs],
		weight: 10,
		price: 100,
		DEF: 4
	},
	Shoes: {
		tags: [TAG.Legs],
		weight: 15,
		price: 100,
		DEF: 6
	},
	Boots: {
		tags: [TAG.Legs],
		weight: 20,
		price: 100,
		DEF: 8
	},
	Greaves: {
		tags: [TAG.Legs],
		weight: 25,
		price: 100,
		DEF: 10
	}
};
