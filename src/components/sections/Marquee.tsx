const items = [
  "Cold-process",
  "Shea butter",
  "Essential oils",
  "Plastic-free",
  "Cruelty-free",
  "Hand-cut",
  "6-week cure",
  "Vegan",
  "Botanical",
];

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-moss py-5 text-foam">
      <div className="flex">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10"
          >
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-10">
                <span className="font-display text-xl tracking-tight">{item}</span>
                <span className="text-clay-light">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
