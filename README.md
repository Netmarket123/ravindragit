# shoutem-client
Shoutem React Native App

### Important TODOs
Please add all __important__ todos here so we can keep track and finish them.
* connectStyle - For React 0.15+ check if we still need to render func and class component differently [#code line](https://github.com/5minutes/mobile-app/blob/develop/framework/theme/connectStyle.js#L128)
* resolveIncludes - once Object.assign polyfill is removed, remove customizer ? [#code line](https://github.com/5minutes/mobile-app/blob/develop/framework/theme/resolveIncludes.js#L26)
* Rename shoutem.ui components not to be named as extensions
* How to write a theme and component style - check what is best way to write a theme and component style (having default style or not)...check Writing a Style section

## Code style
[Five JavaScript Style Guide](https://github.com/5minutes/javascript)

### Linting [eslint](http://eslint.org/)
Setup linting environment

```npm install -g eslint-config-airbnb eslint-plugin-react eslint babel-eslint```

Run lint from root project folder

```eslint .```

## Writing a component

Component can be __stateless__ or __class__. Use class components only when you really need component lifecycle!
Most common case when you use component lifecycle is when you want to prevent component new render 
with `shouldComponentUpdate`, if component `props` haven't actually changed. Important is to know that components
connected to `redux store` with `redux connect` doesn't need to check props received from store, 
that does `redux connect` out of the box.

TODO(Braco) - example

## Writing a Style
We are writing style be applying default component style at component. This means when writing new style for component, we need to override existing (default) 
component style (i.e. default style has `margin: 15`, new style doesn't have any `margin` but we still need to set `margin: 0` for new style to reset default).

Todo(Braco) - example & finish description

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
