const NUMBERS = [
  { value: "260+", label: "PDS problems" },
  { value: "17+", label: "articles published" },
  { value: "15+", label: "events run" },
  { value: "7,000+", label: "people in the community" },
];

export default function Numbers() {
  return (
    <section className="border-t border-[#243158]">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <div
            key={n.label}
            className={`px-5 py-10 md:px-8 ${i % 2 === 1 ? "border-l border-[#243158]" : ""} ${i >= 2 ? "border-t border-[#243158] md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
          >
            <dt className="sr-only">{n.label}</dt>
            <dd className="font-mono text-3xl font-medium text-[#ece9e1] md:text-4xl">{n.value}</dd>
            <dd className="mt-2 text-sm text-[#9aa3b8]">{n.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
