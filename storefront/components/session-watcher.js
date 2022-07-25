import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import swell from "swell-js";

import fetchThrowHttpError from "../libs/fetch-throw-http-error.mjs";
import _window from "../libs/window";
import window from "../libs/window";
import { sessionState } from "../state/session";

export default function SessionWatcher() {
  const session = useRecoilValue(sessionState);

  const { data: customer } = useQuery(
    ["/api/swell/get-customer/", session?.address],
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
    { enabled: Boolean(session?.address) }
  );

  const updateCartAccount = useMutation((email) =>
    swell.cart.update({
      account: {
        email,
      },
    })
  );

  const updateCartAccountMutate = updateCartAccount.mutate;

  useEffect(() => {
    if (customer?.email) {
      updateCartAccountMutate(customer.email);
    }
  }, [customer?.email, updateCartAccountMutate]);

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
