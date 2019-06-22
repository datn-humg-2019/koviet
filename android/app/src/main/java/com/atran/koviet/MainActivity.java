package com.atran.koviet;
import com.reactnativenavigation.NavigationActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import
// import com.facebook.react.ReactActivity;

// public class MainActivity extends ReactActivity {
    public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback{
        private PermissionListener listener; // <- add this attribute

        // Your methods here
      
        // Copy from here
      
        @Override
        public void setPermissionListener(PermissionListener listener)
        {
          this.listener = listener;
        }
        @Override
        public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
        {
            if (listener != null)
            {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
            }
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }

        @Override
        public void onConfigurationChanged(Configuration newConfig) {
          super.onConfigurationChanged(newConfig);
          Intent intent = new Intent("onConfigurationChanged");
          intent.putExtra("newConfig", newConfig);
          this.sendBroadcast(intent);
      }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    // @Override
    // protected String getMainComponentName() {
    //     return "MobxAndRNNavigationDemo";
    // }
}
