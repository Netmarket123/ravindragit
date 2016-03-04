import codePush from 'react-native-code-push';

export default {
  appDidMount() {
    // Active update, which lets the end user know
    // about each update, and displays it to them
    // immediately after downloading it
    codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  },
};
