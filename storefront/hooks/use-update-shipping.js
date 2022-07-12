import { useQuery } from "react-query";
import swell from "swell-js";

import fetchThrowHttpError from "../libs/fetch-throw-http-error.mjs";

export default function useUpdateShipping(formData) {
  const upsertCustomerResult = useQuery(
    ["/api/swell/upsert-customer", formData],
    () =>
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
      enabled: Boolean(formData),
      refetchOnWindowFocus: false,
    }
  );

  const updateCartResult = useQuery(
    ["/swell.cart.update/", formData],
    () =>
      swell.cart.update({
        shipping: {
          name: formData.firstName + " " + formData.lastName,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
      }),
    {
      enabled: Boolean(formData),
      refetchOnWindowFocus: false,
    }
  );

  return [upsertCustomerResult, updateCartResult];
}
