import { getLocale } from "@/paraglide/runtime";
import { useQuery } from "@tanstack/react-query";
import { getResourceById } from "@/data/poke-api";

export default function usePokemonEvolution(evolutionUrl: string | undefined) {
  const locale = getLocale();
  const id = evolutionUrl
    ? new URL(evolutionUrl).pathname.split("/").filter(Boolean).pop()
    : undefined;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon-evolution", id],
    queryFn: () => getResourceById("evolution-chain", id!),
    enabled: !!id,
  });

  console.log("pokemon-evolution", data);
  return { data, isLoading, isError };
}
