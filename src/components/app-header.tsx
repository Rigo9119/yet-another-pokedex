import LanguageSelector from "./language-selector";
import { m } from "../paraglide/messages";

export default function Header() {
  return (
    <header className="px-4 py-2 w-full flex items-center justify-between bg-red-600 text-white">
      <h1 className="text-left w-3/4 font-bold text-3xl text-amber-300">
        {m.index_page_title()}
      </h1>
      <LanguageSelector />
    </header>
  );
}
