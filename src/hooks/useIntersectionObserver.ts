import { useRef, useEffect, useState } from "react";

export default function useIntersectionObserver(options?: {
  enabled?: boolean;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    console.log("effect ran, enabled:", options?.enabled);
    if (!options?.enabled) return;

    const observer = new IntersectionObserver((entries) => {
      console.log("observer fired", entries[0].isIntersecting);
      setIsIntersecting(entries[0].isIntersecting);
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
  }, [options?.enabled]);

  return [targetRef, isIntersecting];
}
