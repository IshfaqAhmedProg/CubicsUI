"use client";
import { Button, CircularProgress } from "@mui/material";
import { useActionState, useEffect } from "react";
import { createComponentAction } from "../actions";
import { Prisma } from "@cubicsui/db";

const initialState = {
  errors: {},
};

export default function CreateComponentForm({
  library,
}: {
  library: Prisma.$librariesPayload["scalars"];
}) {
  const formElements = [
    { label: "Component Name", id: "name" },
    { label: "Aliases", id: "aliases" },
    { label: "Description", id: "desc" },
    { label: "Categories", id: "categories" },
    { label: "Supported Environments", id: "supportedEnvs" },
    { label: "Component Code", id: "code" },
  ];
  const [state, formAction, pending] = useActionState(
    createComponentAction,
    initialState
  );
  useEffect(()=>{
    
  },[library])
  
  console.log("lib", library);
  return (
    <form action={formAction}>
      {formElements.map((fe) => {
        return (
          <div key={fe.id}>
            <label htmlFor={fe.id}>{fe.label}</label>
            {fe.id == "code" ? (
              <textarea
                id={fe.id}
                name={fe.id}
              />
            ) : (
              <input
                type="text"
                name={fe.id}
                id={fe.id}
              />
            )}
          </div>
        );
      })}
      {JSON.stringify(state?.errors)}
      <Button
        type="submit"
        disabled={pending}
        endIcon={pending ? <CircularProgress /> : undefined}
      >
        Confirm
      </Button>
    </form>
  );
}
