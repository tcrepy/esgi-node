# Install

cd server
yarn install
cd ../client
yarn install
cd ../

# Launch

docker-compose up

# Tests
## Unitaires

docker-compose exec server npm run test

## Intégration (Postman)

importer ./Test/Tests.postman_collection.json dans Postman
