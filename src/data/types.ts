export type Resource = {
  name: string;
  url: string;
};

export type Pokemon = {
  abilities: Ability[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Resource[];
  game_indices: {
    game_index: number;
    version: Resource;
  };
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  localized_name: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: [];
  species: Resource;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  stats: Stat[];
  types: PokemonType[];
  weight: number;
};

export type Ability = {
  ability: Resource;
  is_hidden: boolean;
  slot: number;
};

export type HeldItem = {
  item: Resource;
  version_details: {
    rarity: number;
    version: Resource;
  };
};

export type Move = {
  move: Resource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: Resource;
    order: null;
    version_group: Resource;
  };
};

export type PastAbility = {
  abilities: {
    ability: Resource;
    is_hidden: boolean;
    slot: number;
  }[];
  generation: Resource;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: Resource;
};

export type PokemonType = {
  slot: number;
  type: Resource;
};

export type LocalizedName = {
  name: string;
  language: Resource;
};
