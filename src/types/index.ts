export interface User {
  _id: string;
  name: string;
  email: string;
  characters: string[];
  createdAt: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  errors?: string[];
  statusCode?: number;
}

export interface Background {
  _id: string;
  name: string;
  abilityScore: string[];
  feat: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  equipment: string;
}

export interface Class {
  _id: string;
  name: string;
  primaryAbility: string;
  hpDice: string;
  savingThrowProficiencies: string[];
  skillProficiencies: {
    choose: number;
    skills: string[];
  };
  weaponProficiencies: string[];
  toolProficiencies: string[];
  armorProficiencies: string[];
  startingGear: string;
  description?: string;
  featuresPerLevel: [
    {
      level: number;
      feature: string;
    }
  ];
  features: string[];
  subClass: [
    {
      name: string;
      featuresPerLevel: [
        {
          level: number;
          feature: string;
        }
      ];
      features: string[];
    }
  ];
}

export interface Specie {
  _id: string;
  name: string;
  creatureType: string;
  size: string;
  speed: {
    movement: number;
    burrow?: number;
    climb?: number;
    flyw?: number;
    swim?: number;
  };
  languages: string[];
  traits?: string[];
  info?: string;
}

export interface Spell {
  _id: string;
  name: string;
  level: number;
  school: string;
  class: string[];
  castingTime: string;
  range: string;
  component: {
    verbal: boolean;
    somatic: boolean;
    material?: string;
  };
  duration: string;
  description: string;
  savingThrow: boolean;
  attack: boolean;
  higherLevels?: string[];
  ritual: boolean;
  concentration: boolean;
}

export interface Stats {
  value: number;
  modifier: number;
  savingThrows: boolean;
}

export interface Skills {
  stats: string;
  statsModifier: number;
  proficient: boolean;
  expertise: boolean;
  modifier: number;
}

export interface Character {
  _id: string;
  name: string;
  level: number;
  class: Class;
  subClass?: string;
  specie: Specie;
  background: Background;
  alignment?: string;
  experience: number;
  hp: {
    current: number;
    max: number;
    temporary: number;
  };
  armorClass: number;
  initiative: number;
  speed: number;
  stats: {
    strength: Stats;
    dexterity: Stats;
    constitution: Stats;
    intelligence: Stats;
    wisdom: Stats;
    charisma: Stats;
  };
  skills: {
    acrobatics: Skills;
    animalHandling: Skills;
    arcana: Skills;
    athletics: Skills;
    deception: Skills;
    history: Skills;
    insight: Skills;
    intimidation: Skills;
    investigation: Skills;
    medicine: Skills;
    nature: Skills;
    perception: Skills;
    performance: Skills;
    persuasion: Skills;
    religion: Skills;
    sleightOfHand: Skills;
    stealth: Skills;
    survival: Skills;
  };
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
  };
  personalCharacteristics?: {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;
  };
  feats: string[];
  inventory: {
    equipment: {
      armor?: [
        {
          name: string;
          quantity: number;
          tipe: string;
          armorClass: string;
          minStrength?: number;
          stealthDisadvantage: boolean;
          weight: number;
          equipped: boolean;
          requiresAttunement: boolean;
        }
      ];
      shield?: [
        {
          name: string;
          quantity: number;
          armorClass: string;
          weight: number;
          equipped: boolean;
          requiresAttunement: boolean;
        }
      ];
      weapon?: [
        {
          name: string;
          quantity: number;
          tipe: string;
          damageDice: string;
          damageTipe: string;
          properties: string;
          mastery: string;
          weight: number;
          equipped: boolean;
          dualHanded: boolean;
          munition: number;
          requiresAttunement: boolean;
        }
      ];
      magicItems: [
        {
          name: string;
          quantity: number;
          weight: number;
          equipped: boolean;
          requiresAttunement: boolean;
          description: string;
        }
      ];
      rightHand: string;
      lefttHand: string;
      attuned: string[];
    };
    items?: Array<{
      name: string;
      quantity: number;
      weight: number;
      description?: string;
    }>;
    currency: {
      copper: number;
      silver: number;
      electrum: number;
      gold: number;
      platinum: number;
    };
  };
  spells?: {
    spellcastingAbility: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    slots: Array<{
      level: number;
      total: number;
      used: number;
    }>;
    spells: Spell[];
  };
  appearance?: {
    age: number;
    height: string;
    weight: string;
    eyes: string;
    skin: string;
    hair: string;
    description: string;
    gender: string;
  };
  backstory?: string;
  userId: User;
  createdAt: string;
}

export type CharacterFormData = Omit<Character, "_id" | "createdAt" | "userId">;

export interface CharacterResponse {
  character: Character;
  message?: string;
}

export interface CharactersResponse {
  characters: Character[];
  count: number;
}

export interface CharacterOperationResponse {
  success: boolean;
  message: string;
  character?: Character;
  error?: string;
}

export type Ability =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type Skill =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export interface AbilityModifiers {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
