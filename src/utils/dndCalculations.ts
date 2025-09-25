import {
  type Ability,
  type Skill,
  type AbilityModifiers,
  type Character,
} from "../types";

export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const calculateAllModifiers = (stats: {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}): AbilityModifiers => ({
  strength: calculateModifier(stats.strength),
  dexterity: calculateModifier(stats.dexterity),
  constitution: calculateModifier(stats.constitution),
  intelligence: calculateModifier(stats.intelligence),
  wisdom: calculateModifier(stats.wisdom),
  charisma: calculateModifier(stats.charisma),
});

export const calculateProficiencyBonus = (level: number): number => {
  return Math.ceil(level / 4) + 1;
};

export const skillAbilityMap: Record<Skill, Ability> = {
  acrobatics: "dexterity",
  animalHandling: "wisdom",
  arcana: "intelligence",
  athletics: "strength",
  deception: "charisma",
  history: "intelligence",
  insight: "wisdom",
  intimidation: "charisma",
  investigation: "intelligence",
  medicine: "wisdom",
  nature: "intelligence",
  perception: "wisdom",
  performance: "charisma",
  persuasion: "charisma",
  religion: "intelligence",
  sleightOfHand: "dexterity",
  stealth: "dexterity",
  survival: "wisdom",
};

export const calculateSkillBonus = (
  skill: Skill,
  abilities: AbilityModifiers,
  isProficient: boolean,
  proficiencyBonus: number
): number => {
  const abilityModifier = abilities[skillAbilityMap[skill]];
  return abilityModifier + (isProficient ? proficiencyBonus : 0);
};

export const calculateAC = (
  dexterityModifier: number,
  armor: string[] = [],
  shield: boolean = false
): number => {
  let baseAC = 10 + dexterityModifier;

  if (armor.includes("plate")) {
    baseAC = 18 + Math.min(dexterityModifier, 2);
  } else if (armor.includes("chain")) {
    baseAC = 16 + Math.min(dexterityModifier, 2);
  } else if (armor.includes("leather")) {
    baseAC = 11 + dexterityModifier;
  }

  return baseAC + (shield ? 2 : 0);
};

export const calculateMaxHP = (
  constitutionModifier: number,
  level: number,
  classType: string,
  fixedHP: number = 0
): number => {
  if (fixedHP > 0) return fixedHP;

  const hitDie: Record<string, number> = {
    barbarian: 12,
    fighter: 10,
    paladin: 10,
    ranger: 10,
    cleric: 8,
    druid: 8,
    monk: 8,
    rogue: 8,
    warlock: 8,
    bard: 8,
    sorcerer: 6,
    wizard: 6,
  };

  const die = hitDie[classType.toLowerCase()] || 8;
  return (
    constitutionModifier * level +
    Math.floor(die / 2 + 1) +
    (die / 2) * (level - 1)
  );
};

export const getFormattedModifier = (score: number): string => {
  const modifier = calculateModifier(score);
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
};

export const getAbilityScoreColor = (score: number): string => {
  if (score >= 18) return "text-purple-600";
  if (score >= 16) return "text-blue-600";
  if (score >= 14) return "text-green-600";
  if (score >= 12) return "text-yellow-600";
  if (score >= 10) return "text-orange-600";
  return "text-red-600";
};

export const calculateACFromCharacter = (character: Character): number => {
  const dexModifier = calculateModifier(character.stats.dexterity.value);
  const hasShield = character.inventory.equipment.shield?.some(
    (item) => item.equipped
  );

  return calculateAC(dexModifier, character.proficiencies.armor, hasShield);
};
