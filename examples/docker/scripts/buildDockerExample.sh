cd ../books
cp -R ../../../chronos_npm_package .
cd ../customers
cp -R ../../../chronos_npm_package .
cd ../frontend
cp -R ../../../chronos_npm_package .
cd ../orders
cp -R ../../../chronos_npm_package .
docker compose up
rm -rf chronos_npm_package
cd ../frontend
rm -rf chronos_npm_package
cd ../customers
rm -rf chronos_npm_package
cd ../books
rm -rf chronos_npm_package
cd ../scripts