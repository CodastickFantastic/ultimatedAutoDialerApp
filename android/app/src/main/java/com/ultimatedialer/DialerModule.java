package com.ultimatedialer;

// Importing React Native Modules
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

// Importing Android Dialer Modules
import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

public class DialerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public DialerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DialerModule";
    }

    @ReactMethod
    public void makeCall(String number){
        Intent intent = new Intent(Intent.ACTION_CALL);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if(number.trim().length() > 0){
            intent.setData(Uri.parse("tel:" + number));
            reactContext.startActivity(intent);
        } else {
            Toast.makeText(getReactApplicationContext(), "Enter phone number", Toast.LENGTH_SHORT).show();
        }

    }
}
