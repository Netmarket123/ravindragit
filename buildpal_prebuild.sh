#!/bin/bash

# update NID of the application
if [ "$NID" != '' ]
then
  sed "s/2080/$NID/g" config.template.json > config.json
  echo "Application id is updated to $NID"
fi

# link react projects
react-native link
