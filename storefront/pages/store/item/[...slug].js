import { useRouter } from "next/router";
import { useEffect } from "react";
import { withLocale } from "../../../libs/router";

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Item() {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Item: {slug}</p>;
}
