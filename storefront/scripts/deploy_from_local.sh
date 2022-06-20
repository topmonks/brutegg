cd storefront
nvm use
npm run build
cd -

rm -rf ./firebase/storefront-public
rm -rf ./firebase/functions/nextjs/.next
rm -rf ./firebase/functions/nextjs/next.config.js
rm -rf ./storefront/.next/cache
cp -rT ./storefront/public ./firebase/storefront-public
cp -rT ./storefront/.next ./firebase/functions/nextjs/.next
cp -rT ./storefront/next.config.js ./firebase/functions/nextjs/next.config.cjs

cd firebase/functions
nvm use
firebase deploy --only functions:nextjs-server
firebase deploy --only hosting:storefront
cd -