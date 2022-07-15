import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import swell from "swell-js";

import fetchThrowHttpError from "../libs/fetch-throw-http-error.mjs";
import _window from "../libs/window";
import window from "../libs/window";
import { sessionState } from "../state/session";

export default function SessionWatcher() {
  const session = useRecoilValue(sessionState);

  const { data: customer } = useQuery(
    ["/api/swell/get-customer", session?.address],
    /**
     * @returns {Promise<import("../types/swell")>}
     */
    () =>
      window
        ?.fetch("/api/swell/get-customer")
        .then(fetchThrowHttpError)
        .then((res) => res.json())
        .catch((e) => {
          if (e.status === 404) {
            return null;
          }

          return e;
        }),
    {
      enabled: Boolean(session?.address),
      refetchOnWindowFocus: false,
    }
  );

  const { refetch: reUpdateCardAccount } = useQuery(
    ["/swell.cart.update/", customer?.email],
    () =>
      swell.cart.update({
        account: {
          email: customer.email,
        },
      }),
    {
      enabled: Boolean(customer?.email),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!session) {
      return;
    }

    if (!customer) {
      return;
    }

    reUpdateCardAccount();
  }, [session, reUpdateCardAccount, customer]);

  useEffect(() => {
    if (!session) {
      return;
    }

    _window.Rollbar?.configure({
      payload: {
        person: {
          id: session.address,
          username: session.user?.id,
        },
      },
    });
  }, [session]);

  return null;
}
