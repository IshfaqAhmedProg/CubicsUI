import { GlassCard } from "@cubicsui/components";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<GlassCard/>"}</code>
      </h1>
      <p>A card component that is glassmorphic</p>
      <h2>Usage</h2>
      <section>
        <GlassCard>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
          dignissimos laboriosam reiciendis reprehenderit iusto sunt eligendi
          impedit iure voluptatibus, incidunt rem nemo molestias alias explicabo
          sequi at saepe similique officia!
        </GlassCard>
      </section>
      <section>
        <GlassCard id="a" style={{ width: "100px", height: "100px" }}>
          Square
        </GlassCard>
        <GlassCard id="b" style={{ width: "100px", height: "100px" }}>
          Square
        </GlassCard>
        <GlassCard id="c" style={{ width: "100px", height: "100px" }}>
          Square
        </GlassCard>
        <GlassCard id="d" style={{ width: "100px", height: "100px" }}>
          Square
        </GlassCard>
        <GlassCard id="e" style={{ width: "100px", height: "100px" }}>
          Square
        </GlassCard>
        <GlassCard id="f" style={{ width: "100px", height: "100px" }}>
          Square
        </GlassCard>
      </section>
    </main>
  );
}
