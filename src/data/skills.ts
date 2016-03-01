interface SkillDef {
	tags: TAG[];	// required item tag
	cost: number;	//
	range: number;	//
	power: number;	//
	target: TARGET;
	aciton: string;
}

const SKILLS: { [SID: string/*SkillID*/]: SkillDef } = {
	Dummy: {
		tags: [],
		cost: 999,
		range: 0,
		power: 0,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Charge"
	},
	Swing: {
		tags: [TAG.MELEE],
		cost: 14,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Charge"
	},
	Slash: {
		tags: [TAG.MELEE, TAG.SLASH],
		cost: 15,
		range: 1,
		power: 110,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Charge"
	},
	CutThrough: {
		tags: [TAG.MELEE, TAG.SLASH],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "GoBehind"
	},
	Sweep: {
		tags: [TAG.MELEE, TAG.SLASH],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SURROUND_HOSTILE,
		aciton: "Nova"
	},
	Crash: {
		tags: [TAG.MELEE, TAG.BLUNT],
		cost: 15,
		range: 1,
		power: 110,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Charge"
	},
	Bash: {
		tags: [TAG.MELEE, TAG.BLUNT],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Knockback"
	},
	Stab: {
		tags: [TAG.MELEE, TAG.PIERCE],
		cost: 15,
		range: 1,
		power: 110,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Charge"
	},
	Thrust: {
		tags: [TAG.MELEE, TAG.PIERCE],
		cost: 15,
		range: 2,
		power: 100,
		target: TARGET.STRAIGHT_HOSTILE,
		aciton: "Laser"
	},
	ShieldBash: {
		tags: [TAG.SHIELD],
		cost: 20,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Charge"
	},
	ShieldCharge: {
		tags: [TAG.SHIELD],
		cost: 24,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Trample"
	},
	Shoot: {
		tags: [TAG.SHOOT],
		cost: 20,
		range: 3,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Shoot"
	},
	// MAGIC
	IceSpear: {
		tags: [TAG.MAGIC],
		cost: 16,
		range: 5,
		power: 80,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Freeze"
	},
	DrainLife: {
		tags: [TAG.MAGIC],
		cost: 16,
		range: 5,
		power: 80,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Drain"
	},
	FireBall: {
		tags: [TAG.MAGIC],
		cost: 16,
		range: 5,
		power: 100,
		target: TARGET.SINGLE_HOSTILE,
		aciton: "Explode"
	},
	LightningLaser: {
		tags: [TAG.MAGIC],
		cost: 16,
		range: 5,
		power: 100,
		target: TARGET.STRAIGHT_HOSTILE,
		aciton: "Laser"
	},
	FireNova: {
		tags: [TAG.MAGIC],
		cost: 16,
		range: 2,
		power: 100,
		target: TARGET.SURROUND_HOSTILE,
		aciton: "Nova"
	},
	Heal: {
		tags: [TAG.MAGIC],
		cost: 24,
		range: 3,
		power: 100,
		target: TARGET.SINGLE_FRIENDLY,
		aciton: "Shoot"
	},
	PartyHeal: {
		tags: [TAG.MAGIC],
		cost: 24,
		range: 1,
		power: 100,
		target: TARGET.SURROUND_FRIENDLY,
		aciton: "Nova"
	},
	FirstAid: {
		tags: [TAG.ALCHEMY],
		cost: 24,
		range: 1,
		power: 100,
		target: TARGET.SINGLE_FRIENDLY,
		aciton: "Charge"
	}
};
