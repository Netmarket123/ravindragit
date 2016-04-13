# shoutem-client
Shoutem React Native App

## Code style
[Five JavaScript Syle Guide](https://github.com/5minutes/javascript)

### Linting [eslint](http://eslint.org/)
Setup linting environment

```npm install -g eslint-config-airbnb eslint-plugin-react eslint babel-eslint```

Run lint from root project folder

```eslint .```

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

    ```brew upgrade npm```

2. Globally update react-native-cli with npm

    ```npm install -g react-native-cli```

3. Change react-native version into project package.json (and extensions)
4. Change react-native-codepush version in both /bin and extensions.codepush package.json

5. Install new dependencies in /bin folder

    ```npm install```

6. Exec react-native upgrade, go file by file diff

    ```react-native upgrade```

7. Link dependencies 

    ```rnpm link```

8. Clear packager cache in /bin

    ```watchman watch-del-all```

9. Run iOS/Android project
10. Works out of the box -_-
