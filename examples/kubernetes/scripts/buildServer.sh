cd ../server
rm -rf chronos_npm_package
cp -R ../../../chronos_npm_package .
docker build -t backend:1.0 .
rm -rf chronos_npm_package
cd ../scripts