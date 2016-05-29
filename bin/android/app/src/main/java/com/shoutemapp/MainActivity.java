package com.shoutemapp;

import com.facebook.react.ReactActivity;
import com.shoutem.calendar.CalendarManagerPackage;
import cl.json.RNSharePackage;
import com.brentvatne.RCTVideo.ReactVideoPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.microsoft.codepush.react.CodePush;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    private CodePush codePush;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ShoutemApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
   @Override
   protected List<ReactPackage> getPackages() {
       String codePushAppKey = BuildConfig.CODE_PUSH_APP_KEY;

       this.codePush = new CodePush(codePushAppKey, this, BuildConfig.DEBUG);

       return Arrays.<ReactPackage>asList(
               new MainReactPackage(),
            new CalendarManagerPackage(),
            new RNSharePackage(),
            new ReactVideoPackage(),
               new ReactVideoPackage(),
               new VectorIconsPackage(),
               this.codePush);
   }

    /**
     * Override the getJSBundleFile method in order to let
     * the CodePush runtime determine where to get the JS
     * bundle location from on each app start
     */
    @Override
    protected String getJSBundleFile() {
        if (getUseDeveloperSupport()) {
            return super.getJSBundleFile();
        }

        return this.codePush.getBundleUrl("index.android.bundle");
    }
}
