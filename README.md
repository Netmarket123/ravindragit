# shoutem-client
Shoutem React Native App

## Code style
[Five JavaScript Syle Guide](https://github.com/5minutes/javascript)

### linting
use [eslint](http://eslint.org/)

## Testing
Mocha (test framework), Chai (assertion lib) and Enzyme (utility for react) are used for unit testing.

### Writing a test
- Every test should end with *.spec.js*
- Test file should be named **exactly **as tested file
- Optionally it can be placed in \_tests\_ folder at same level as is tested file

### Running a test
- To run test just run `npm test` from extension root.
- If you receive error "Slash module missing" when running npm test, re-run npm install (sometimes slash doesn't get installed)

Note: if you have problem with running a test, first check if react-native-mock can be updated to newer version.

Todo - note which shoutem cli command is used to setup test environment

## React Native upgrade steps
1. Update npm
2. Globally update react-native-cli with npm
3. Change react-native version into project package.json  (and extensions) but do not do npm install
4. Install/update react (required by react-native -v  > 0.21)
5. Do npm install in /bin
6. Exec react-native upgrade, go file by file diff
7. Update react-native-codepush
8. Exec watchman watch-del-all in /bin
9. Run iOS/Android project
10. It works out of the box -_-
