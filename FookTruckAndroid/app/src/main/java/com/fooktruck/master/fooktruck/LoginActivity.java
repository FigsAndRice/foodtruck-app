package com.fooktruck.master.fooktruck;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;
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
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import android.support.design.widget.Snackbar;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Handler;

public class LoginActivity extends AppCompatActivity {
    final String URL = "http://192.168.1.12:5000/api/restaurants/";
    private LinearLayout layout;
    protected static final String Cookie = "COOKIE_SAVE";
    private int status = -1;
    private RequestQueue queue;
    private String cookie = "";
    protected EditText username;
    protected EditText password;
    protected Button login;
    protected Button newUser;
    protected Button forgot;
    protected ProgressBar loading;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        layout = (LinearLayout) findViewById(R.id.content);
        queue = Volley.newRequestQueue(this);
        initLayout();
        addListeners();
    }

    @Override
    protected void onPause() {
        username.setText("");
        password.setText("");

        super.onPause();
    }
    public void initLayout() {
        username = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
        login = (Button) findViewById(R.id.loginbtn);
        forgot= (Button) findViewById(R.id.forgotbtn);
        newUser = (Button) findViewById(R.id.register);
        loading = (ProgressBar) findViewById(R.id.loading_profile);
        loading.setVisibility(View.INVISIBLE);
    }
    public void addListeners() {
        forgot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                forgot_password();
            }
        });
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                login();
                Intent i = new Intent(getApplicationContext(), FoodTruckMap.class);
                startActivity(i);
            }
        });
        newUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createNewUser();
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

        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });

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

                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, URL + "login", jsonObject,
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
                            Log.d("connect.sid", "new cookie " + headers.get("session"));
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
        }
    }

    public void createNewUser() {
        final AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
        View signup = getLayoutInflater().inflate(R.layout.dialog_signup, null);
        alertDialog.setView(signup);

        final EditText signup_name = (EditText) signup.findViewById(R.id.signup_name);
        final EditText signup_pwd = (EditText) signup.findViewById(R.id.signup_password);
        final EditText signup_pwd2 = (EditText) signup.findViewById(R.id.signup_password2);
        final EditText signup_email = (EditText) signup.findViewById(R.id.signup_email);
        final Spinner signup_cuisine = (Spinner) signup.findViewById(R.id.cuisine);


        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "Create Account", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

            }
        });

        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });
        alertDialog.show();

        alertDialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String paswword1 = signup_pwd.getText().toString();
                String password2 = signup_pwd2.getText().toString();

                if (!paswword1.equals(password2))
                    signup_pwd2.setError("Passwords do not match.");
                else if (signup_email.getText().length() == 0 ||
                        signup_name.getText().length() == 0
                        || signup_pwd.getText().length() == 0
                        || signup_pwd2.getText().length() == 0) {
                    if(signup_email.getText().length() == 0)
                        signup_email.setError("Field cannot be left blank.");
                    if (signup_name.getText().length() == 0)
                        signup_name.setError("Field cannot be left blank.");
                    if (signup_pwd.getText().length() == 0)
                        signup_pwd.setError("Field cannot be left blank.");
                    if (signup_pwd2.getText().length() == 0)
                        signup_pwd2.setError("Field cannot be left blank.");
                    if (signup_cuisine.getSelectedItem().toString().equals("Cuisine")) {
                        TextView errorText = (TextView)signup_cuisine.getSelectedView();
                        errorText.setError("Field cannot be left blank.");
                    }

                }
                else
                    try {
                        createUser(signup_name.getText().toString(), signup_email.getText().toString(), signup_pwd.getText().toString(),
                                signup_cuisine.getSelectedItem().toString());
                        alertDialog.dismiss();

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }


            }
        });
    }

    public void createUser(String name, String email, String password,
                           String cuisine) throws JSONException {
        final AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();

        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        JSONObject json = new JSONObject();
        json.put("name", name);
        json.put("email", email);
        json.put("pwd", password);
        json.put("cuisine", cuisine);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, URL + "register", json,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        alertDialog.setTitle("Thanks for registering!");
                        alertDialog.setMessage("Your account was created.");
                        alertDialog.show();

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                NetworkResponse networkResponse = error.networkResponse;
                if (networkResponse != null && networkResponse.statusCode == 400) {
                    String errorMsg = new String(networkResponse.data);
                    errorMsg = trimMessage(errorMsg, "error");
                    Log.d("error message ", errorMsg);
                    Snackbar snackbar = Snackbar.make(layout, errorMsg ,Snackbar.LENGTH_INDEFINITE)
                    .setAction("Close", new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                        }
                    });
                    snackbar.show();
                }

            }
        });
        queue.add(jsonObjectRequest);
    }

    public String trimMessage(String json, String key){
        String trimmedString = null;

        try{
            JSONObject obj = new JSONObject(json);
            trimmedString = obj.getString(key);
        } catch(JSONException e){
            e.printStackTrace();
            return null;
        }

        return trimmedString;
    }

    public void forgot_password() {
        final AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
        final View forgot = getLayoutInflater().inflate(R.layout.dialog_forgot, null);
        alertDialog.setView(forgot);

        final EditText forgot_email = (EditText) forgot.findViewById(R.id.forgot_email);

        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "Send Token!", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

            }
        });

        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });
        alertDialog.show();

        alertDialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (forgot_email.getText().toString().isEmpty())
                    forgot_email.setError("This is a required field.");

                else
                    try {
                        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
                        imm.hideSoftInputFromWindow(forgot.getWindowToken(), 0);
                        get_token(forgot_email.getText().toString(), alertDialog);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }


            }
        });
    }

    public void get_token(String email, final AlertDialog alertDialog) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("email", email);
        
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, URL + "token", jsonObject,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Intent i = new Intent(getApplicationContext(), ForgotActivity.class);
                        startActivity(i);
                        alertDialog.dismiss();

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        NetworkResponse networkResponse = error.networkResponse;
                        if (networkResponse != null && networkResponse.statusCode == 400) {
                            String errorMsg = new String(networkResponse.data);
                            errorMsg = trimMessage(errorMsg, "error");
                            Log.d("error message ", errorMsg);
                            Snackbar snackbar = Snackbar.make(layout, errorMsg ,Snackbar.LENGTH_INDEFINITE)
                                    .setAction("Close", new View.OnClickListener() {
                                        @Override
                                        public void onClick(View v) {

                                        }
                                    });
                            snackbar.show();
                        }
                    }
                }
        );

        queue.add(jsonObjectRequest);
    }
}
