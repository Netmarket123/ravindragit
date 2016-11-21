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
if [ "$BUILD_TYPE" = 'Release' ]
then
  tmp=$(echo "$file" | sed 's/"production".*/"production": true,/g')
  file=$tmp
  echo "Changed build type to release."
fi

echo $file > config.json

# copy package.template.json to package.json
cp package.template.json package.json
