interface SkillDef {
	tags: TAG[];	// required item tag
	cost: number;	//
	range: number;	//
	power: number;	//
	target: TARGET;
	effect: string;	//
	action: string;	//
}

const SKILLS: { [SID: string/*SkillID*/]: SkillDef } = {
	Dummy: {
		tags: [],
		cost: 999,
		range: 0,
		power: 0,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Charge"
	},
	Swing: {
		tags: [TAG.MELEE],
		cost: 14,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Charge"
	},
	Slash: {
		tags: [TAG.MELEE, TAG.SLASH],
		cost: 15,
		range: 1,
		power: 110,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Charge"
	},
	CutThrough: {
		tags: [TAG.MELEE, TAG.SLASH],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "GoBehind"
	},
	Sweep: {
		tags: [TAG.MELEE, TAG.SLASH],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SURROUND_HOSTILE,
		effect: "Damage",
		action: "Nova"
	},
	Crash: {
		tags: [TAG.MELEE, TAG.BLUNT],
		cost: 15,
		range: 1,
		power: 110,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Charge"
	},
	Bash: {
		tags: [TAG.MELEE, TAG.BLUNT],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Knockback"
	},
	Stab: {
		tags: [TAG.MELEE, TAG.PIERCE],
		cost: 15,
		range: 1,
		power: 110,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Charge"
	},
	Thrust: {
		tags: [TAG.MELEE, TAG.PIERCE],
		cost: 15,
		range: 2,
		power: 100,
		target: TARGET.STRAIGHT_HOSTILE,
		effect: "Damage",
		action: "Laser"
	},
	ShieldBash: {
		tags: [TAG.SHIELD],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Charge"
	},
	ShieldCharge: {
		tags: [TAG.SHIELD],
		cost: 24,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Trample"
	},
	Shoot: {
		tags: [TAG.SHOOT],
		cost: 20,
		range: 3,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Shoot"
	},
	// MAGIC
	IceSpear: {
		tags: [TAG.MAGIC, TAG.COLD],
		cost: 16,
		range: 5,
		power: 80,
		target: TARGET.SINGLE_HOSTILE,
		effect: "DamageHPandSP",
		action: "Shoot"
	},
	DrainLife: {
		tags: [TAG.MAGIC, TAG.LIFE],
		cost: 16,
		range: 5,
		power: 80,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Drain"
	},
	FireBall: {
		tags: [TAG.MAGIC, TAG.FIRE],
		cost: 16,
		range: 5,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		effect: "Damage",
		action: "Explode"
	},
	LightningLaser: {
		tags: [TAG.MAGIC, TAG.LIGHTNING],
		cost: 16,
		range: 5,
		power: 100,
		target: TARGET.STRAIGHT_HOSTILE,
		effect: "Damage",
		action: "Laser"
	},
	FireNova: {
		tags: [TAG.MAGIC, TAG.FIRE],
		cost: 16,
		range: 2,
		power: 100,
		target: TARGET.SURROUND_HOSTILE,
		effect: "Damage",
		action: "Nova"
	},
	Heal: {
		tags: [TAG.MAGIC, TAG.LIFE],
		cost: 24,
		range: 3,
		power: 100,
		target: TARGET.SINGLE_FRIENDLY,
		effect: "Heal",
		action: "Shoot"
	},
	PartyHeal: {
		tags: [TAG.MAGIC, TAG.LIFE],
		cost: 24,
		range: 1,
		power: 100,
		target: TARGET.SURROUND_FRIENDLY,
		effect: "Heal",
		action: "Nova"
	},
	FirstAid: {
		tags: [TAG.ALCHEMY, TAG.LIFE],
		cost: 24,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_FRIENDLY,
		effect: "Heal",
		action: "Charge"
	}
};
