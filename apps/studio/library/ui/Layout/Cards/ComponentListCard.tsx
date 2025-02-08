import { SearchRounded, CheckRounded } from "@mui/icons-material";
import { Stack, Paper, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ComponentCard, {
  ComponentCardProps,
  ComponentSkeleton,
} from "./ComponentCard";
import { getLibraryComponents } from "../../Forms/ComponentForm/ComponentDependencies/LocalDependencyTable/actions";
import { components, libraries } from "@cubicsui/db";

interface ComponentListCardProps {
  library: libraries;
  componentToExclude?: components | null;
  componentActions: ComponentCardProps["actions"];
}

// TODO Convert to RSC to remove unneccesary fetches
/**
 * Components in the library
 * @returns
 */
export default function ComponentListCard({
  library,
  componentToExclude,
  componentActions,
}: ComponentListCardProps) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [prComponentList, setPrComponentList] = useState<components[]>([]);

  useEffect(() => {
    const subscribe = async () => {
      setLoading(true);
      const prCmpList = await getLibraryComponents(
        library.id,
        componentToExclude?.id
      );
      setPrComponentList(prCmpList);
      setLoading(false);
    };
    subscribe();
  }, [library, componentToExclude]);

  return (
    <Stack
      pt={2}
      px={2}
      component={Paper}
      gap={3}
    >
      <TextField
        label={"Search for your component"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        slotProps={{
          input: {
            endAdornment: <SearchRounded color="disabled" />,
          },
        }}
      />
      <Stack
        gap={2}
        height={"12rem"}
        overflow={"hidden auto"}
      >
        {loading && [...Array(3)].map((_, i) => <ComponentSkeleton key={i} />)}
        {prComponentList.map((prc) => (
          <ComponentCard
            key={prc.id}
            component={prc}
            actions={componentActions}
          />
        ))}
      </Stack>
    </Stack>
  );
}
