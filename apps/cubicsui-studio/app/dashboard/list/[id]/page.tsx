// import { useDB } from "@/configs/db";
// import { notFound } from "next/navigation";
import styles from "./page.module.css";
export default async function ComponentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // const cmp = (await useDB()).chain.get("components").find({ id }).value();

  // if (!id || !cmp) return notFound();

  return (
    <div className={styles.detailsContainer}>
      {/* {(Object.keys(cmp) as (keyof typeof cmp)[]).map((k) => {
        return (
          <div key={k}>
            <p>{k}:</p>
            <p>{JSON.stringify(cmp[k])}</p>
          </div>
        );
      })} */}
    </div>
  );
}
