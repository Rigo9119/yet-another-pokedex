import { getLocale, locales, setLocale } from "../paraglide/runtime.js";

export default function LanguageSelector() {
  return (
    <select
      value={getLocale()}
      onChange={(e) => setLocale(e.target.value as "en" | "es" | "ko")}
    >
      {locales.map((locale: string, index: number) => (
        <option key={index} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
