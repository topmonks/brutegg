import { useRouter } from "next/router";
import { useCallback } from "react";
import { withLocale } from "../libs/router";

export default function useRefreshProps() {
  const router = useRouter();

  const refreshData = useCallback(
    () => router.replace(withLocale(router.locale, router.asPath)),
    [router]
  );

  return refreshData;
}
