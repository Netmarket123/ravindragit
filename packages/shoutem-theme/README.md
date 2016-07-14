# shoutem-theme
Shoutem React Native Theme

### Important TODOs
Please add all __important__ todos here so we can keep track and finish them.
* connectStyle - For React 0.15+ check if we still need to render func and class component differently [#code line](https://github.com/5minutes/mobile-app/blob/develop/framework/theme/connectStyle.js#L128)
* resolveIncludes - once Object.assign polyfill is removed, remove customizer ? [#code line](https://github.com/5minutes/mobile-app/blob/develop/framework/theme/resolveIncludes.js#L26)
* How to write a theme and component style - check what is best way to write a theme and component style (having default style or not)...check Writing a Style section


## Writing a Style
We are writing style be applying default component style at component. This means when writing new style for component, we need to override existing (default)
component style (i.e. default style has `margin: 15`, new style doesn't have any `margin` but we still need to set `margin: 0` for new style to reset default).

Todo(Braco) - example & finish description

Todo(Braco) - document https://github.com/5minutes/mobile-app/pull/74#discussion_r64136434