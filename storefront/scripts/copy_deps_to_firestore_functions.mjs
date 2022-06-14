import storefrontPackage from "../package.json" assert {type: "json"};
import firebasePackage from "../../firebase/functions/package.json" assert {type: "json"};

import { writeFileSync } from "fs";

let dependencies = {
  ...firebasePackage.dependencies,
  ...storefrontPackage.dependencies,
};

const filtered = ["react", "react-dom"];

dependencies = Object.fromEntries(
  Object.entries(dependencies)
    .filter(([key]) => !filtered.includes(key))
    .sort(([key1], [key2]) => {
      if (key1 < key2) {
        return -1;
      }
      if (key1 > key2) {
        return 1;
      }

      return 0;
    })
);

firebasePackage.dependencies = dependencies;

writeFileSync(
  // eslint-disable-next-line no-undef
  new URL("../../firebase/functions/package.json", import.meta.url),
  JSON.stringify(firebasePackage, null, 2)
);
