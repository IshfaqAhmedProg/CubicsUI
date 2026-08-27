"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type ReactElement,
  type Context,
  useState,
} from "react";

interface CheckboxContextProps {
  values: Record<string, boolean>;
  selected: string[];
  register: (id: string, checked?: boolean) => void;
  update: (id: string, checked: boolean) => void;
  setAll: (checked: boolean) => void;
}
interface CheckboxProviderProps {
  children: ReactNode;
  onChange?: (checked: Record<string, boolean>) => void;
}

export const CheckboxContext: Context<CheckboxContextProps> =
  createContext<CheckboxContextProps>({
    values: {},
    selected: [],
    register: () => {},
    update: () => {},
    setAll: () => {},
  });

export function useCheckbox(): CheckboxContextProps {
  const c = useContext(CheckboxContext);
  return c;
}

export function CheckboxProvider({
  children,
  onChange,
}: CheckboxProviderProps): ReactElement {
  const [values, setValues] = useState<Record<string, boolean>>({});
  const selected = Object.keys(values).filter(
    (_, i) => Object.values(values)[i],
  );

  function register(id: string, checked: boolean = false): void {
    setValues((prev) => ({ ...prev, [id]: checked }));
  }

  function update(id: string, checked: boolean): void {
    setValues((prev) => {
      const next = { ...prev, [id]: checked };
      onChange?.(next);
      return next;
    });
  }
  function setAll(checked: boolean): void {
    setValues((prev) => {
      const next = Object.fromEntries(
        Object.keys(prev).map((k) => [k, checked]),
      );
      onChange?.(next);
      return next;
    });
  }
  return (
    <CheckboxContext.Provider
      value={{ values, selected, register, update, setAll }}
    >
      {children}
    </CheckboxContext.Provider>
  );
}
