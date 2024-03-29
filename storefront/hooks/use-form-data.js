import { useCallback, useMemo, useState } from "react";
import { Map } from "immutable";

const identity = (v) => v;

export default function useFormData(initial, parsers = {}) {
  const [formState, setFormState] = useState(Map(initial));

  const onChange = useCallback(
    (e, getValue = (target) => target.value) => {
      const target = e.target;
      setFormState((x) => x.setIn(target.name.split("."), getValue(target)));
    },
    [setFormState]
  );

  const parsedFormState = useMemo(() => {
    return formState.map((value, key) => (parsers[key] || identity)(value));
  }, [formState, parsers]);

  const reset = useCallback(
    (providedInitial) => {
      setFormState(Map(providedInitial || initial));
    },
    [setFormState, initial]
  );

  return [formState, setFormState, onChange, parsedFormState, reset];
}
