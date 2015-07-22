set -e
mocha
npm run-script uat-taker
npm run-script uat-maker
cd public/taker
karma start --single-run
cd ../maker
karma start --single-run
