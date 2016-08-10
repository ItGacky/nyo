interface SkillDef {
	readonly tags: TAG[];
	readonly usage: USAGE;
	readonly power: number;
	readonly cost: number;
	readonly range?: number;
	readonly effect: string;
	readonly action: string;
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
		tags: [TAG.Melee],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 14,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	Slash: {
		tags: [TAG.Melee, TAG.Slash],
		usage: USAGE.SINGLE_HOSTILE,
		power: 110,
		cost: 15,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	CutThrough: {
		tags: [TAG.Melee, TAG.Slash],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "GoBehind"
	},
	Sweep: {
		tags: [TAG.Melee, TAG.Slash],
		usage: USAGE.SURROUND_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "Nova"
	},
	Crash: {
		tags: [TAG.Melee, TAG.Blunt],
		usage: USAGE.SINGLE_HOSTILE,
		power: 110,
		cost: 15,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	Bash: {
		tags: [TAG.Melee, TAG.Blunt],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "Knockback"
	},
	Stab: {
		tags: [TAG.Melee, TAG.Pierce],
		usage: USAGE.SINGLE_HOSTILE,
		power: 110,
		cost: 15,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	Thrust: {
		tags: [TAG.Melee, TAG.Pierce],
		usage: USAGE.STRAIGHT_HOSTILE,
		power: 100,
		cost: 15,
		range: 2,
		effect: "Damage",
		action: "Laser"
	},
	ShieldBash: {
		tags: [TAG.Shield],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 1,
		effect: "Damage",
		action: "Charge"
	},
	ShieldCharge: {
		tags: [TAG.Shield],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 24,
		range: 1,
		effect: "Damage",
		action: "Trample"
	},
	Shoot: {
		tags: [TAG.Shoot],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 20,
		range: 3,
		effect: "Damage",
		action: "Shoot"
	},
	PoisonArrow: {
		tags: [TAG.Shoot],
		usage: USAGE.SINGLE_HOSTILE,
		power: 60,
		cost: 20,
		range: 3,
		effect: "DamageOverTime",
		action: "Shoot"
	},
	// MAGIC
	IceSpear: {
		tags: [TAG.Magic, TAG.Cold],
		usage: USAGE.SINGLE_HOSTILE,
		power: 80,
		cost: 16,
		range: 5,
		effect: "DamageHPandSP",
		action: "Shoot"
	},
	DrainLife: {
		tags: [TAG.Magic, TAG.Life],
		usage: USAGE.SINGLE_HOSTILE,
		power: 80,
		cost: 16,
		range: 5,
		effect: "Damage",
		action: "Drain"
	},
	FireBall: {
		tags: [TAG.Magic, TAG.Fire],
		usage: USAGE.SINGLE_HOSTILE,
		power: 100,
		cost: 16,
		range: 5,
		effect: "Damage",
		action: "Explode"
	},
	LightningLaser: {
		tags: [TAG.Magic, TAG.Lightning],
		usage: USAGE.STRAIGHT_HOSTILE,
		power: 100,
		cost: 16,
		range: 5,
		effect: "Damage",
		action: "Laser"
	},
	FireNova: {
		tags: [TAG.Magic, TAG.Fire],
		usage: USAGE.SURROUND_HOSTILE,
		power: 100,
		cost: 16,
		range: 2,
		effect: "Damage",
		action: "Nova"
	},
	Heal: {
		tags: [TAG.Magic, TAG.Life],
		usage: USAGE.SINGLE_FRIENDLY,
		power: 100,
		cost: 24,
		range: 3,
		effect: "Heal",
		action: "Shoot"
	},
	PartyHeal: {
		tags: [TAG.Magic, TAG.Life],
		usage: USAGE.SURROUND_FRIENDLY,
		power: 100,
		cost: 24,
		range: 1,
		effect: "Heal",
		action: "Nova"
	},
	FirstAid: {
		tags: [TAG.Alchemy, TAG.Life],
		usage: USAGE.SINGLE_FRIENDLY,
		power: 50,
		cost: 24,
		range: 1,
		effect: "HealOverTime",
		action: "Charge"
	},
	PotionOfHealth: {
		tags: [TAG.Alchemy, TAG.Life],
		usage: USAGE.DOSE,
		power: 100,
		cost: 24,
		effect: "Heal",
		action: "Dose"
	},
	PotionOfRegeneration: {
		tags: [TAG.Alchemy, TAG.Life],
		usage: USAGE.DOSE,
		power: 75,
		cost: 24,
		effect: "HealOverTime",
		action: "Dose"
	},
	//================================================================================
	// Passive Skills - power: 1=7%, 2=15%, 3=23%, 4=32%
	//================================================================================
	PathToWarrior: {
		tags: [TAG.Melee],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToNinja: {
		tags: [TAG.Throw],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToArcher: {
		tags: [TAG.Shoot],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToMage: {
		tags: [TAG.Magic],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	PathToAlchemist: {
		tags: [TAG.Alchemy],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},

	Defence: {
		tags: [TAG.Melee],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	Dodge: {
		tags: [TAG.Throw, TAG.Shoot],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	Meditation: {
		tags: [TAG.Magic],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	Healthy: {
		tags: [TAG.Alchemy],
		usage: USAGE.PASSIVE,
		power: 2,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},

	AvatarOfFire: {
		tags: [TAG.Fire],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	AvatarOfCold: {
		tags: [TAG.Cold],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},
	AvatarOfLightning: {
		tags: [TAG.Lightning],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Offence"
	},

	ResistFire: {
		tags: [TAG.Fire],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	ResistCold: {
		tags: [TAG.Cold],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	},
	ResistLightning: {
		tags: [TAG.Lightning],
		usage: USAGE.PASSIVE,
		power: 4,
		cost: 10,
		effect: "Aura",
		action: "Defence"
	}
};
