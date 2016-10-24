package com.fooktruck.master.fooktruck;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

public class RestaurantActivity extends AppCompatActivity {
    private String cookie = "";
    final String URL = "http://192.168.1.12:5000/api/restaurants/";
    protected static final String Cookie = "COOKIE_SAVE";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_restaurant);
        SharedPreferences prefs = this.getSharedPreferences(Cookie, MODE_PRIVATE);

        cookie = prefs.getString("Cookie", null);
        Log.d("cookie ", "I am here " + cookie);
        getProfile();
    }

    public void getProfile() {

    }
}
