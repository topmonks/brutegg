import { useCallback, useMemo, useState } from "react";
import { Map } from "immutable";

const identity = (v) => v;

export default function useFormData(initial, parsers = {}) {
  const [formState, setFormState] = useState(Map(initial));

  const onChange = useCallback(
    (e) => {
      const target = e.target;
      setFormState((x) => x.setIn(target.name.split("."), target.value));
    },
    [setFormState]
  );

  const parsedFormState = useMemo(() => {
    return formState.map((value, key) => (parsers[key] || identity)(value));
  }, [formState, parsers]);

  const clear = useCallback(() => {
    setFormState(Map(initial));
  }, [setFormState, initial]);

  return [formState, setFormState, onChange, parsedFormState, clear];
}
