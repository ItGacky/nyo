interface EnchantDef {
	tags: TAG[];	// supported item tag
	min: number;	// value min
	max: number;	// value max
	ATK?: (value: number, ATK: number) => number;
}

function enchantAddedATK(value: number, ATK: number): number {
	return ATK + value;
}

const ENCHANTS: { [EID: string/*EnchantID*/]: EnchantDef } = {
	AddedFire: {
		tags: [TAG.MELEE, TAG.THROW, TAG.SHOOT],
		min: 5,
		max: 10,
		ATK: enchantAddedATK
	}
}
