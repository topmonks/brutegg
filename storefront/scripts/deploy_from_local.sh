npm --prefix storefront run build

rm -rf ./firebase/storefront-public
rm -rf ./firebase/functions/nextjs/.next
rm -rf ./firebase/functions/nextjs/next.config.js
cp -rT ./storefront/public ./firebase/storefront-public
cp -rT ./storefront/.next ./firebase/functions/nextjs/.next
cp -rT ./storefront/next.config.js ./firebase/functions/nextjs/next.config.cjs

cd firebase
firebase deploy --only functions:nextjs-server
firebase deploy --only hosting:storefront
cd -