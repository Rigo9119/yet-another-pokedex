import { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debounce, setDebounce] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounce;
}
