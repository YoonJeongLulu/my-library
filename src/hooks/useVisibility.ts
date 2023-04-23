import { useState, useEffect, RefObject } from "react";

function useVisibility<T extends HTMLElement>(ref: RefObject<T>): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Adjust this value to control when the component should be considered visible.
      }
    );

    const refCurrent = ref.current;

    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [ref]);

  return isVisible;
}

export default useVisibility;
