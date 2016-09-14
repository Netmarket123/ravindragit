#!/bin/bash

# update NID of the application
if [ "$NID" != '' ]
then
  sed -i '' "s/2080/$NID/g" "config.template.json"
  echo "Application id is updated to $NID"
fi

# npm login
npm adduser <<!
$NPM_USERNAME
$NPM_PASSWORD
$NPM_EMAIL
!

# install packages
npm install
