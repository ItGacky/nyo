interface CharacterDef {
	INT: number;
	DEX: number;
	STR: number;
	equipments: ItemID[];
	skills: SkillID[];
	image: string;
}

const ADVENTURERS: { [key: string]: CharacterDef } = {
	Warrior: {
		INT: 4,
		DEX: 4,
		STR: 7,
		equipments: ["Mace", "PlateArmor", "Mace"],
		skills: ["Swing", "Crash", "Bash"],
		image: "nazrin"
	},
	Samurai: {
		INT: 3,
		DEX: 7,
		STR: 5,
		equipments: ["Katana", "Chainmail"],
		skills: ["Swing", "Slash", "CutThrough", "Sweep"],
		image: "rin"
	},
	Knight: {
		INT: 6,
		DEX: 2,
		STR: 7,
		equipments: ["Spear", "LamellarArmor", "KiteShield"],
		skills: ["Swing", "Stab", "Thrust", "ShieldBash", "ShieldCharge"],
		image: "toramaru"
	},
	Thief: {
		INT: 3,
		DEX: 6,
		STR: 6,
		equipments: ["LongBow", "LetherArmor", "FirstAidKit"],
		skills: ["Shoot", "FirstAid"],
		image: "marisa"
	},
	Healer: {
		INT: 7,
		DEX: 3,
		STR: 5,
		equipments: ["Staff", "Robe"],
		skills: ["Swing", "Heal", "PartyHeal"],
		image: "reimu"
	},
	Mage: {
		INT: 8,
		DEX: 4,
		STR: 3,
		equipments: ["Wand", "Robe"],
		skills: ["FireBall", "IceSpear", "DrainLife", "LightningLaser", "FireNova"],
		image: "utsuho"
	}
};

const MONSTERS: { [key: string]: CharacterDef } = {
	Ant: {
		INT: 3,
		DEX: 3,
		STR: 4,
		equipments: ["Dagger", "LetherArmor"],
		skills: ["Swing"],
		image: "ant.png"
	},
	Elemental: {
		INT: 4,
		DEX: 3,
		STR: 3,
		equipments: ["Wand", "LetherArmor"],
		skills: ["FireBall"],
		image: "elemental.png"
	},
	Frog: {
		INT: 4,
		DEX: 4,
		STR: 4,
		equipments: ["ShortBow", "LetherArmor"],
		skills: ["Shoot"],
		image: "frog.png"
	},
	Plant: {
		INT: 4,
		DEX: 3,
		STR: 4,
		equipments: ["Wand", "LetherArmor"],
		skills: ["FireNova"],
		image: "plant.png"
	},
	Slug: {
		INT: 3,
		DEX: 3,
		STR: 3,
		equipments: ["Wand", "LetherArmor"],
		skills: ["DrainLife"],
		image: "slug.png"
	},
	Snail: {
		INT: 3,
		DEX: 3,
		STR: 3,
		equipments: ["LongBow", "LetherArmor"],
		skills: ["Shoot"],
		image: "snail.png"
	},
	Sword: {
		INT: 3,
		DEX: 5,
		STR: 4,
		equipments: ["LongSword", "LetherArmor"],
		skills: ["Swing"],
		image: "sword.png"
	},
	Wall: {
		INT: 3,
		DEX: 3,
		STR: 6,
		equipments: ["Mace", "LetherArmor"],
		skills: ["Swing"],
		image: "wall.png"
	},
	Weasel: {
		INT: 3,
		DEX: 6,
		STR: 3,
		equipments: ["Spear", "LetherArmor"],
		skills: ["Thrust"],
		image: "weasel.png"
	}
};
