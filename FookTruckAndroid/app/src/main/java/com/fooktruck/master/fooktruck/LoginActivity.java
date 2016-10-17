package com.fooktruck.master.fooktruck;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {
    protected static final String Cookie = "COOKIE_SAVE";
    private int status = -1;
    private RequestQueue queue;
    private String cookie = "";
    protected EditText username;
    protected EditText password;
    protected Button login;
    protected ProgressBar loading;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        queue = Volley.newRequestQueue(this);
        initLayout();
//        Intent i = new Intent(getApplicationContext(), FoodTruckMap.class);
//
//        startActivity(i);
        addListeners();

    }

    public void initLayout() {
        username = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
        login = (Button) findViewById(R.id.loginbtn);
        loading = (ProgressBar) findViewById(R.id.loading_profile);
        loading.setVisibility(View.INVISIBLE);
    }
    public void addListeners() {
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });
        username.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                // If the event is a key-down event on the "enter" button
                if ((event.getAction() == KeyEvent.ACTION_DOWN) &&
                        (keyCode == KeyEvent.KEYCODE_ENTER)) {
                    // Perform action on key press
                    login();
                    return true;
                }
                return false;
            }
        });

        password.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                // If the event is a key-down event on the "enter" button
                if ((event.getAction() == KeyEvent.ACTION_DOWN) &&
                        (keyCode == KeyEvent.KEYCODE_ENTER)) {
                    // Perform action on key press
                    login();
                    return true;
                }
                return false;
            }
        });
    }

    public void login() {
        final AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
        String url = "http://192.168.1.12:5000/api/restaurants/login";

        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });

        Log.d("username", "username " + String.valueOf(username.getText()));
        final String email =  username.getText().toString();
        final String pwd = password.getText().toString();

        if (email.isEmpty()) {
            alertDialog.setTitle("Empty email address");
            alertDialog.setMessage("Please type your email address");
            alertDialog.show();
        } else if (pwd.isEmpty()) {
            alertDialog.setTitle("Empty password");
            alertDialog.setMessage("Please type your password");
            alertDialog.show();
        } else {
            loading.setVisibility(View.VISIBLE);
            try {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("email", email);
                jsonObject.put("pwd", pwd);

                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, jsonObject,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                loading.setVisibility(View.INVISIBLE);
                                alertDialog.setTitle("HTTP 200");
                                alertDialog.setMessage("You are login!");
                                alertDialog.show();
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("error log in ", String.valueOf(error.networkResponse.statusCode));
                        NetworkResponse networkResponse = error.networkResponse;
                        loading.setVisibility(View.INVISIBLE);
                        if (error.networkResponse == null) {
                            Log.d("throw error", error.getClass().toString());
                            if (error.getClass().equals(NoConnectionError.class)
                                    || error.getClass().equals(TimeoutError.class)) {
                                // Show timeout error message
                                Toast.makeText(getBaseContext(),
                                        "Sorry cannot connect this time",
                                        Toast.LENGTH_LONG).show();
                            }
                        }

                        if (networkResponse != null && networkResponse.statusCode == 401) {
                            // HTTP Status Code: 401 Unauthorized
                            status = networkResponse.statusCode;
                            Log.d("error64", String.valueOf(networkResponse.statusCode));

                            alertDialog.setTitle("HTTP 401");
                            alertDialog.setMessage("Wrong email or password");
                            alertDialog.show();
                        }
                    }
                }) {
                    @Override
                    protected Response parseNetworkResponse(NetworkResponse response) {
                        Map headers = response.headers;
                        if (response != null && response.statusCode == 200) {

                            cookie = (String) headers.get("set-cookie");
                            Log.d("Headers", cookie);
                            Log.d("connect.sid", "new cookie " + headers.get("connect.sid"));
    //                        SharedPreferences.Editor editor = MainActivity.this.getSharedPreferences(Cookie, MODE_PRIVATE).edit();
    //                        editor.putString("Cookie", cookie);
    //                        editor.commit();
                        }
                        return super.parseNetworkResponse(response);

                    }
                };
                queue.add(jsonObjectRequest);
            } catch (JSONException e) {
                Log.e("Error JSON shiiit", String.valueOf(e));
            }
//            StringRequest request = new StringRequest(Request.Method.POST, url,
//                    new Response.Listener<String>() {
//                        @Override
//                        public void onResponse(String response) {
//                            loading.setVisibility(View.INVISIBLE);
//                            alertDialog.setTitle("HTTP 200");
//                            alertDialog.setMessage("You are login!");
//                            alertDialog.show();
//                        }
//                    }, new Response.ErrorListener() {
//                @Override
//                public void onErrorResponse(VolleyError error) {
//                    //Log.d("error log in ", String.valueOf(error.networkResponse.statusCode));
//                    NetworkResponse networkResponse = error.networkResponse;
//                    loading.setVisibility(View.INVISIBLE);
//                    if (error.networkResponse == null) {
//                        Log.d("throw error", error.getClass().toString());
//                        if (error.getClass().equals(NoConnectionError.class)
//                                || error.getClass().equals(TimeoutError.class)) {
//                            // Show timeout error message
//                            Toast.makeText(getBaseContext(),
//                                    "Sorry cannot connect this time",
//                                    Toast.LENGTH_LONG).show();
//                        }
//                    }
//
//                    if (networkResponse != null && networkResponse.statusCode == 401) {
//                        // HTTP Status Code: 401 Unauthorized
//                        status = networkResponse.statusCode;
//                        Log.d("error64", String.valueOf(networkResponse.statusCode));
//
//
//                        alertDialog.setTitle("HTTP 401");
//                        alertDialog.setMessage("Wrong email or password");
//                        alertDialog.show();
//                    }
//
//                }
//            }) {
//                @Override
//                public String getBodyContentType() {
//                    return "application/json; charset=utf-8";
//                }
//                @Override
//                protected Map<String, String> getParams() throws AuthFailureError {
//                    Map<String, String> params = new HashMap<String, String>();
//                    //add params <key,value>
//                    params.put("email", email);
//                    params.put("pwd", pwd);
//                    return params;
//                }
//
//
//
//                @Override
//                protected Response parseNetworkResponse(NetworkResponse response) {
//                    Map headers = response.headers;
//                    if (response != null && response.statusCode == 200) {
//
//                        cookie = (String) headers.get("set-cookie");
//                        Log.d("Headers", cookie);
//                        Log.d("connect.sid", "new cookie " + headers.get("connect.sid"));
////                        SharedPreferences.Editor editor = MainActivity.this.getSharedPreferences(Cookie, MODE_PRIVATE).edit();
////                        editor.putString("Cookie", cookie);
////                        editor.commit();
//                    }
//                    return super.parseNetworkResponse(response);
//
//                }
//            };


        }
    }
}
