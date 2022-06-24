import { useCallback, useEffect, useRef, useState } from "react";

export default function useFormValidation(
  value,
  validator,
  opts = { validateAfterBlur: true, validateAfterChange: true }
) {
  const [blurred, setBlurred] = useState(false);
  const initialValue = useRef(value);
  const valueChanged = useRef(false);

  if (!valueChanged.current) {
    valueChanged.current = initialValue.current !== value;
  }

  useEffect(() => {
    if (!blurred) {
      return;
    }

    // if validate after change, then reset the blurred
    // back to false
    if (opts.validateAfterChange) {
      if (!valueChanged.current) {
        setBlurred(false);
      }
    }
  }, [blurred, opts.validateAfterChange]);

  let shouldValidate = true;

  if (opts.validateAfterChange) {
    shouldValidate = shouldValidate && valueChanged.current;
  }

  if (opts.validateAfterBlur) {
    shouldValidate = shouldValidate && blurred;
  }

  const validationResult = validator.validate(value);
  const result = shouldValidate ? validationResult : {};

  return [
    result.error?.message,
    useCallback(() => setBlurred("true"), []),
    validationResult.error?.message,
  ];
}
