interface EnchantDef {
	readonly tags: TAG[];	// supported item tag
	readonly min: number;	// value min
	readonly max: number;	// value max
	readonly ATK?: (value: number, ATK: number) => number;
}

function enchantAddedATK(value: number, ATK: number): number {
	return ATK + value;
}

const ENCHANTS: { [EID: string/*EnchantID*/]: EnchantDef } = {
	AddedFire: {
		tags: [TAG.Melee, TAG.Throw, TAG.Shoot],
		min: 5,
		max: 10,
		ATK: enchantAddedATK
	}
};
