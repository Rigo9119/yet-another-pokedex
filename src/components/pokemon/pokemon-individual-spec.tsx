export interface PokemonIndividualSpecProps {
  specTitle: string;
  specData: number;
}

export default function PokemonIndividualSpec({
  specTitle,
  specData,
}: PokemonIndividualSpecProps) {
  return (
    <div className="flex flex-col justify-center content-center w-1/2 border border-transparent rounded-md bg-red-400">
      <h3 className="flex justify-center text-amber-300 font-bold w-full">
        {specTitle}
      </h3>
      <p className="flex justify-center text-white font-medium w-full">
        {specData}
      </p>
    </div>
  );
}
