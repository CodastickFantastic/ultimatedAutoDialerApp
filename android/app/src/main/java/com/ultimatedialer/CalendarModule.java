package com.ultimatedialer;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

import android.Manifest;
import android.content.Intent;
import android.net.Uri;
import android.telecom.TelecomManager;
import android.util.Log;
import android.widget.Toast;

import static android.Manifest.permission.CALL_PHONE;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;

public class CalendarModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public CalendarModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void makeCall() {
        String number = "123456789";
        Intent intent = new Intent(Intent.ACTION_CALL);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.parse("tel:" + number));
        reactContext.startActivity(intent);
    }
}

//
//        if (ContextCompat.checkSelfPermission(getReactApplicationContext(), CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
//            reactContext.startActivity(intent);
//        } else {
//            requestPermissions(reactContext,new String[]{CALL_PHONE}, 1);
//        }


//        Toast.makeText(getReactApplicationContext(), "Dupa", Toast.LENGTH_SHORT).show();
//    }

//    @ReactMethod(isBlockingSynchronousMethod = true)
//    public String createCalendarEvent(String name, String location){
//        Log.d("CalendarModule", "Create event called with name: " + name
//                + " and location: " + location);
//        return name;
//    }

//    private static final int REQUEST_CALL = 1;
//    private EditText mEditTextNumber;

//    @ReactMethod(isBlockingSynchronousMethod = true)
//    public void makeCall(String number){
//
//            makePhoneCall();
//    }
//    @ReactMethod
//    private void makePhoneCall(){
//        String number = "123456789";
//        if (number.trim().length() > 0){
//
//            if (ContextCompat.checkSelfPermission(/*getReactApplicationContext()*/reactContext,
//                    CALL_PHONE) != PackageManager.PERMISSION_GRANTED){
//                ActivityCompat.requestPermissions(CalendarModule.this, new String[] {Manifest.permission.CALL_PHONE}, REQUEST_CALL);
//            } else {
//                String dial = "tel:" + number;
//                reactContext.startActivity( new Intent(Intent.ACTION_CALL, Uri.parse(dial)));
//            }
//        } else {
//            Toast.makeText(getReactApplicationContext(), "Enter phone number", Toast.LENGTH_SHORT).show();
//        }
//    }
