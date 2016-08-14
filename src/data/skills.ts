type InOut = "outgoing" | "incoming";

interface Modifier {
	readonly type: InOut;
	readonly level: number;
	readonly tags: Tags;
}

type ShotID = "Charge" | "Knockback" | "GoBehind" | "Trample" | "Shoot" | "Drain" | "Explode" | "Laser" | "Nova";
type ActionID = ShotID | "Dose";

interface DoseSkillDef {
	readonly usage: "dose";
	readonly range?: never;
	readonly cost: number;

	// instant effect
	readonly tags?: Tags;			// tags for deltaHP, deltaSP, deltaHPoT, and deltaSPoT.
	readonly deltaHP?: Percentage;	// negative for damage / positive for heal
	readonly deltaSP?: Percentage;	// negative for damage / positive for heal

	// over-time effect
	readonly turns?: Turns;
	readonly deltaHPoT?: Percentage;
	readonly deltaSPoT?: Percentage;
	readonly mods?: Modifier[];

	readonly AID: "Dose";
}

interface ShotSkillDef {
	readonly usage: ShotUsage;
	readonly range: number;
	readonly cost: number;

	// instant effect
	readonly tags?: Tags;			// tags for deltaHP, deltaSP, deltaHPoT, and deltaSPoT.
	readonly deltaHP?: Percentage;	// negative for damage / positive for heal
	readonly deltaSP?: Percentage;	// negative for damage / positive for heal

	// over-time effect
	readonly turns?: Turns;
	readonly deltaHPoT?: Percentage;
	readonly deltaSPoT?: Percentage;
	readonly mods?: Modifier[];

	readonly AID: ShotID;
}

type ActiveSkillDef = DoseSkillDef | ShotSkillDef;

interface PassiveSkillDef {
	readonly usage: "passive";
	readonly range?: never;
	readonly cost: number;

	// instant effect
	readonly tags?: never;
	readonly deltaHP?: never;	// TODO: should mean incleasing maxHP.
	readonly deltaSP?: never;	// XXX: not sure the reasonable meaning. note that incleasing maxSP can be done by negative cost.

	// over-time effect
	readonly turns?: never;
	readonly deltaHPoT?: never;	// TODO: should mean continuous regeneration
	readonly deltaSPoT?: never; // XXX: not sure the reasonable meaning.
	readonly mods: Modifier[];

	readonly AID?: never;
}

type SkillDef = ActiveSkillDef | PassiveSkillDef;

const SKILLS: { [SID: string/*SkillID*/]: SkillDef } = {
	Dummy: {
		usage: "single-hostile",
		range: 0,
		cost: 999,
		AID: "Charge"
	},
	Swing: {
		usage: "single-hostile",
		range: 1,
		cost: 14,
		tags: tags(TAG.Melee),
		deltaHP: -100,
		AID: "Charge"
	},
	Slash: {
		usage: "single-hostile",
		range: 1,
		cost: 15,
		tags: tags(TAG.Melee, TAG.Slash),
		deltaHP: -110,
		AID: "Charge"
	},
	CutThrough: {
		usage: "single-hostile",
		range: 1,
		cost: 20,
		tags: tags(TAG.Melee, TAG.Slash),
		deltaHP: -100,
		AID: "GoBehind"
	},
	Sweep: {
		usage: "surround-hostile",
		range: 1,
		cost: 20,
		tags: tags(TAG.Melee, TAG.Slash),
		deltaHP: -100,
		AID: "Nova"
	},
	Crash: {
		usage: "single-hostile",
		range: 1,
		cost: 15,
		tags: tags(TAG.Melee, TAG.Blunt),
		deltaHP: -110,
		AID: "Charge"
	},
	Bash: {
		usage: "single-hostile",
		range: 1,
		cost: 20,
		tags: tags(TAG.Melee, TAG.Blunt),
		deltaHP: -100,
		AID: "Knockback"
	},
	Stab: {
		usage: "single-hostile",
		range: 1,
		cost: 15,
		tags: tags(TAG.Melee, TAG.Pierce),
		deltaHP: -110,
		AID: "Charge"
	},
	Thrust: {
		usage: "straight-hostile",
		range: 2,
		cost: 15,
		tags: tags(TAG.Melee, TAG.Pierce),
		deltaHP: -100,
		AID: "Laser"
	},
	ShieldBash: {
		usage: "single-hostile",
		range: 1,
		cost: 20,
		tags: tags(TAG.Shield),
		deltaHP: -100,
		AID: "Charge"
	},
	ShieldCharge: {
		usage: "single-hostile",
		range: 1,
		cost: 24,
		tags: tags(TAG.Shield),
		deltaHP: -100,
		AID: "Trample"
	},
	Shoot: {
		usage: "single-hostile",
		range: 3,
		cost: 20,
		tags: tags(TAG.Shoot),
		deltaHP: -100,
		AID: "Shoot"
	},
	PoisonArrow: {
		usage: "single-hostile",
		range: 3,
		cost: 20,
		tags: tags(TAG.Shoot),
		deltaHP: -60,
		turns: 2,
		deltaHPoT: -30,
		AID: "Shoot"
	},
	OilArrow: {
		usage: "single-hostile",
		range: 3,
		cost: 20,
		tags: tags(TAG.Shoot),
		deltaHP: -60,
		turns: 2,
		mods: [{ type: "incoming", level: -4, tags: tags(TAG.Fire) }],
		AID: "Shoot"
	},
	// MAGIC
	IceSpear: {
		usage: "single-hostile",
		range: 5,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Cold),
		deltaHP: -80,
		deltaSP: -40,
		AID: "Shoot"
	},
	DrainLife: {
		usage: "single-hostile",
		range: 5,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		deltaHP: -80,
		AID: "Drain"
	},
	FireBall: {
		usage: "single-hostile",
		range: 5,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Fire),
		deltaHP: -100,
		AID: "Explode"
	},
	LightningLaser: {
		usage: "straight-hostile",
		range: 5,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Lightning),
		deltaHP: -100,
		AID: "Laser"
	},
	FireNova: {
		usage: "surround-hostile",
		range: 2,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Fire),
		deltaHP: -100,
		AID: "Nova"
	},
	//================================================================================
	// Heal Skills
	//================================================================================
	Heal: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		deltaHP: 100,
		AID: "Shoot"
	},
	PartyHeal: {
		usage: "surround-friendly",
		range: 1,
		cost: 24,
		tags: tags(TAG.Magic, TAG.Life),
		deltaHP: 100,
		AID: "Nova"
	},
	FirstAid: {
		usage: "single-friendly",
		range: 1,
		cost: 24,
		tags: tags(TAG.Alchemy, TAG.Life),
		deltaHP: 50,
		turns: 2,
		deltaHPoT: 25,
		AID: "Charge"
	},
	//================================================================================
	// Buff Skills
	//================================================================================
	Empower: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		turns: 2,
		mods: [{ type: "outgoing", level: 4, tags: tags(TAG.Melee) }],
		AID: "Shoot"
	},
	Enhance: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		turns: 2,
		mods: [{ type: "outgoing", level: 4, tags: tags(TAG.Throw, TAG.Shoot) }],
		AID: "Shoot"
	},
	Enlighten: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		turns: 2,
		mods: [{ type: "outgoing", level: 4, tags: tags(TAG.Magic) }],
		AID: "Shoot"
	},
	Absorber: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		turns: 2,
		mods: [{ type: "incoming", level: 4, tags: tags(TAG.Melee) }],
		AID: "Shoot"
	},
	Shelter: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		turns: 2,
		mods: [{ type: "incoming", level: 4, tags: tags(TAG.Throw, TAG.Shoot) }],
		AID: "Shoot"
	},
	Barrier: {
		usage: "single-friendly",
		range: 3,
		cost: 16,
		tags: tags(TAG.Magic, TAG.Life),
		turns: 2,
		mods: [{ type: "incoming", level: 4, tags: tags(TAG.Magic) }],
		AID: "Shoot"
	},
	//================================================================================
	// Dose Skills
	//================================================================================
	PotionOfHealth: {
		usage: "dose",
		cost: 24,
		tags: tags(TAG.Alchemy, TAG.Life),
		deltaHP: 100,
		AID: "Dose"
	},
	PotionOfRegeneration: {
		usage: "dose",
		cost: 24,
		tags: tags(TAG.Alchemy, TAG.Life),
		deltaHP: 50,
		turns: 2,
		deltaHPoT: 50,
		AID: "Dose"
	},
	PotionOfStrength: {
		usage: "dose",
		cost: 24,
		tags: tags(TAG.Alchemy, TAG.Life),
		turns: 3,
		mods: [{ type: "outgoing", level: 4, tags: tags(TAG.Melee) }],
		AID: "Dose"
	},
	PotionOfDexterity: {
		usage: "dose",
		cost: 24,
		tags: tags(TAG.Alchemy, TAG.Life),
		turns: 3,
		mods: [{ type: "outgoing", level: 4, tags: tags(TAG.Throw, TAG.Shoot) }],
		AID: "Dose"
	},
	PotionOfIntelligence: {
		usage: "dose",
		cost: 24,
		tags: tags(TAG.Alchemy, TAG.Life),
		turns: 3,
		mods: [{ type: "outgoing", level: 4, tags: tags(TAG.Magic) }],
		AID: "Dose"
	},
	//================================================================================
	// Passive Skills - level: 1=7%, 2=15%, 3=23%, 4=32%
	//================================================================================
	PathToWarrior: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "outgoing", level: 2, tags: tags(TAG.Melee) }]
	},
	PathToNinja: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "outgoing", level: 2, tags: tags(TAG.Throw) }]
	},
	PathToArcher: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "outgoing", level: 2, tags: tags(TAG.Shoot) }]
	},
	PathToMage: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "outgoing", level: 2, tags: tags(TAG.Magic) }]
	},
	PathToAlchemist: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "outgoing", level: 2, tags: tags(TAG.Alchemy) }]
	},

	Defence: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "incoming", level: 2, tags: tags(TAG.Melee) }]
	},
	Dodge: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "incoming", level: 2, tags: tags(TAG.Throw, TAG.Shoot) }]
	},
	Meditation: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "incoming", level: 2, tags: tags(TAG.Magic) }]
	},
	Healthy: {
		usage: "passive",
		cost: 10,
		mods: [{ type: "incoming", level: 2, tags: tags(TAG.Alchemy) }]
	},

	AffinityToFire: {
		usage: "passive",
		cost: 10,
		mods: [
			{ type: "outgoing", level: 3, tags: tags(TAG.Fire) },
			{ type: "outgoing", level: -3, tags: tags(TAG.Cold, TAG.Lightning) },
			{ type: "incoming", level: 3, tags: tags(TAG.Fire) }
		]
	},
	AffinityToCold: {
		usage: "passive",
		cost: 10,
		mods: [
			{ type: "outgoing", level: 3, tags: tags(TAG.Cold) },
			{ type: "outgoing", level: -3, tags: tags(TAG.Fire, TAG.Lightning) },
			{ type: "incoming", level: 3, tags: tags(TAG.Cold) }
		]
	},
	AffinityToLightning: {
		usage: "passive",
		cost: 10,
		mods: [
			{ type: "outgoing", level: 3, tags: tags(TAG.Lightning) },
			{ type: "outgoing", level: -3, tags: tags(TAG.Fire, TAG.Cold) },
			{ type: "incoming", level: 3, tags: tags(TAG.Lightning) }
		]
	}
};
