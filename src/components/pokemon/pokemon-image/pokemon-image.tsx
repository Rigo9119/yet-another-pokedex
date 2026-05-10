export interface PokemonImageProps {
  frontAlt: string;
  frontSrc: string;
  backAlt: string;
  backSrc: string;
}

export default function PokemonImage({
  frontAlt,
  frontSrc,
  backAlt,
  backSrc,
}: PokemonImageProps) {
  return (
    <div className="flex gap-2">
      <img
        className="w-1/2 border border-transparent rounded-md bg-white"
        src={frontSrc}
        alt={frontAlt}
      />
      <img
        className="w-1/2 border border-transparent rounded-md bg-white"
        src={backSrc}
        alt={backAlt}
      />
    </div>
  );
}
