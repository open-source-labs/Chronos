#!/bin/bash
cd ../books
dir=$(pwd)
com="cd $dir && npm run start"
echo $dir
osascript -e "tell app \"Terminal\" to do script \"$com\""
cd ../customers
dir=`pwd`
com="cd $dir && npm run start"
echo $dir
osascript -e "tell app \"Terminal\" to do script \"$com\""

cd ../orders
dir=$(pwd)
com="cd $dir && npm run start"
echo $dir
osascript -e "tell app \"Terminal\" to do script \"$com\""

cd ../reverse_proxy
dir=$(pwd)
com="cd $dir && npm run start"
echo $dir
osascript -e "tell app \"Terminal\" to do script \"$com\""