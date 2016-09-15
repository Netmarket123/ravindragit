#!/bin/bash

# rename config template
mv config.template.json config.json

# update NID of the application
if [ "$NID" != '' ]
then
  sed -i '' "s/2080/$NID/g" "config.json"
  echo "Application id is updated to $NID"
fi

echo "Updating Source..."
expect <<- DONE
  set timeout -1

  spawn npm login
  match_max 100000

  expect "Username"    
  send "$NPM_USERNAME\r"

  expect "Password"
  send "$NPM_PASSWORD\r" 

  expect "Email"
  send "$NPM_EMAIL\r"
  expect eof
DONE

# install packages
npm install
echo "Packages installed successfully!"

# link react projects
rnpm link
