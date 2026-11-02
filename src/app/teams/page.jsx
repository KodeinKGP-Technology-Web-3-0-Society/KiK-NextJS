import Founders from "./Founders";
import Heads from "./Heads";
import OldHeads from "./OldHeads";

function Block({ title, children }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <div className="mb-10 flex items-center gap-5">
        <h2 className="font-[kanit] text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <div className="h-px flex-1 bg-[#1e2333]" />
      </div>
      {children}
    </section>
  );
}

export default function TeamsPage() {
  return (
    <main className="bg-[#08090d] font-sans text-white antialiased">
      <Block title="Heads">
        <Heads />
      </Block>
      <Block title="Founders">
        <Founders />
      </Block>
      <Block title="Advisors">
        <OldHeads />
      </Block>
    </main>
  );
}
