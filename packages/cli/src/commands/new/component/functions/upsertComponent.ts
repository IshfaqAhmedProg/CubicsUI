import { isDocumentNotFoundError } from "@/utils/errors.js";
import { codeblocks, components, db } from "@cubicsui/db";

interface UpsertComponentProps {
  component: Pick<components, "name" | "outPath" | "libId" | "deps" | "desc">;
  codeblocks: Pick<codeblocks, "script" | "styles">;
}

export default async function upsertComponent({
  component,
  codeblocks,
}: UpsertComponentProps) {
  console.log(`⏫ Uploading component ${component.name}, please wait...`);
  try {
    const existingComponent = await db.components.findFirstOrThrow({
      where: {
        libId: component.libId,
        name: component.name,
        outPath: component.outPath,
      },
    });
    console.warn(
      `
⚠ Component with 
      Name: ${component.name}
      Output Path: ${component.outPath}
already exists in the database
`
    );
    return existingComponent;
    // console.log("⤴ Updating instead of Creating new!");
    // const updatedComponent = await db.components.update({
    //   where: { id: existingComponent.id },
    //   data: component,
    // });
    // await db.codeblocks.update({
    //   where: { id: updatedComponent.id },
    //   data: codeblocks,
    // });
    // return updatedComponent;
  } catch (error) {
    if (isDocumentNotFoundError(error)) {
      const createdComponent = createComponent({ component, codeblocks });
      return createdComponent;
    } else {
      throw error;
    }
  }
}

export async function createComponent({
  component,
  codeblocks,
}: UpsertComponentProps) {
  const createdComponent = await db.components.create({
    data: component,
  });
  await db.codeblocks.create({
    data: {
      cmpId: createdComponent.id,
      ...codeblocks,
    },
  });
  console.log(`✔ Component ${component.name} uploaded to database`);
  return createdComponent;
}
