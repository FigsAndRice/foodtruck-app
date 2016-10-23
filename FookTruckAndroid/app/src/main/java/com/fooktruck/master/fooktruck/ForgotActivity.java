package com.fooktruck.master.fooktruck;

import android.content.Intent;
import android.net.Uri;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.common.api.GoogleApiClient;

import org.json.JSONException;
import org.json.JSONObject;

public class ForgotActivity extends AppCompatActivity {
    protected EditText pwd;
    protected EditText pwd2;
    protected EditText email;
    protected EditText token;
    private RequestQueue queue;
    protected ProgressBar loading;
    protected Button submit;
    protected LinearLayout linear;
    private String URL = "http://192.168.1.12:5000/api/restaurants/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot);
        linear = (LinearLayout) findViewById(R.id.forgot_layout);
        Snackbar snackbar = Snackbar.make(linear, "Token has been sent. Please check your email.", Snackbar.LENGTH_INDEFINITE)
                .setAction("Close", new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                    }
                });
        snackbar.show();
        queue = Volley.newRequestQueue(this);
        initLayout();
        addListeners();
    }

    public void initLayout() {
        pwd = (EditText) findViewById(R.id.change_password);
        pwd2 = (EditText) findViewById(R.id.change_password2);
        email = (EditText) findViewById(R.id.email_token);
        token = (EditText) findViewById(R.id.token);
        loading = (ProgressBar) findViewById(R.id.loading_forgot);
        submit = (Button) findViewById(R.id.change_password_btn_forgot);
        loading.setVisibility(View.INVISIBLE);
    }

    public void addListeners() {
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {

                    if (email.getText().length() == 0 ||
                            token.getText().length() == 0
                            || pwd.getText().length() == 0
                            || pwd2.getText().length() == 0) {
                        if(email.getText().length() == 0)
                            email.setError("Field cannot be left blank.");
                        if (token.getText().length() == 0)
                            token.setError("Field cannot be left blank.");
                        if (pwd.getText().length() == 0)
                            pwd.setError("Field cannot be left blank.");
                        if (pwd2.getText().length() == 0)
                            pwd2.setError("Field cannot be left blank.");

                    }
                    else if (!pwd.getText().toString().equals(pwd2.getText().toString()))
                        pwd2.setError("Passwords do not match.");
                    else
                        change_password();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    public void change_password() throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("email", email.getText().toString());
        jsonObject.put("new_pwd", pwd.getText().toString());
        jsonObject.put("token", token.getText().toString());
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, URL + "reset", jsonObject,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                        startActivity(intent);
                        finish();
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
                            Snackbar snackbar = Snackbar.make(linear, errorMsg, Snackbar.LENGTH_INDEFINITE)
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

    public String trimMessage(String json, String key) {
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

}
