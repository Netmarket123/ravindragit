#!/usr/bin/env bash

keytool -genkey -noprompt -alias alias1 -dname "CN=Five, OU=Five, O=Five, L=Zagreb, ST=Zagreb, C=HR" -keystore app/test.keystore -storepass password -keypass password
