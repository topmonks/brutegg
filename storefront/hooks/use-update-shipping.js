import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import swell from "swell-js";

import fetchThrowHttpError from "../libs/fetch-throw-http-error.mjs";
import useUpdateSession from "./use-update-session.js";

export default function useUpdateShipping(formData) {
  const [, _updateSession] = useUpdateSession();
  const queryClient = useQueryClient();

  const upsertCustomer = useMutation(
    (formData) =>
      window
        ?.fetch("/api/swell/upsert-customer", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        })
        .then(fetchThrowHttpError)
        .then(async (res) => {
          const user = await res.json();
          if (user.errors) {
            throw Object.values(user.errors).map((e) => e.message);
          } else {
            return user;
          }
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["/api/swell/get-customer/"]);
        updateCart.mutate(formData);
      },
    }
  );

  const updateCart = useMutation((formData) =>
    swell.cart.update({
      account: {
        email: formData.email,
      },
      shipping: {
        name: formData.firstName + " " + formData.lastName,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
      },
    })
  );

  const upsertCustomerMutate = upsertCustomer.mutate;
  useEffect(() => {
    if (!formData) {
      return;
    }

    upsertCustomerMutate(formData);
  }, [formData, upsertCustomerMutate]);

  return [upsertCustomer, updateCart];
}
