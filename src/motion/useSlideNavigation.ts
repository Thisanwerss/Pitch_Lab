import { useCallback, useEffect, useMemo, useState } from "react";

export type SlideMeta = {
  id: string;
  label: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function useSlideNavigation(slides: SlideMeta[]) {
  const initialIndex = useMemo(() => {
    if (typeof window === "undefined") return 0;
    const hash = window.location.hash.replace("#", "");
    const index = slides.findIndex((slide) => slide.id === hash);
    return index >= 0 ? index : 0;
  }, [slides]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = clamp(index, 0, slides.length - 1);
      const nextSlide = slides[nextIndex];
      document.getElementById(nextSlide.id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${nextSlide.id}`);
      setActiveIndex(nextIndex);
    },
    [slides],
  );

  useEffect(() => {
    const current = slides[initialIndex];
    if (current) {
      window.requestAnimationFrame(() => {
        document.getElementById(current.id)?.scrollIntoView({ block: "start" });
        window.history.replaceState(null, "", `#${current.id}`);
      });
    }
  }, [initialIndex, slides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (
        event.key === "ArrowRight" ||
        event.key === " " ||
        event.key === "PageDown"
      ) {
        event.preventDefault();
        goTo(activeIndex + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goTo(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }

      const numeric = Number(event.key);
      if (Number.isInteger(numeric) && numeric >= 1 && numeric <= slides.length) {
        event.preventDefault();
        goTo(numeric - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo, slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const nextIndex = slides.findIndex((slide) => slide.id === visible.target.id);
        if (nextIndex < 0) return;
        setActiveIndex(nextIndex);
        window.history.replaceState(null, "", `#${slides[nextIndex].id}`);
      },
      { threshold: [0.55, 0.7, 0.85] },
    );

    slides.forEach((slide) => {
      const element = document.getElementById(slide.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slides]);

  return { activeIndex, goTo };
}
