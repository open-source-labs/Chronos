echo "Copying /chronos_npm_package into examples/docker folders..."
cd ../books
cp -R ../../../chronos_npm_package .
cd ../customers
cp -R ../../../chronos_npm_package .
cd ../frontend
cp -R ../../../chronos_npm_package .
cd ../orders
cp -R ../../../chronos_npm_package .
cd ..
echo "Running docker-compose..."
docker-compose -f docker-compose.yml up
echo "Removing chronos_npm_package folder from examples/docker folders..."
cd orders
rm -rf chronos_npm_package
cd ../frontend
rm -rf chronos_npm_package
cd ../customers
rm -rf chronos_npm_package
cd ../books
rm -rf chronos_npm_package
cd ../scripts
echo "Done!"