npm --prefix storefront run build

rm -rf ./firebase/storefront-public
rm -rf ./firebase/functions/nextjs/.next
cp -rT ./storefront/public ./firebase/storefront-public
cp -rT ./storefront/.next ./firebase/functions/nextjs/.next

cd firebase
firebase deploy --only hosting:storefront
firebase deploy --only functions:nextjs-server
cd -