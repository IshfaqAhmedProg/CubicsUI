import { Card, CloseButton } from "@cubicsui/components";

export default function Page() {
  return (
    <main className={"main"}>
      <h1>
        <code>{"<CloseButton/>"}</code>
      </h1>
      <p>
        Absolutely positioned button for closing modals, drawers etc. Make sure
        to use <code>position:relative</code> on the parent{" "}
      </p>
      <p>
        Inherits all props from <code>{"<Button/>"}</code>, so you can use the
        different sizes, colors, variants etc.
      </p>
      <h2>Position</h2>

      <section>
        <h3>Top Right</h3>
        <Card style={{ paddingTop: "var(--gap-10)" }}>
          <CloseButton position="top right" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, natus?
          In fuga, asperiores velit saepe, natus similique ratione sed sit
          accusamus quidem earum maiores impedit odit unde vitae amet ullam.
        </Card>
      </section>

      <section>
        <h3>Top Left</h3>
        <Card style={{ paddingTop: "var(--gap-10)" }}>
          <CloseButton position="top left" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, natus?
          In fuga, asperiores velit saepe, natus similique ratione sed sit
          accusamus quidem earum maiores impedit odit unde vitae amet ullam.
        </Card>
      </section>

      <section>
        <h3>Bottom Right</h3>
        <Card style={{ paddingBottom: "var(--gap-10)" }}>
          <CloseButton position="bottom right" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, natus?
          In fuga, asperiores velit saepe, natus similique ratione sed sit
          accusamus quidem earum maiores impedit odit unde vitae amet ullam.
        </Card>
      </section>

      <section>
        <h3>Bottom Left</h3>
        <Card style={{ paddingBottom: "var(--gap-10)" }}>
          <CloseButton position="bottom left" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, natus?
          In fuga, asperiores velit saepe, natus similique ratione sed sit
          accusamus quidem earum maiores impedit odit unde vitae amet ullam.
        </Card>
      </section>
    </main>
  );
}
