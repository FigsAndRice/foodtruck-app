package com.fooktruck.master.fooktruck;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Typeface;
import android.preference.PreferenceManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class RestaurantActivity extends AppCompatActivity {
    private String cookie = "";
    final String URL = "http://192.168.1.3:5000/api/restaurants/";
    protected static final String Cookie = "COOKIE_SAVE";
    protected ImageView profile_pic;
    protected TextView name;
    protected TextView cuisine;
    protected ImageButton edit_cuisine;
    protected android.app.ActionBar actionBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_restaurant);
        SharedPreferences prefs = this.getSharedPreferences(Cookie, MODE_PRIVATE);

        cookie = prefs.getString("Cookie", null);
        Log.d("cookie ", "I am here " + cookie);
        initLayout();
        addListeners()
        getProfile();
    }

    private void addListeners() {
        edit_cuisine.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                change_cuisine();
            }

        });
    }

    public void initLayout() {
        profile_pic = (ImageView) findViewById(R.id.restaurant_picture);
        name = (TextView) findViewById(R.id.name_restaurant);
        Typeface roboto_italic = Typeface.createFromAsset(getAssets(), "font/Roboto-MediumItalic.ttf");
        name.setTypeface(roboto_italic);
        cuisine = (TextView) findViewById(R.id.cuisine_type);
        Typeface roboto_regular = Typeface.createFromAsset(getAssets(), "font/Roboto-Regular.ttf");
        cuisine.setTypeface(roboto_regular);

        edit_cuisine = (ImageButton) findViewById(R.id.edit_cuisine);
        //Get action bar
        actionBar = getActionBar();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_restaurant_action, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        switch (item.getItemId())
        {
            case R.id.action_camera:
                //your code here
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    public void getProfile() {
        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest req = new JsonObjectRequest(Request.Method.GET, URL + "profile" , null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        try {
                            JSONObject obj =  (JSONObject) response.get("results");
                            String img_url = (String) obj.get("profile_picture");
                            String cuisineStr = (String) obj.get("cuisine");

                            Glide.with(getBaseContext()).load(img_url).override(300, 300).fitCenter().into(profile_pic);
                            cuisine.setText(cuisineStr);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {

                Map<String,String> headers = new HashMap<String, String>();
                headers.put("Cookie", cookie);
                return headers;
            }


        };

        queue.add(req);
    }
}
