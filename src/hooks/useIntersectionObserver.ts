import { useRef, useEffect } from "react";

export default function useIntersectionObserver(
  callback: () => void,
  options?: { enabled?: boolean },
) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!options?.enabled) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [callback, options?.enabled]);

  return targetRef;
}
