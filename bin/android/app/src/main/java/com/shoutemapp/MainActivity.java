package com.shoutemapp;

import android.net.Uri;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity {
    private CodePush codePush;
    private Bundle initialProps;

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
               new MainReactPackage(), new VectorIconsPackage(), this.codePush);
   }

    @Override
    protected String getJSMainModuleName() {
        return "index";
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

    /**
     * Put deepLink and deepLinkPath to initial props of the root component
     *
     * TODO(Vladimir) - determine if necessary and remove if not
     * @return initialProps
     */
    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
        return initialProps;
    }

    /**
     * Get deep link from intent that started the activity and save it to
     * initialProps
     *
     * TODO(Vladimir) - determine if necessary and remove if not
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Uri uri = getIntent().getData();
        if (uri != null) {
            initialProps = new Bundle();
            initialProps.putString("deepLink", uri.toString());
            initialProps.putString("deepLinkPath", uri.getPath());
        }
        super.onCreate(savedInstanceState);
    }
}
