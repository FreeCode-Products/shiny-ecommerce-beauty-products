/**
 * Tiny module-level holder for the active Lenis instance, so any component can
 * trigger a smooth scroll without prop-drilling or augmenting `window`.
 */
type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
};

let instance: LenisLike | null = null;

export function setLenisInstance(l: LenisLike | null) {
  instance = l;
}

/** Smooth-scroll to an element (uses Lenis when active, else native). */
export function smoothScrollTo(el: HTMLElement, offset = -110) {
  if (instance) instance.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
