#!/bin/bash

# update NID of the application
if [ "$NID" != '' ]
then
  sed "s/2080/$NID/g" config.template.json > config.json
  echo "Application id is updated to $NID"
fi

# copy package.template.json to package.json
cp package.template.json package.json
