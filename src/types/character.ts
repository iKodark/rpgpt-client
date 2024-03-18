type Occupations = "barbarian" | "bard" | "cleric" | "druid" | "fighter" | "monk" | "paladin" | "ranger" | "rogue" | "sorcerer" | "warlock" | "wizard";
type Races = "human" | "dwarf" | "elf" | "halfling" | "half-elf" | "half-orc" | "tiefling";
type Points = "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma";

type Record<K extends string, T> = {
  [P in K]: T;
}

type Character = {
  name: string,
  race: Races,
  occupation: Occupations,
  points: Record<Points, string>
}

declare const ChacterType: Character;

export default ChacterType;