import { useEffect, useState } from "react";

export default function useDisplayAfterDelay(delay) {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if (unmounted) {
        return;
      }

      setDisplay(true);
    }, delay);

    return () => (unmounted = true);
  }, [delay]);

  return display;
}
