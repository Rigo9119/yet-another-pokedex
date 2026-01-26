import { Pokemon, Resource } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2/";

export async function getResources(resource: string) {
  const response = await fetch(`${BASE_URL}${resource}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch resource: ${resource}`);
  }

  const { results } = (await response.json()) as { results: Resource[] };

  return results;
}

export async function getResourceById(resource: string, id: string) {
  const response = await fetch(`${BASE_URL}/${resource}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch resource: ${resource}/${id}`);
  }

  const data = (await response.json()) as Pokemon;

  return data;
}

export async function infinteScrollFetch(
  resource: string = "pokemon",
  pageParam: number = 0,
) {
  const listRes = await fetch(
    `${BASE_URL}${resource}?offset=${pageParam}&limit=20`,
  );

  if (!listRes.ok) {
    throw new Error(`Failed to fetch resource: ${resource}`);
  }

  const list = await listRes.json();

  const details = await Promise.all(
    list.results.map((pokemonResource: Resource) =>
      fetch(pokemonResource.url).then((res) => res.json()),
    ),
  );

  return {
    pokemons: details as Pokemon[],
    nextOffset: list.next ? pageParam + 20 : undefined,
  };
}
