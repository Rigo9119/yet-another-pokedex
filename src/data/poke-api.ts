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
