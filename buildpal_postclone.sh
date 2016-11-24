#!/bin/bash

file=$(cat config.template.json)

# update NID of the application
if [ "$NID" != '' ]
then
  tmp=$(echo "$file" | sed "s/2080/$NID/g")
  file=$tmp
  echo "Application id is updated to $NID."
fi

# update build type to production
if [ "$CONFIGURATION" = 'prod' ]
then
  tmp=$(echo "$file" | sed 's/"production".*/"production": true,/g')
  file=$tmp
  echo "Changed configuration to production."
fi

# update build type to release
if [ "$BUILD_TYPE" = 'Release' ]
then
  tmp=$(echo "$file" | sed 's/"debug".*/"debug": false,/g')
  file=$tmp
  echo "Changed build type to release."
fi

echo $file > config.json

# print config.json to console
cat config.json

# install build script dependencies
cd build-script
yarn install
cd ..

# copy Podfile.template to Podfile
cp ios/Podfile.template ios/Podfile
