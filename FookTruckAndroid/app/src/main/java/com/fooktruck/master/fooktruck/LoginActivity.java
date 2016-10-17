package com.fooktruck.master.fooktruck;

import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.android.volley.RequestQueue;

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
        }

        else if (pwd.isEmpty()) {
            alertDialog.setTitle("Empty password");
            alertDialog.setMessage("Please type your password");
            alertDialog.show();
        }
    }
}
