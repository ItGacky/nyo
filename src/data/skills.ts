interface SkillDef {
	tags: TAG[];
	usage: USAGE;
	power: number;
	cost: number;
	range?: number;
	effect: string;
	action?: string;
}

const SKILLS: { [SID: string/*SkillID*/]: SkillDef } = {
	Dummy: {
		tags: [],
		usage: USAGE.SINGLE_HOSTILE,
		power: 0,
		cost: 999,
		range: 0,
		effect: "Damage",
		action: "Charge"
	},
	Swing: {
		tags: [TAG.MELEE],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 14,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	Slash: {
		tags: [TAG.MELEE, TAG.SLASH],
		usage: USAGE.SINGLE_HOSTILE,
		power: 110,
		cost: 15,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	CutThrough: {
		tags: [TAG.MELEE, TAG.SLASH],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "GoBehind"
	},
	Sweep: {
		tags: [TAG.MELEE, TAG.SLASH],
		usage: USAGE.SURROUND_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "Nova"
	},
	Crash: {
		tags: [TAG.MELEE, TAG.BLUNT],
		usage: USAGE.SINGLE_HOSTILE,
		power: 110,
		cost: 15,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	Bash: {
		tags: [TAG.MELEE, TAG.BLUNT],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "Knockback"
	},
	Stab: {
		tags: [TAG.MELEE, TAG.PIERCE],
		usage: USAGE.SINGLE_HOSTILE,
		power: 110,
		cost: 15,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	Thrust: {
		tags: [TAG.MELEE, TAG.PIERCE],
		usage: USAGE.STRAIGHT_HOSTILE,
		power: 100,
		cost: 15,
		range: 2,
		effect: "Damage",
		action: "Laser"
	},
	ShieldBash: {
		tags: [TAG.SHIELD],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	ShieldCharge: {
		tags: [TAG.SHIELD],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 24,
		range: 1,
		effect: "Damage",
		action: "Trample"
	},
	Shoot: {
		tags: [TAG.SHOOT],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 3,
		effect: "Damage",
		action: "Shoot"
	},
	// MAGIC
	IceSpear: {
		tags: [TAG.MAGIC, TAG.COLD],
		usage: USAGE.SINGLE_HOSTILE,
		power: 80,
		cost: 16,
		range: 5,
		effect: "DamageHPandSP",
		action: "Shoot"
	},
	DrainLife: {
		tags: [TAG.MAGIC, TAG.LIFE],
		usage: USAGE.SINGLE_HOSTILE,
		power: 80,
		cost: 16,
		range: 5,
		effect: "Damage",
		action: "Drain"
	},
	FireBall: {
		tags: [TAG.MAGIC, TAG.FIRE],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 16,
		range: 5,
		effect: "Damage",
		action: "Explode"
	},
	LightningLaser: {
		tags: [TAG.MAGIC, TAG.LIGHTNING],
		usage: USAGE.STRAIGHT_HOSTILE,
		power: 100,
		cost: 16,
		range: 5,
		effect: "Damage",
		action: "Laser"
	},
	FireNova: {
		tags: [TAG.MAGIC, TAG.FIRE],
		usage: USAGE.SURROUND_HOSTILE,
		power: 100,
		cost: 16,
		range: 2,
		effect: "Damage",
		action: "Nova"
	},
	Heal: {
		tags: [TAG.MAGIC, TAG.LIFE],
		usage: USAGE.SINGLE_FRIENDLY,
		power: 100,
		cost: 24,
		range: 3,
		effect: "Heal",
		action: "Shoot"
	},
	PartyHeal: {
		tags: [TAG.MAGIC, TAG.LIFE],
		usage: USAGE.SURROUND_FRIENDLY,
		power: 100,
		cost: 24,
		range: 1,
		effect: "Heal",
		action: "Nova"
	},
	FirstAid: {
		tags: [TAG.ALCHEMY, TAG.LIFE],
		usage: USAGE.SINGLE_FRIENDLY,
		power: 100,
		cost: 24,
		range: 1,
		effect: "Heal",
		action: "Charge"
	},
	//================================================================================
	// Passive Skills - power: 1=7%, 2=15%, 3=23%, 4=32%
	//================================================================================
	PathToWarrior: {
		tags: [TAG.MELEE],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToNinja: {
		tags: [TAG.THROW],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToArcher: {
		tags: [TAG.SHOOT],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToMage: {
		tags: [TAG.MAGIC],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToAlchemist: {
		tags: [TAG.ALCHEMY],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},

	Defence: {
		tags: [TAG.MELEE],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	Dodge: {
		tags: [TAG.THROW, TAG.SHOOT],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	Meditation: {
		tags: [TAG.MAGIC],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	Healthy: {
		tags: [TAG.ALCHEMY],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},

	AvatarOfFire: {
		tags: [TAG.FIRE],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	AvatarOfCold: {
		tags: [TAG.COLD],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	AvatarOfLightning: {
		tags: [TAG.LIGHTNING],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},

	ResistFire: {
		tags: [TAG.FIRE],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	ResistCold: {
		tags: [TAG.COLD],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	ResistLightning: {
		tags: [TAG.LIGHTNING],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	}
};
