package com.fooktruck.master.fooktruck;

import android.content.Intent;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;

public class ForgotActivity extends AppCompatActivity {
    protected EditText pwd;
    protected EditText pwd2;
    protected EditText email;
    protected EditText token;
    protected ProgressBar loading;
    protected Button submit;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot);
        LinearLayout linear = (LinearLayout) findViewById(R.id.forgot_layout);
        Snackbar snackbar = Snackbar.make( linear, "Token has been sent. Please check your email." ,Snackbar.LENGTH_INDEFINITE)
        .setAction("Close", new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        snackbar.show();
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
                change_password();
            }
        });

    }

    public void change_password() {

    }
}
