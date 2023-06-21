#!/bin/bash
cd ../books
dir=$(pwd)
com="cd $dir && npm install && npm run start"
echo Starting 'books' microservice. A Mac Terminal App should be open and contains more information.
osascript -e "tell app \"Terminal\" to do script \"$com\""

cd ../customers
dir=`pwd`
com="cd $dir && npm install && npm run start"
echo Starting 'customers' microservice. A Mac Terminal App should be open and contains more information.
osascript -e "tell app \"Terminal\" to do script \"$com\""

cd ../orders
dir=$(pwd)
com="cd $dir && npm install && npm run start"
echo Starting 'orders' microservice. A Mac Terminal App should be open and contains more information.
osascript -e "tell app \"Terminal\" to do script \"$com\""

cd ../reverse_proxy
dir=$(pwd)
com="cd $dir && npm install && npm run start"
echo Starting 'reverse_proxy' microservice. A Mac Terminal App should be open and contains more information.
osascript -e "tell app \"Terminal\" to do script \"$com\""